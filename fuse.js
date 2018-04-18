const {
  FuseBox,
  CSSPlugin,
  QuantumPlugin,
  Sparky
} = require('fuse-box')
const tar = require('tar')

const isProduction = process.argv.indexOf("--production") > -1

const fuse = FuseBox.init({
  homeDir: 'src',
  output: './dist/public/$name.js',
  plugins: [CSSPlugin(),
  isProduction && QuantumPlugin({
    bakeApiIntoBundle: 'bundle',
    treeshake: true,
    uglify: true,
  }),
  ],
})

Sparky.task('config', () => { fuse.bundle("bundle").instructions(`>public/js/index.ts`) })
Sparky.task('clean', () => { Sparky.src('./').clean('dist/') })
Sparky.task('build', ['clean', 'config'], () => fuse.run())
Sparky.task('release', ['build'], () => {

  // dockerfile作成
  var name = require("./package.json").name;
  require('fs').writeFileSync('./docker/Dockerfile', `FROM node:8-alpine\r\n\r\nADD ./ /root/${name}`
    + `\r\nWORKDIR /root/${name}\r\nRUN npm install\r\nENTRYPOINT ["node", "bin/www"]`)

  //docker用tar.gzファイル作成
  tar.c(
    { gzip: true, file: `./docker/${name}.tar.gz` },
    ['app.js', 'package.json', 'package-lock.json', './dist/', './sample/', './views/']
  ).then(_ => { })
})

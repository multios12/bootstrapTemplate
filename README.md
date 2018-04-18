# bootstrap テンプレート
Express & Bootstrap4を使用したWebページを作成するためのテンプレート

## 構成ライブラリ
* express: 4.16.0
* bootstrap: 4.x
* ejs: 2.5.x
* jquery: 3.3.1
* datatables.net
* request: 2.85.0
* request-promise: 4.2.2
* font-awesome: 5.x

## サンプルページの種類
* index: スターターテンプレート（ナビバー固定）& DataTablesリスト

## ビルドスクリプト
~~~
npm run build
~~~

## リリーススクリプト
~~~
npm run release
~~~

## dockerへのインストール
リリーススクリプトを実行した際、./distにDockerfile・リリース用ソース圧縮ファイルが生成される。
これを使用してコンテナの作成が可能

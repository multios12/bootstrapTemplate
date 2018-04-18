FROM node:8-alpine

ADD ./ /root/bootstraptemplate
WORKDIR /root/bootstraptemplate
RUN npm install
ENTRYPOINT ["node", "bin/www"]
# Nodejs boilerplate
[![Coverage Status](https://coveralls.io/repos/github/duysmile/node-js-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/duysmile/node-js-boilerplate?branch=master)

Create a self-signed SSL certificate
> cd configs/ssl

> openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 

> openssl rsa -passin pass:x -in server.pass.key -out server.key

> rm server.pass.key

> openssl req -new -key server.key -out server.csr

> openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt

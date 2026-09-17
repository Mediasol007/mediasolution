#!/bin/bash

set -e

echo "Installing Media Solution..."

git clone https://github.com/Mediasol007/mediasolution.git /opt/mediasolution

cd /opt/mediasolution

docker build -t mediasolution .

docker rm -f mediasolution 2>/dev/null || true

docker run -d \
  --name mediasolution \
  --restart=always \
  -p 8085:8080 \
  -p 8185:8181 \
  -p 1940:1935 \
  mediasolution

echo "Done!"

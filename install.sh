#!/bin/bash
set -e

echo "========================================="
echo " Media Solution Broadcast Panel Installer "
echo "========================================="

apt update -y
apt install -y docker.io git nginx

systemctl enable docker
systemctl start docker

docker rm -f mediasolution 2>/dev/null || true

docker build -t mediasolution:latest .

docker run -d \
  --name mediasolution \
  --restart unless-stopped \
  -p 8085:8080 \
  -p 19350:1935 \
  mediasolution:latest

echo ""
echo "======================================"
echo " Installation Complete"
echo " Panel : http://YOUR-IP:8085/ui/"
echo " User  : admin"
echo " Pass  : Admin@123"
echo "======================================"

FROM datarhei/restreamer:latest

# 5 GB upload limit
RUN mkdir -p /etc/nginx/conf.d && \
    echo "client_max_body_size 5120M;" > /etc/nginx/conf.d/upload.conf

# Media Solution branding
RUN find /core/ui -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.css" \) \
    -exec sed -i \
      -e 's/Restreamer/Media Solution Broadcast Panel/g' \
      -e 's/Datarhei/Media Solution/g' \
      -e 's/datarhei-core/MSBP v1.0/g' \
      -e 's/datarhei.com/mediasolution.cloud/g' {} \; || true

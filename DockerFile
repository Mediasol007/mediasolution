FROM datarhei/restreamer:latest

# 5GB upload limit
RUN sed -i 's/client_max_body_size.*/client_max_body_size 5120M;/g' \
    /etc/nginx/nginx.conf || true

# Media Solution title
RUN find / -type f \( -name "*.html" -o -name "*.js" \) 2>/dev/null \
    -exec sed -i 's/Restreamer/Media Solution/g' {} \; || true

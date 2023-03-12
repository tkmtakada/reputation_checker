echo "hello"
hostname >> /usr/share/nginx/html/hostname.txt
nginx -g "daemon off;"
#!/bin/bash
echo "=== PHP modules ==="
php -m | grep -iE "pdo_mysql|mbstring|curl|zip|gd|intl|openssl|bcmath|fileinfo|xml" || true
echo "=== PHP-FPM ==="
ls /usr/sbin/ | grep -i fpm || true
echo "=== Listeners ==="
ss -tlnp 2>/dev/null | grep -E ":(80|443|8080) " || true
echo "=== certbot ==="
command -v certbot letsencrypt || true
echo "=== apache ver ==="
apache2 -v 2>/dev/null | head -1
echo "=== apache vhosts ==="
grep -l "ServerName\|DocumentRoot" /etc/apache2/sites-enabled/*.conf 2>/dev/null
grep -hE "ServerName|DocumentRoot" /etc/apache2/sites-enabled/*.conf 2>/dev/null
echo "=== php fpm pools ==="
ls /etc/php/*/fpm/pool.d/ 2>/dev/null || true
echo "=== mysql dbs ==="
mysql -uroot -e "SHOW DATABASES;" 2>&1 | head -20
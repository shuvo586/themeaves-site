#!/bin/bash
echo "=== cPanel check ==="
ls -d /usr/local/cpanel 2>/dev/null || echo "no /usr/local/cpanel"
ls -d /home/*/public_html 2>/dev/null || echo "no /home/*/public_html"
ps aux | grep -i "cpanel\|ea-php" | grep -v grep | head -3 || true
echo "=== hosting uid check ==="
id nobody 2>/dev/null
grep -E "^www-data|^nobody" /etc/passwd
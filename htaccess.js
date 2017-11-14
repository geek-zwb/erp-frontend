RewriteEngine On
# 除了config之外的js和css都加上gzip头部
<FilesMatch "^((?!config).)*(js|css)$">
Header set Vary "Accept-Encoding"
Header set Content-Encoding "gzip"
</FilesMatch>
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule ^ /index.html [L,QSA]
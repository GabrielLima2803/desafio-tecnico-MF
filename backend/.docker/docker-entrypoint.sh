#!/bin/sh
set -e

if [ ! -d "vendor" ]; then
  composer install --optimize-autoloader --no-dev --no-interaction
fi

chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

if [ ! -f ".env" ]; then
  cp .env.example .env
  php artisan key:generate
fi

while ! mysqladmin ping -h"db" -u"root" -p"secret" --silent; do
    sleep 2
done

php artisan migrate --force

exec "$@"
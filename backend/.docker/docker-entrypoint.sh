#!/bin/sh
set -e

while ! mysqladmin ping -h"db" -u"root" -p"secret" --silent; do
    sleep 2
done

php artisan migrate --force

exec "$@"
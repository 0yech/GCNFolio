#!/bin/bash
set -e

# Ensure dirs
mkdir -p /var/run/mysqld
chown -R mysql:mysql /var/run/mysqld

# Replace the DBs variables before execution
envsubst < /docker-entrypoint-initdb.d/50-init.sql > /tmp/init.sql
mv /tmp/init.sql /docker-entrypoint-initdb.d/50-init.sql

# Start mariadb
service mariadb start

# Ensure mariadb is up
sleep 3

# Execute init script
mariadb < /docker-entrypoint-initdb.d/50-init.sql

# stop mariadb cleanly before mysqld_safe
service mariadb stop

# launch mariadb (PID 1)
exec mysqld_safe

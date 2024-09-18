#!/bin/sh

set -a
. /app/.env
set +a

cd apps/server

# Wait for the PostgreSQL database to be ready
until nc -z -v -w30 pgecommerce 5432
do
  echo "Waiting for database connection..."
  sleep 1
done
echo "connection established to the database"

# Remove existing migrations if they exist
if [ -d "prisma/migrations" ]; then
  echo "Removing existing migrations..."
  rm -rf prisma/migrations
fi

# Reset the database
echo "Resetting the database..."
DATABASE_URL=${DATABASE_URL} pnpm prisma migrate reset --force --skip-seed

DATABASE_URL=${DATABASE_URL} pnpm prisma migrate dev --name init

DATABASE_URL=${DATABASE_URL} pnpm prisma generate

cd ..

# Start the application
exec "$@"
#!/bin/sh

cd apps/server

# Wait for the PostgreSQL database to be ready
until nc -z -v -w30 pgecommerce 5432
do
  echo "Waiting for database connection..."
  sleep 1
done
echo "Connection established to the database"

# Function to check if the database is initialized
is_database_initialized() {
  DATABASE_URL=${DATABASE_URL} psql -c "SELECT 1 FROM information_schema.tables WHERE table_name = 'roles' LIMIT 1;" | grep -q 1
}

# Check if the database is initialized
if is_database_initialized; then
  echo "Database is already initialized. Skipping migrations."
else
  echo "Database is not initialized. Running migrations..."

  # Remove existing migrations if they exist
  if [ -d "prisma/migrations" ]; then
    echo "Removing existing migrations..."
    rm -rf prisma/migrations
  fi

  # Reset the database
  echo "Resetting the database..."
  DATABASE_URL=${DATABASE_URL} pnpm prisma migrate reset --force --skip-seed

  # Run initial migration
  echo "Running initial migration..."
  DATABASE_URL=${DATABASE_URL} pnpm prisma migrate dev --name init

  # Generate Prisma client
  echo "Generating Prisma client..."
  DATABASE_URL=${DATABASE_URL} pnpm prisma generate
fi

cd ..

# Start the application
exec "$@"
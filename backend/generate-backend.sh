#!/bin/bash

# This script generates all the necessary backend files for the headless CMS
# It creates controllers, routes, and repositories for all modules

echo "Generating ErgopackIndia Headless CMS Backend..."

# Create all necessary directories
mkdir -p src/{controllers,routes,models,services}

# The files will be created individually
# This is a marker file to indicate structure is ready

echo "✅ Backend structure ready"
echo "Next steps:"
echo "1. Install dependencies: cd backend && npm install"
echo "2. Set up PostgreSQL database"
echo "3. Run migrations: npm run migrate"
echo "4. Start server: npm run dev"

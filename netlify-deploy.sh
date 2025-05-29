#!/bin/bash

# This script simplifies the Netlify deployment process
# It should be run from the root of the project

# Ensure Node.js version is set correctly
export NODE_VERSION=18

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Build the project
npm run build

# Copy the netlify.toml file to the output directory
cp netlify.toml out/

# Copy _redirects file to ensure SPA routing works
cp public/_redirects out/

# Generate a _headers file to set cache control
cat > out/_headers << EOL
/*
  Cache-Control: public, max-age=0, must-revalidate

/assets/*
  Cache-Control: public, max-age=31536000, immutable
EOL

echo "Netlify deployment files prepared successfully!"

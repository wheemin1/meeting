#!/bin/bash

# Ensure all room paths redirect to the proper page
mkdir -p out/room
cp out/room/demo-room/index.html out/room/index.html

# Create a 404 page that handles redirection to the demo room
cp public/404.html out/404.html

echo "Build post-processing completed successfully!"

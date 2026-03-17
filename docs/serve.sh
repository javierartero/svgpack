#!/bin/bash

# Script to serve Jekyll documentation locally
echo "Installing Jekyll dependencies..."
bundle install

echo "Starting Jekyll server..."
echo "Documentation will be available at: http://localhost:4000/svgpack/"
echo "Press Ctrl+C to stop the server"
bundle exec jekyll serve --host 192.168.1.39 --port 4000

#!/bin/bash

if [[ "$OSTYPE" == "linux-gnu" ]]; then
    echo "Starting MongoDB server for Linux"
    npm run prestart-mongo-service-ubuntu
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Starting MongoDB server for Darwin..."
    npm run prestart-mongo-service-darwin
else
    echo "Error: Unknown OS"
fi

echo "Starting server.js with nodemon..."

sleep 5

nodemon server/server.js
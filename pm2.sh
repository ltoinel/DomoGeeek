#!/bin/bash

pm2 start ./node_modules/node-red/red.js  --name "node-red" --node-args="--max-old-space-size=128" -- -v --userDir ./data/


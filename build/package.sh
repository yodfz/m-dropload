#!/bin/sh
cd build
echo 'run rollup...'
rollup -c ./rollup.config.js
echo 'run minify...'
uglifyjs ../dist/Mdropload.js  -o ../dist/Mdropload.min.js  --source-map ../dist/Mdropload.min.js.map -p 5 -c -m
echo 'success!'
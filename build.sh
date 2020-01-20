#! bin/bash

rm -rf build
mkdir build

cp -rf ./src ./build
cp -rf ./web_modules ./build
cp -r ./index.css ./build
cp -r ./index.html ./build
#!/bin/bash

# clear current public folder
rm -rf "./public/dist"
rm -rf "./public/container"
rm -rf "./public/dashboard"

mkdir "./public/dist"

# build web-app/container
cd ../web-app/container || exit
npm run build:dev
mkdir -p ../../client/public/container/latest/
cp -a ./dist/. ../../client/public/container/latest/

# build web-app/dashboard
cd ../dashboard || exit
npm run build:dev
mkdir -p ../../client/public/dashboard/latest/
cp -a ./dist/. ../../client/public/dashboard/latest/

# return to client project
cd ../../client/ || exit


next dev

#!/bin/bash

isRemoteDev=$1

# clear current public folder
rm -rf "./public/dist"
rm -rf "./public/container"
rm -rf "./public/dashboard"

mkdir "./public/dist"

# build web-app/container
cd ../web-app/container || exit


if [ -z "$isRemoteDev" ]
then
      npm run build:dev
else
      npm run build:remote-dev
fi


mkdir -p ../../client/public/container/latest/
cp -a ./dist/. ../../client/public/container/latest/

# build web-app/dashboard
cd ../dashboard || exit


if [ -z "$isRemoteDev" ]
then
      npm run build:dev
else
      npm run build:remote-dev
fi


mkdir -p ../../client/public/dashboard/latest/
cp -a ./dist/. ../../client/public/dashboard/latest/

# return to client project
cd ../../client/ || exit

if [ -z "$isRemoteDev" ]
then
      next dev
else
      cd ../
fi

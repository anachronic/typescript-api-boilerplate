#!/bin/sh

if [ "$DEBUG" = "true" ]
then
    yarn install
    yarn dev
else
    yarn start
fi

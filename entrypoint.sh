#!/bin/sh

if [ "$DEBUG" = "true" ]
then
    yarn install
    exec yarn dev
else
    exec yarn start
fi

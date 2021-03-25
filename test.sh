#!/bin/sh

export TEST_DB=testdb
export PGPASSWORD=$DATABASE_PASSWORD
export NODE_ENV=test
dropdb -w -h $DATABASE_HOST --if-exists -U $DATABASE_USER $TEST_DB
createdb -w -h $DATABASE_HOST -U $DATABASE_USER $TEST_DB
export DATABASE_NAME=$TEST_DB
yarn prod:migrate > /dev/null
exec yarn container:test "$@"

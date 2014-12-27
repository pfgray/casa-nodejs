
[ -z "$NODE_ENV" ] && export NODE_ENV=production
[ -z "$COUCH_HOST" ] && export COUCH_HOST=`/sbin/ip route|awk '/default/ { print $3 }'`
[ -z "$COUCH_PORT" ] && export COUCH_PORT=5984
[ -z "$COUCH_DB_NAME" ] && export COUCH_DB_NAME=casa

node /app/dist/server/app.js

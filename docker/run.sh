
#`/sbin/ip route|awk '/default/ { print $3 }'`
[ -z "$NODE_ENV" ] && export NODE_ENV=production
[ -z "$MONGO_HOST" ] && export COUCH_HOST=`/sbin/ip route|awk '/default/ { print $3 }'`
[ -z "$MONGO_PORT" ] && export COUCH_PORT=5984
[ -z "$MONGO_DB_NAME" ] && export COUCH_DB_NAME=casa

node /app/dist/server/server.js

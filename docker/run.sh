
[ -z "$COUCH_HOST" ] && COUCH_HOST=nexus
[ -z "$COUCH_PORT" ] && COUCH_PORT=5984
[ -z "$COUCH_DB_NAME" ] && COUCH_DB_NAME=casa

node /app/server/app.js

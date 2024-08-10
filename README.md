# lift-with-me
Social weightlifting app

instructions to run:

install npm if you haven't already
run npm install inside ./server
create a file called "liftWithMe.db" inside ./server - this will be your local sqlite database for testing. There is no prod db yet.
create a file called ".env" inside ./server with these contents:

JWT_SECRET = [you can put any string here, it doesn't really matter, remember to wrap it in quotes]
Run "tsc" inside ./server to build code. Do this every time you make server side changes
Run "node dist/index" inside ./server to start server.

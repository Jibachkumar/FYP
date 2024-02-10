# project setup

for restart backend: whenever we make change we have to restart the server to told the server is updated (hot reloading concept)
using nodemon: its hepls to restart the server whenever we make change

for gitignore: using gitignore generator

for system related info: using .env (variable environment) gotenv lib: connecting server through .env

for code formating: using prettier

# project structure setup

Controllers file: functionality
DB: database collection logic
middlewares: for giving certain condition to the user while taken a res eg: logged in or not logic
models : for data modeling and scheme
routes : for routing things
utils(utility): reusability repeated functionality, make it easy for coder concept(do not repeat your self)

app file: for backend req, res logic
constants file: for reusable variable logic
index file: database connection logic

# database setup

for database: using mongoDB, mongoDB atlas (mongoDB sub-service provide shared data)

# database connection

for database connection: mongoose lib

# interact with server

for interact with server : express lib

///////////setting the server ///////////////
cors: cross resource origin share (which url could access the service ),

use() function: mostly used for middleware or configration

middleware: for user get req and server provide res. between req and res we add some condition ot check id user is logged in or not

cookie-parse: user browser cookie access

# library used:

dotenv: for environment variable, concept(only giving access who belongs to same origin)

express: for talk with server

mongoose: for database connection

cors: cross resource origin share,

cookie-parse:

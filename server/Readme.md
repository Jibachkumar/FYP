# project setup Start

restart backend: whenever we make change we have to restart the server to told the server is updated (hot reloading concept)
using nodemon: its helps to restart the server whenever we make change

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

# modeling / structure of data

for database : mongoose lib

# ////// setting / config server

for password security and hash password : bcrypt
for Authorization, access expire, token: jwt

middleware: userScheme

# project setup End

# writing routes and logic/functionality start

creating user router, trip route

# Controller:

1: jwt: for Auth
2.cookie-parser: access user data from browser
3.mongoose-aggregate-paginate-v2: DB query

1. implementing user register, login, logout functionality

2. implementing create trip functionality

# library used:

dotenv: for environment variable, concept(only giving access who belongs to same origin)

express: for talk with server

mongoose: for database connection

cors: cross resource origin share,

cookie-parse:

jsonwebtoken(jwt):create token bassed on bcrypt, jwt is a barrer token, its like a key who ever give me key give them a data,

mongoose-aggregate-paginate-v2: for DB query

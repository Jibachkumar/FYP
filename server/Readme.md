# project setup

for restart backend: whenever we make change we have to restart the server to told the server is updated (hot reloading concept)
using nodemon: its hepls to restart the server whenever we make change

for gitignore: using gitignore generator

for system related info: using .env (variable environment) gotenv lib: connecting server through .env

for code formating: using prettier

# project structure setup

Controllers file: functionality
DB: database collection logic
middlewares: for giving certain condtion between user and server request
models : for data modeling and scheme
routes : for routing things
utils(utility): reusability repeated functionality, make it easy for coder concept(do not repeat your self)

# database setup

for database: using mongoDB, mongoDB atlas (mongoDB sub-service provide shared data)

# database connection

for database connection: mongoose lib

app interact with server using, like getting req, and providing response: express
for interact with server: express lib

# library used:

dotenv: for environment variable, concept(only giving access who belongs to same origin)
express: for talk with server
mongoose: for database connection

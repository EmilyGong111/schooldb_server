note structure
- database server develop
- deploy
  
# database server
## database dev process
make sure the server is working
npm i mongoose
models - student.js
controllers - student.js
routes - student.js
## database access flow 
src-index.js -> routes-index.js -> course.js
                                -> student.js

## refers between students and courses
Add and remove refer functions are in student.js files.

## Error handler
* promise
* call back function
* async await
  - use try and catch within every request
    - try { } catch (e) { return res.status(400).json(e)}
    - try { } catch (e) { next(e)}
  - curring function / hight order function : 
  ```js
  function tryCatch(routeHandler) {
      return async (req, res, next) => {
          try{
              await routeHandler(req, res, next);
          } catch (e) {
              res.json(e);
              //next(e)
          }
      }
  }
  ```
  ```js
  studentRouter.get('', tryCatch(getAllStudents))
  ```
  - express-async-errors    chosen!

## validation
Joi chosen!
Mongoose accept validation in models schema -> only validate content before save it into database
Normal way -> validate schema in controllers or a separate file-> validate data before request 

## encrypt decrypt hash

password -> encrypt -> secret
                         ||
password <- decrypt <- secret

password -> hash -> secret, the secret can never be decrypt back to the password  chosen!

hash + salt 


## login

controllers-user -> generateToken -> routes-index -> middlewares-authGuard -> validateToken -> routes-student -> middlewares-adminGuard -> routes-student-add student

# deploy
mongoDB -> AWS
## cloud mongoDB database
### create cloud mongoDB database
mongoDB cloud -> create account -> create project -> create database -> create database user (who can get access to the database, normally is our server) 
### test to see if can be connect
 click connect button on cloud mongoDB database webpage -> copy connect string to mongdoDB compass -> replace <password> to the real password (created database user password) -> click connect button on local mongoDB compass user interface -> can see the database
## server 
### deploy tool
when server got some thing wrong then can restart our server
PM2 chosen! -> popular before docker 
```js
npm i pm2
```
config script
```js
  "scripts": {
    "start": "pm2 start src/index.js --name schooldb",
    "poststart": "pm2 log schooldb",//auto run after start command, to log the start.
    "stop":"pm2 stop schooldb",
    "dev":"nodemon src/index.js"
  }
```
## AWS
### elasticbeanstalk
create app -> name: school-db && platform: node.js && sample application -> create success - Health 
why elasticbeanstalk not EC2?
EC2 is empty, need to build the environment. While elasticbeanstalk install the environment for us. It is much easy. 

### deploy permission (server code)
add .npmrc file in server root folder to solve AWS deploy problem.

### code pipeline
to auto deploy server.
listen our code repo, if something changed, pull the code and update the code to elasticbeanstalk, then the elasticbeanstalk will start a new server.

create pipeline -> name && new service && next -> Source-GitHub version2 -> connect to GitHub - give a name -> Authorize -> back to pipeline page -> install a new app -> choose the repo -> install -> back to pipeline -> connect -> Choose repo name && Branch name && next -> skip build stage -> deploy - AWS Elastic Beanstalk && Region- ..(Sydney) && Application name && environment name && next -> Create pipeline -> it will deploy the server by default, once it success, next step...

elasticbeanstalk -> Schooldb-env ->Configration ->software edit ->

name              | value
CONNECTION_STRING | mongodb+srv://node:p3rZjm6R8mggz26f@cluster0.pthy6.mongodb.net/schooldb ->from mongoDB connection URL
JWT_KEY           | y0sGGgX8YmsXmShA1T1IsQOEInBv6gvQKJ3zWwsUFYalli4ARHx2IwhvU2dvbVwJNda85Og+wHeQGsJzpYWoyvsYh1NruQA9n4MuEcH/2EAcNo8kGhuxVgKhe8/j1rrxgMg/NIcpEsIoehQfM7kh65y60IMQg9Lt/ckuTxqFV0NTrr8qbbwkzezO4jBakwH/LQV6WFmeohOv0CWWa1ceLg4ep5NQkeeS5Ursa2lyFGN1cLU7UiDs6iFrtffsZbKQ7g8XHMU1KpZnU+1FqfiMDC6WUtvp0dFRll5tANhsFt52CMQ23W8QAEoUHgG7x6pKGR8S5ANgZ4J3vuiGZoxJuA==   -> $ openssl rand 256 | base64 

-> Apply



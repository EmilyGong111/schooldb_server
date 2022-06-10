# database dev process
make sure the server is working
npm i mongoose
models - student.js
controllers - student.js
routes - student.js
# database access flow 
src-index.js -> routes-index.js -> course.js
                                -> student.js

# refers between students and courses
Add and remove refer functions are in student.js files.

# Error handler
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

# validation
Joi chosen!
Mongoose accept validation in models schema -> only validate content before save it into database
Normal way -> validate schema in controllers or a separate file-> validate data before request 

# encrypt decrypt hash

password -> encrypt -> secret
                         ||
password <- decrypt <- secret

password -> hash -> secret, the secret can never be decrypt back to the password  chosen!

hash + salt 


# login

controllers-user -> generateToken -> routes-index -> middlewares-authGuard -> validateToken -> routes-student -> middlewares-adminGuard -> routes-student-add student

# deploy
mongoDB -> AWS
## create cloud mongoDB database
mongoDB cloud -> create account -> create project -> create database -> create database user (who can get access to the database, normally is our server) 
## test to see if can be connect
 click connect button on cloud mongoDB database webpage -> copy connect string to mongdoDB compass -> replace <password> to the real password (created database user password) -> click connect button on local mongoDB compass user interface -> can see the database
## deploy tool
when server got some thing wrong then can restart our server
PM2 chosen!
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
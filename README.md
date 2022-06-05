# TodoTasks service

RESTful APIs using Node.js, Express, and Mongoose.



**Quick Start**

install dependencies
```
npm install
```
* start server
```
npm start
```
* start database
```
mongo
```

## Features
- **NPM**: [npm](https://www.npmjs.com/) package manager
- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Dependency management**: with [npm](https://www.npmjs.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) 
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)

## Node version
```
">=16.0.0 && <17.0.0"
```

## Commands

Running locally:

```
npm start
```

## Environment Variables

The environment variables can be found and modified in the `.env.example` file. They come with these default values:

```
# Port number
PORT=
API_PREFIX =
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--utils\          # Utility classes and functions
 |--index.js          # App entry point
```
(In src, you may need a services folder work with controllers to reuse the services, depends on your logical needs)
## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/api-docs/` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the controllers file.

## Logging

Import the logger from `src/utils/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.



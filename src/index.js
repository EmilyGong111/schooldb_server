require('dotenv').config();//Read .env file, must have this sentence at top of this file
const express = require("express");
require('express-async-errors');
const cors = require('cors');
const helmet = require('helmet');
const v1Router = require("./routes");
const logger = require('./utils/logger');
const morgan = require("morgan");
const connectToDB = require('./utils/db');
const validationErrorHandler = require('./middlewares/validationErrorHandler');
const errorHandler = require('./middlewares/errorHandler');


const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());//Protect server from attack
app.use(cors({origin:"*"}));
app.use(morgan('common'));//HTTP request logger middleware for node.js. Will log the request ip, time, and method in terminal. Can only print, but can not store.
app.use(express.json());

app.use('/v1', v1Router);

app.use(validationErrorHandler);
app.use(errorHandler);

connectToDB();

app.listen(PORT,()=>{logger.info(`server is listening on port: ${PORT}`)}); //Will log the message in the format in logger.js


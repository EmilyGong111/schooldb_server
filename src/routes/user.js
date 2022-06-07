const express = require('express');
const {register} = require('../controllers/user');

const userRouter = express.Router();

userRouter.post('', register);


module.exports = userRouter;
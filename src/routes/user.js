const express = require('express');
const {register, login} = require('../controllers/user');

const userRouter = express.Router();

userRouter.post('', register);
userRouter.post('/login', login);


module.exports = userRouter;
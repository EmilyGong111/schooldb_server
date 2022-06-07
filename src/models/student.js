const {Schema, model} = require('mongoose');
const Joi = require('joi')

const schema = new Schema({
    firstName:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email) => {
                //regex -> regex101
                //joi -> frontend and backend. 
                //validator.js
                //express-validator
                return !Joi.string().email().validate(email).error;
                // const validation = Joi.string().email().validate(email);
                // const { error } = validation;
                // if (error) {
                //   return false;
                // }
                // return true;
                // why ! before Joi? cause if error, the express is true. Need ! to turn it into false to say validation failed. 如果返回false，才是验证失败.
            },
            msg: 'Invalid email format.',
        },
    },
    courses: [
        {
            type: String,
            ref: 'Course'
        }
    ]
});

const Model = model('Student', schema);
module.exports = Model;
const {Schema, model} = require('mongoose');

const schema = new Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})

const Model = model('User', schema);

module.exports = Model;
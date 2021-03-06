const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    }
})
// hash password
schema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 12);
};
schema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}
const Model = model('User', schema);

module.exports = Model;
const User = require('../models/user');

async function register(req, res) {
    const {username, password} = req.body;
    const user = new User({username, password});
      await user.save()
      return res.status(201).json(user);
}

module.exports = {
    register
}
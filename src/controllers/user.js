const User = require('../models/user');

async function register(req, res) {
    const {username, password} = req.body;
    const user = new User({username, password});
    //hash password
    await user.hashPassword();
    await user.save();
    return res.status(201).json(user);
}
async function login(req, res) {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username }).exec();
    if (!existingUser) {
      return res.status(401).json({ error: 'invalid username' });
    }
  
    const isPasswordValid = await existingUser.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'invalid password' });
    }
    // const token = await generateToken({ username });
    return res.json({ username });
  }
module.exports = {
    register,
    login
}
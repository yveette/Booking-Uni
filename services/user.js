const User = require('../models/User');
const { hash, compare } = require('bcrypt');

// TODO add validation
async function register(email, username, password) {
    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
        throw new Error('Email is taken!');
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        username,
        hashedPassword
    });
    await user.save();

    return user;
}

async function login(username, password) {
    const user = await getUserByUsername(username);

    if (!user) {
        throw new Error('Incorrect username or password!');
    }

    const hasMatch = await compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Incorrect username or password!');
    }

    return user;
}

async function getUserByEmail(email) {
    const user = User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
}

async function getUserByUsername(username) {
    const user = User.findOne({ username: new RegExp(`^${username}$`, 'i') });
    return user;
}

module.exports = {
    login,
    register
};
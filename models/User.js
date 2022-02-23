const { Schema, model, Types: { ObjectId } } = require('mongoose');

const EMAIL_PATTERN = /^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    email: {
        type: String, required: [true, 'Email is required!'], validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email must be valid!'
        }
    },
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    booked: { type: [ObjectId], ref: 'Hotel', default: [] },
    offered: { type: [ObjectId], ref: 'Hotel', default: [] },
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;
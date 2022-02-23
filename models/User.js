const { Schema, model, Types: { ObjectId } } = require('mongoose');

// TODO change user model
// TODO add validation

// const URL_PATTERN = /^https?:\/\/(.+)/;
// const NAME_PATTERN = /^[a-zA-Z]+$/;
// const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    email: { type: String, required: true },
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
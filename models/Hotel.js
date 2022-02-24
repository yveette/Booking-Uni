const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const hotelSchema = new Schema({
    hotel: {
        type: String,
        required: [true, 'Hotel is required!'],
        unique: true, minlength: [4, 'Name should be at least 4 characters!']
    },
    city: {
        type: String,
        required: [true, 'City is required!'],
        minlength: [3, 'City should be at least 4 characters!']
    },
    rooms: {
        type: Number,
        required: [true, 'Rooms are required!'],
        min: [1, 'The number of free rooms should be between 1 and 100'],
        max: [100, 'The number of free rooms should be between 1 and 100']
    },
    imgUrl: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'Image Url should be starts with http:// or https://'
        }
    },
    airCondition: { type: Boolean, default: false },
    owner: { type: ObjectId, ref: 'User', required: true },
    booked: { type: [ObjectId], ref: 'User', default: [] },
});

const Hotel = model('Hotel', hotelSchema);

module.exports = Hotel;
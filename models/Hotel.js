const { Schema, model, Types: { ObjectId } } = require('mongoose');

// const URL_PATTERN = /^https?:\/\/(.+)/;

const hotelSchema = new Schema({
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    imageUrl: { type: String, required: true },
    rooms: { type: Number, min: 1, max: 100 },
    owner: { type: ObjectId, ref: 'User', required: true },
    booked: { type: [ObjectId], ref: 'User', default: [] },
});

const Hotel = model('Hotel', hotelSchema);

module.exports = Hotel;
const Hotel = require('../models/Hotel');
const User = require('../models/User');

async function createHotel(hotel) {
    const result = new Hotel(hotel);
    await result.save();

    //add created id to user 
    const user = await User.findById(result.owner);
    user.offered.push(result._id);
    await user.save();
}

async function getAll() {
    //descending order by rooms
    return Hotel.find({}).sort({ rooms: -1 }).lean();
}

async function getHotelById(id) {
    return Hotel.findById(id).lean();
}

async function bookRoom(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId);

    if (hotel.booked.includes(userId)) {
        throw new Error('User is already booked a room!');
    }

    if (hotel.rooms -= 1 < 1) {
        throw new Error('There are no rooms left to book!');
    }

    hotel.rooms -= 1;
    hotel.booked.push(userId);
    await hotel.save();

    //add id of a hotel to user booked collection
    const user = await User.findById(userId);
    user.booked.push(hotelId);
    await user.save();
}


//when delete => delete in offered id

module.exports = {
    createHotel,
    getAll,
    getHotelById,
    bookRoom
};
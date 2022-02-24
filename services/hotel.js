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

    let rooms = hotel.rooms;
    rooms -= 1;
    if (rooms < 1) {
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

async function updateHotel(id, hotel) {
    const existing = await Hotel.findById(id);

    existing.hotel = hotel.hotel;
    existing.city = hotel.city;
    existing.rooms = hotel.rooms;
    existing.imgUrl = hotel.imgUrl;
    existing.airCondition = hotel.airCondition;

    await existing.save();
}

async function deleteById(hotelId, userId) {
    const user = await User.findById(userId);
    user.offered = user.offered.filter(u => u != hotelId);
    await user.save();
    
    //delete id of a hotel to user booked collection
    //when delete => delete in offered id
    const whoBooked = await User.find({ booked: hotelId });
    await whoBooked.forEach(user => {
        user.booked = user.booked.filter(u => u != hotelId);
        user.save();
    });

    await Hotel.findByIdAndDelete(hotelId);
}

async function getUserBooked(userId) {
    const booked = await Hotel.find({ owner: userId }).lean();
    return booked.map(p => p.hotel);
}

module.exports = {
    createHotel,
    getAll,
    getHotelById,
    bookRoom,
    updateHotel,
    deleteById,
    getUserBooked
};
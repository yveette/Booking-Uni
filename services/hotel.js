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
    return Hotel.find({}).lean();
}

//when delete => delete in offered id

module.exports = {
    createHotel,
    getAll
};
const { getHotelById } = require('../services/hotel');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        const data = await getHotelById(id);
        res.locals.data = data;
        next();
    };
}

module.exports = preload;
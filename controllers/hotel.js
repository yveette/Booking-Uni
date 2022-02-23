const router = require('express').Router();

const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createHotel, bookRoom } = require('../services/hotel');
const mapErrors = require('../util/mappers');


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page', data: {} });
});

router.post('/create', isUser(), async (req, res) => {
    const hotel = {
        hotel: req.body.hotel,
        city: req.body.city,
        rooms: req.body.rooms,
        imgUrl: req.body.imgUrl,
        owner: req.session.user._id
    };

    try {
        await createHotel(hotel);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', data: hotel, errors });
    }
});

router.get('/details/:id', isUser(), preload(), (req, res) => {
    const hotel = res.locals.data;

    hotel.isOwner = req.session.user?._id == hotel.owner._id;

    if (hotel.booked.some(u => u._id == req.session.user._id)) {
        hotel.isBooked = true;
    }

    res.render('details', { title: 'Details Page', data: hotel });
});

router.get('/book/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await bookRoom(id, req.session.user._id);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect('/details/' + id);
    }
});

module.exports = router;
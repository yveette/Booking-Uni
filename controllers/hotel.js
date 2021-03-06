const router = require('express').Router();

const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createHotel, bookRoom, updateHotel, deleteById, getUserBooked } = require('../services/hotel');
const mapErrors = require('../util/mappers');


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page', data: {} });
});

router.post('/create', isUser(), async (req, res) => {

    let airCondition = '';
    if (req.body.airCondition == 'on') {
        airCondition = true;
    } else {
        airCondition = false;
    }

    const hotel = {
        hotel: req.body.hotel,
        city: req.body.city,
        rooms: req.body.rooms,
        imgUrl: req.body.imgUrl,
        owner: req.session.user._id,
        airCondition: airCondition
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

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Page' });
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;

    let airCondition = '';
    if (req.body.airCondition == 'on') {
        airCondition = true;
    } else {
        airCondition = false;
    }

    const hotel = {
        hotel: req.body.hotel,
        city: req.body.city,
        rooms: req.body.rooms,
        imgUrl: req.body.imgUrl,
        airCondition: airCondition
    };

    try {
        await updateHotel(id, hotel);
        res.redirect('/details/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        hotel._id = id;
        res.render('edit', { title: 'Edit Page', data: hotel, errors });
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteById(req.params.id, req.session.user._id);
    res.redirect('/');
});

router.get('/profile', isUser(), async (req, res) => {
    const userBooked = await getUserBooked(res.locals.user._id);

    if (userBooked != []) {
        res.locals.user.hasBooked = true;
        res.locals.user.userBooked = userBooked;
    }

    res.render('profile', { title: 'Profile Page' });
});

module.exports = router;
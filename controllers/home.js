const { getAll } = require('../services/hotel');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const hotels = await getAll();
    res.render('home', { title: 'BookingUni', hotels });
});

module.exports = router;
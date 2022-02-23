const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const hotelController = require('../controllers/hotel');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(hotelController);

    // TODO add not found page
    app.get('*', (req, res) => {
        res.status(404).render('404', { title: 'Page Not Found!' });
    });
};
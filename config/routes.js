const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
// TODO add other controllers....

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);

    // TODO add not found page
    app.get('*', (req, res) => {
        res.status(404).render('404', { title: 'Page Not Found!' });
    });
};
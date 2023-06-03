const router = require('express').Router();
const passport = require('passport');


// Auth login
router.get('/login', (req, res) => {
    res.render('login')
});

// Auth logout
router.get('/logout', (req, res) => {
    // Handle with passport
    res.send('Logging out');
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// redirect callback route for Google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('You have reached the Callback URI')
})

module.exports = router;
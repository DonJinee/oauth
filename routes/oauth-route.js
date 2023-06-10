const router = require('express').Router();
const passport = require('passport');


// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// redirect callback route for Google
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.render('dashboard', {user: req.user});
})

module.exports = router;
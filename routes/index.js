const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

// Auth login
router.get('/', ensureGuest, (req, res) => {
    res.render('login')
});

// Auth dashboard
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err) }
      res.redirect('/');
    });
  })

// Auth dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard', {user: req.user});
})

module.exports = router;
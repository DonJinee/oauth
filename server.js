const express = require('express');
const Port = process.env.Port || 8080;
const app = express();
const authRoutes = require('./routes/oauth-route');
const passport = require('./config/passport-setup');
const connectDB = require('./config/connect');

// Set up a view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home')
});

app.use('/auth', authRoutes)

connectDB();
app.listen(Port, () => {
    console.log(`Oauth server running on port ${Port}`);
})
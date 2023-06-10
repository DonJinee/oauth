const express = require('express');
const Port = process.env.Port || 8080;
const app = express();
const authRoutes = require('./routes/oauth-route');
const passport = require('passport');
const session = require('express-session');
const passport_setup = require('./config/passport-setup');
const connectDB = require('./config/connect');
const path = require('path')
passport_setup(passport)
const MongodbStore = require('connect-mongo')(session)
const mongoose = require('mongoose')


// Set up a view engine
// app.engine('.hbs',  engine({defaultLayout: 'main', extname: '.hbs'}))
// app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs')

// Sessions
app.use(session({
    secret: 'donjinee',
    resave: false,
    saveUninitialized: false,
    store: new MongodbStore({mongooseConnection: mongoose.connection})
}))

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'))
app.use('/auth', authRoutes)

connectDB();
app.listen(Port, () => {
    console.log(`Oauth server running on port ${Port}`);
})
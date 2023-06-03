const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config();
const User = require('../models/user-model');

passport.use(
    new GoogleStrategy({
        // Options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    },(accessToken, refreshToken, ProfileInfo, done) => {
        // Check if user exists on database 
        User.findOne({googleId: ProfileInfo.id}).then((existingUser) => {
            if (existingUser) {
                // User exists
                console.log(`User already exists: ${existingUser}`)
            } else{
                // User doesn't exist. Create new user
                const createUser = async() => {
                    const userInfo = {
                        username: ProfileInfo.displayName,
                        googleId: ProfileInfo.id
                    }
                    const user = new User(userInfo);
                    try{
                        const savedUser = await user.save();
                        console.log(`New user created: ${savedUser}`)
                    }catch(err){
                        console.log(err)
                    }
                }
                createUser();
            }
        })
            
    })
);
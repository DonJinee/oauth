const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const passport = require('passport');
require('dotenv').config()



const myGoogleStrategy = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, async (acessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try{
            let user = await User.findOne({googleId: profile.id})

            if(user) {
                done(null, user)
                console.log(`User exists: ${user}`)
            } else {
                user = await User.create(newUser)
                done(null, user)
                console.log(`New user: ${user}`);
            }
        } catch(err) {
            console.log(err)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    
    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            done(null, user)
        })
    })
}

module.exports = myGoogleStrategy;

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
// require('dotenv').config();
// const User = require('../models/user-model');

// passport.use(
//     new GoogleStrategy({
//         // Options for google strategy
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: '/auth/google/redirect'
//     },(accessToken, refreshToken, ProfileInfo, done) => {
//         // Check if user exists on database 
//         User.findOne({googleId: ProfileInfo.id}).then((existingUser) => {
//             if (existingUser) {
//                 // User exists
//                 console.log(`User already exists: ${existingUser}`)
//             } else{
//                 // User doesn't exist. Create new user
//                 const createUser = async() => {
//                     const userInfo = {
//                         username: ProfileInfo.displayName,
//                         googleId: ProfileInfo.id
//                     }
//                     const user = new User(userInfo);
//                     try{
//                         const savedUser = await user.save();
//                         console.log(`New user created: ${savedUser}`)
//                     }catch(err){
//                         console.log(err)
//                     }
//                 }
//                 createUser();
//             }
//         })
            
//     })
// );
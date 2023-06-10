const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    let connect;
    try{
       connect = await mongoose.connect(process.env.MONGODB_URI);
       console.log(`DB connected!!!`)
    }catch(err){
        console.log('Problem with server connection!!!')
    }
    return connect;
}



module.exports = connectDB;
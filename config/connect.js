const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    let connect;
    try{
       connect = mongoose.connect(process.env.MONGODB_URI);
       console.log('DB connected!!!')
    }catch(err){
        console.log('Problem with connection!!!')
    }
    return connect;
}



module.exports = connectDB;
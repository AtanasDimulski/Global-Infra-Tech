const mongoose = require('mongoose');


const connectDB = (url) =>{
    mongoose.connect(url)
    mongoose.connection.once('open', () => { 
        console.log('connected to database'); 
    }); 
    mongoose.connection.on('error', console.error);
}

module.exports = connectDB
const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String
    },
    text:{
        type:String
    },
    date:Date
})

module.exports = mongoose.model('News', NewsSchema)
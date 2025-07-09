const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema({
       adminId:{
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Admin'
        },
        img: String,
        hotelName: String,  
        hotelDesc: String, 
        hotelLocation: String,
        
})

const hotel = mongoose.model('Hotel', hotelSchema);

module.exports = hotel
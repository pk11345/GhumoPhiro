const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'admin' },
    images: [{
        img: String,
        hotelName: String,
        hotelDesc: String,
        hotelLocation: String
    }]
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

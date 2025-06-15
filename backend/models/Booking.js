const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  hotelName: String,
  hotelLocation: String,
  fullName: String,
  email: String,
  phone: String,
  guests: Number,
  checkIn: Date,
  checkOut: Date,
},{ timestamps: true });


module.exports = mongoose.model('Booking', BookingSchema);

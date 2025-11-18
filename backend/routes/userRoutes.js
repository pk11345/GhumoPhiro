const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const isLoggedIn = require('../middleware/authUser');
const Booking = require('../models/Booking');

// User Signup
router.post('/UserSignup', async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).send('User already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ email, role: 'user' }, 'shhhh');
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.send('registered');
});

// User Login
router.post('/UserLogin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('User not registered');
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
        const token = jwt.sign({ email, role: 'user' }, 'shhhh');
        res.cookie('token', token, {
            httpOnly: true,
            secure: req.protocol === "https",   // true if https, false if http
            sameSite: req.protocol === "https" ? "none" : "lax", // 'none' for cross-site cookies on https
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ message: 'Logged in', token });
    } else {
        return res.status(401).send('Invalid credentials');
    }
});

// User Dashboard
router.get('/UserDashboard', isLoggedIn, async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
   
    console.log( res.send(user))
    console.log(user, "user data")
});

// User Logout
router.get('/UserLogout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(0)
    });
    res.status(200).send({ message: 'Logged out successfully' });
});


router.post("/bookHotel", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

// Get My Bookings for Logged-in User
router.get('/myBookings', isLoggedIn, async (req, res) => {
  try {
    const userEmail = req.user.email;

    const bookings = await Booking.find({ email: userEmail }).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});


module.exports = router;

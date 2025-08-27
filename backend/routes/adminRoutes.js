const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const AdminIsLoggedIn = require('../middleware/authAdmin');
const Booking = require('../models/Booking');
const hotelModel = require('../models/Hotel');

 

// Admin Signup
router.post('/AdminSignup', async (req, res) => { 
    const { name, email, password } = req.body;

    let admin = await Admin.findOne({ email });
    if (admin) {
        return res.status(400).send('Admin already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({
        name,
        email,
        password: hashedPassword
    });

    await admin.save();

    const token = jwt.sign({ email, role: 'admin' }, 'shhhh');
    res.cookie('Admintoken', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).send('registered success');
});

// Admin Login
router.post('/AdminLogin', async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(400).send('Admin not registered');
    }

    const result = await bcrypt.compare(password, admin.password);
    if (result) {
        const token = jwt.sign({ email, role: 'admin' }, 'shhhh');
        res.cookie('Admintoken', token, {
            httpOnly: true,
            sameSite: 'none',
            secure:true,
            maxAge: 2 * 60 * 1000
        })
        return res.status(200).json({ message: 'Logged in', token });
    } else {
        return res.status(401).send('Invalid credentials');
    }
});

// Admin Dashboard
// router.get('/AdminDashboard', AdminIsLoggedIn, async (req, res) => {
//     const admin = await Admin.findOne({ email: req.admin.email });
//     res.send(admin);
// });
// Admin Dashboard with Hotel Details
router.get('/AdminDashboard', AdminIsLoggedIn, async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.admin.email }).populate('hotels');
    if (!admin) return res.status(404).send('Admin not found');

//    res.status(200).json({ admin });
      res.send({admin})
  
   
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// Admin Logout
router.get('/AdminLogout', (req, res) => {
    res.cookie('Admintoken', '', {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(0)
    });
    res.status(200).send({ message: 'Logged out successfully' });
});

// Upload Hotels
router.post('/upload-hotel', AdminIsLoggedIn, async (req, res) => {
    const admin = await Admin.findOne({email:req.admin.email})

    const { img, hotelName, hotelDesc, hotelLocation } = req.body;
    const hotel = new hotelModel({
        adminId:admin._id,
        img,
        hotelName,
        hotelDesc,
        hotelLocation
    })

    if (!img || !hotelName || !hotelDesc || !hotelLocation) {
        return res.status(400).send('All fields are required');
    }

    if (!admin) {
        return res.status(404).send('Admin not found');
    }

    admin.hotels.push(hotel._id);

    await admin.save();
    await hotel.save()

    res.status(200).send({ message: 'Image and details saved', images: admin.images });
});

// Update Admin Profile
router.put('/AdminUpdate', AdminIsLoggedIn, async (req, res) => {
    const { name, password } = req.body;

    const updateFields = { name };

    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateFields.password = hashedPassword;
    }

    const updatedAdmin = await Admin.findOneAndUpdate(
        { email: req.admin.email },
        updateFields,
        { new: true }
    );

    if (!updatedAdmin) {
        return res.status(404).send('Admin not found');
    }

    res.status(200).json({ message: 'Admin updated', admin: updatedAdmin });
});

// Update Hotel
router.put('/updateHotel/:id', AdminIsLoggedIn, async (req, res) => {
    const { hotelName, hotelDesc, hotelLocation } = req.body;
    const imageId = req.params.id;

    const admin = await Admin.findOne({ email: req.admin.email });
    if (!admin) {
        return res.status(404).send('Admin not found');
    }

    const imageToUpdate = admin.images.id(imageId);
    if (!imageToUpdate) {
        return res.status(404).send('Hotel image not found');
    }

    if (hotelName) imageToUpdate.hotelName = hotelName;
    if (hotelDesc) imageToUpdate.hotelDesc = hotelDesc;
    if (hotelLocation) imageToUpdate.hotelLocation = hotelLocation;

    await admin.save();

    res.status(200).json({ message: 'Hotel updated successfully', updatedImage: imageToUpdate });
});

// Get All Hotels
router.get('/getHotels', async (req, res) => {
    const allHotels = await hotelModel.find();
    // const allHotels = admins.flatMap(admin => admin.images);
    res.status(200).json(allHotels);
});

//hotel bookings
router.get('/allBookings',AdminIsLoggedIn, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const isLoggedIn = require('../middleware/authUser');

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
            sameSite: 'strict',
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
    res.send(user);
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

module.exports = router;

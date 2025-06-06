const jwt = require('jsonwebtoken');

function isLoggedIn(req, res, next) {
    if (!req.cookies.token) {
        return res.status(401).send('You have to login first');
    }

    try {
        const data = jwt.verify(req.cookies.token, 'shhhh');
        req.user = data;
        next();
    } catch (error) {
        return res.status(401).send('Invalid or expired token');
    }
}

module.exports = isLoggedIn;

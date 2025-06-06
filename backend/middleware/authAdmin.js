const jwt = require('jsonwebtoken');

function AdminIsLoggedIn(req, res, next) {
    if (!req.cookies.Admintoken) {
        return res.status(401).send('You have to login first');
    }

    try {
        const data = jwt.verify(req.cookies.Admintoken, 'shhhh');
        req.admin = data;
        next();
    } catch (error) {
        return res.status(401).send('Invalid or expired token');
    }
}

module.exports = AdminIsLoggedIn;

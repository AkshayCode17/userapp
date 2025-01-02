const User = require('../models/user.model');
const jwt = require("jsonwebtoken")

require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Authentication required' });
    }
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const user = await User.findById(decoded.userId);

        if (!user || user.currentToken !== token) {
            return res.status(401).json({ message: 'Invalid or expired session' });
        }

        req.body.userId = decoded.userId
        req.body.email = decoded.email
        req.user = { userId: decoded.userId, email: decoded.email };
        next()

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware
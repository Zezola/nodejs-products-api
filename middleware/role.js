const jsonwebtoken = require('jsonwebtoken');
const config = process.env;
const verifyRole = (req, res, next) => {
    if (req.user.user_role !== 'ADMIN') {
        return res.status(403).json({message: "Access denied. ADMIN role required"})
    }
    next();
}

module.exports = verifyRole;
const jsonwebtoken = require('jsonwebtoken');
const config = process.env;
const verifyRole = (rolesArray) => {
    return (req, res, next) => {
        const userRole = req.user.user_role; 
        if (!rolesArray.includes(userRole)) {
            res.status(403).json({message: "Permission denied for user"})
        }
        next();
    }
    
}


module.exports = verifyRole;
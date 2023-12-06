const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        required: true,
        type: String,
        enum: ['SUPERADMIN', 'ADMIN', 'VISITOR']
    },
    token: {
        type: String
    }
})

module.exports = new mongoose.model('User', userSchema);
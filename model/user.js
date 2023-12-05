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
        enum: ['ADMIN', 'NORMAL']
    },
    token: {
        type: String
    }
})

module.exports = new mongoose.model('User', userSchema);
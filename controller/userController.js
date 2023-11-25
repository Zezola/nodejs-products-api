const userModel = require('../model/user');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const {username, password} = req.body;
        /* Verify if all the input fields are filled */
        if (!(username && password)) {
            res.status(400).send("username and password are required")
        }
        /* Verify if the username already exists in the database */
        const oldUser = await userModel.findOne({username})
        if (oldUser) {
            return res.status(409).send("User alredy exists")
        }
        /* Encrypt user password */
        encryptedPassword = await bcrypt.hash(password, 10);
        /* Create user in the database */
        const user = await userModel.create({
            username: username, 
            password: encryptedPassword
        })
        
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send({message: error})
    }
}

exports.login = async (req, res) => {
    try {
        /* get user input */
        const {username, password} = req.body;
        
        /* validate user input */
        if (!(username && password)) {
            res.status(400).send("username and password are required");
        }
        /* validate if user exists in database */
        const user = await userModel.findOne({username});
        if (user && (await bcrypt.compare(password, user.password))) {
            /* create token */
            const token = jwt.sign(
                {user_id: user._id, username},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "5h"
                }
            )
            /* save user token */
            user.token = token

            /* user */
            return res.status(200).json(user);
        }
        return res.status(404).send("Invalid credentials");
    } catch (error) {
        res.status(500).send({message: error.message})
    }
};


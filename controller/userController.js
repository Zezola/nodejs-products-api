const userModel = require('../model/user');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.register = async (req, res) => {
    try {
        
        const {username, password} = req.body;
        /* Verify if all the input fields are filled 
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
            password: encryptedPassword,
            role: 'NORMAL'
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
                {user_id: user._id, username, user_role: user.role},
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

exports.getAll = async (req, res) => {
    try {
        const data = await userModel.find();
        res.json(data);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
}

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await userModel.findById(id);
        res.json(data);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id; 
        const {username, password} = req.body
        const options = {new: true};
        const updatedData = {username, password}
        const result = await userModel.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result);
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id; 
        const data = await userModel.findByIdAndDelete(id);
        res.send(data);
    }catch(error) {
        res.status(400).json({message: error.message})
    }
}
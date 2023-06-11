const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator')
const { User } = require("../models/Model")

const addUser = async (req, res, next) => {
    const { googleId } = req.body;
    const newUser = new User({
        googleId
    })
    const result = await newUser.save();

    res.json(result);
}

exports.addUser = addUser;

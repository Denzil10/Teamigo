const { User } = require("../models/Model")

const addUser = async (req, res, next) => {
    const { googleId, name } = req.body;
    const newUser = new User({
        googleId,
        name
    })
    const result = await newUser.save();

    res.json(result);
}

const getAllUsers = async (req, res, next) => {
    const result = await User.find();
    let arr = [];
    result.forEach(element => {
        const { _id, name } = element;
        arr.push(
            {
                _id, name
            }
        )
    });
    res.json({ result: arr })
}

exports.addUser = addUser;
exports.getAllUsers = getAllUsers
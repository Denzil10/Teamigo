const { User } = require("../models/Model")

const addUser = async (req, res, next) => {
    const { googleId, name } = req.body;
    const newUser = new User({
        googleId,
        name
    })
    const user = await User.findOne({
        googleId: googleId
    })
    let result
    if (user) {
        result = "User already exist "
    } else {
        try {
            result = await newUser.save();
            result = "added successfully"
        } catch (error) {
            result = "Failed"
        }

    }

    res.json({ result: result });
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
const { User, HttpError } = require("../models/Model")

const asyncErrorHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(err => next(err));
    }
}
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

const getMongoIdByGoogleId = asyncErrorHandler(async (req, res, next) => {
    const { googleId } = req.body
    const result = await User.findOne({
        googleId: googleId
    });
    if (!result) {
        throw new HttpError("user not found", 404)
    }
    res.json({ _id: result._id })
})

exports.addUser = addUser;
exports.getAllUsers = getAllUsers
exports.getMongoIdByGoogleId = getMongoIdByGoogleId
const { Invite, User } = require("../models/Model")

//to be changed
const sendInvite = async (req, res, next) => {
    const { sendingTeamName, description, eventName, recipientName } = req.body;
    const newInvite = new Invite({
        sendingTeamName,
        description,
        eventName
    })
    const result = await newInvite.save();

    res.json(result);
}

//to be changed
const getInvites = async (req, res, next) => {
    const result = await Invite.find();
    let arr = [];
    result.forEach(element => {
        const { sendingTeamName, description, eventName } = element;
        arr.push(
            {
                sender: sendingTeamName,
                description,
                eventName
            }
        )
    });
    res.json({ result: arr })
}

exports.sendInvite = sendInvite
exports.getInvites = getInvites

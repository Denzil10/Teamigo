const { Invite, User } = require("../models/Model")


const sendInvite = async (req, res, next) => {
    const { sendingTeamId, description, eventId, recipientId } = req.body;
    const newInvite = new Invite({
        sendingTeamId,
        description,
        eventId
    })
    const inviteResult = await newInvite.save();
    const user = await User.findOne({
        _id: recipientId
    })
    user.invites.push(newInvite._id);
    const userResult = await user.save();
    res.json({ result: [inviteResult, userResult] });
}

const getInvites = async (req, res, next) => {
    const { userId } = req.body;
    const user = await User.findOne({
        _id: userId
    })
    const arrOfInviteId = user.invites;

    let arr = [];
    for (let i = 0; i < arrOfInviteId.length; i++) {
        const element = arrOfInviteId[i];
        let invite = await Invite.findOne(element)
        arr.push(invite)
    }
    res.json({ result: arr })
}

exports.sendInvite = sendInvite
exports.getInvites = getInvites

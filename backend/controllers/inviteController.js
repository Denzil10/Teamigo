const { Invite, User, Team } = require("../models/Model")


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

const rejectInvite = async (req, res, next) => {
    const { userId, inviteId } = req.body;

    const user = await User.findOne({
        _id: userId
    })
    let arrOfInvites = user.invites;

    let index = arrOfInvites.indexOf(inviteId);

    if (index !== -1) {
        arrOfInvites.splice(index, 1);
    }

    const userResult = await user.save();
    const inviteResult = await Invite.deleteOne({
        _id: inviteId
    })
    res.json({ result: [userResult, inviteResult] });
}


const acceptInvite = async (req, res, next) => {
    const { userId, inviteId } = req.body;

    const user = await User.findOne({
        _id: userId
    })
    let arrOfInvites = user.invites;

    let index = arrOfInvites.indexOf(inviteId);

    if (index !== -1) {
        arrOfInvites.splice(index, 1);
    }
    const invite = await Invite.findOne({
        _id: inviteId
    })
    const team = await Team.findOne({
        _id: invite.sendingTeamId
    })
    team.members.push(user.name);
    const teamResult = await team.save();
    const userResult = await user.save();
    const inviteResult = await Invite.deleteOne({
        _id: inviteId
    })
    res.json({ result: [userResult, inviteResult, teamResult] });
}

exports.sendInvite = sendInvite
exports.getInvites = getInvites
exports.rejectInvite = rejectInvite
exports.acceptInvite = acceptInvite
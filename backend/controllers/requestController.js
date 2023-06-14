const { Request, Team, User } = require("../models/Model")


const sendRequest = async (req, res, next) => {
    const { sendingParticipantId, description, eventId, teamId } = req.body;

    const newRequest = new Request({
        sendingParticipantId,
        description,
        eventId,
        teamId
    })
    const team = await Team.findOne({
        _id: teamId
    })
    const teamLeaderId = team.leaderId;
    let teamLeader = await User.findOne({
        _id: teamLeaderId
    })
    teamLeader.requests.push(newRequest._id)

    const requestResult = await newRequest.save();
    const teamLeaderResult = await teamLeader.save();
    res.json({ result: [requestResult, teamLeaderResult] });
}



exports.sendRequest = sendRequest
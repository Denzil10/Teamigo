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



const getRequestsByUserId = async (req, res, next) => {
    const { userId } = req.body;
    const user = await User.findOne({
        _id: userId
    })
    const arrOfRequestId = user.requests;

    let arr = [];
    for (let i = 0; i < arrOfRequestId.length; i++) {
        const element = arrOfRequestId[i];
        let request = await Request.findOne(element)
        arr.push(request)
    }
    res.json({ result: arr })
}


const acceptRequest = async (req, res, next) => {
    const { requestId } = req.body;

    const request = await Request.findOne({
        _id: requestId

    })
    const sendingParticipant = await User.findOne({
        _id: request.sendingParticipantId
    });

    const team = await Team.findOne({
        _id: request.teamId
    })
    team.members.push(sendingParticipant.name);


    const teamLeader = await User.findOne({
        _id: team.leaderId
    })

    let arrOfRequests = teamLeader.requests;

    let index = arrOfRequests.indexOf(requestId);

    if (index !== -1) {
        arrOfRequests.splice(index, 1);
    }


    //code to be added
    //to send notification that request is accepted
    //by the team leader

    const teamResult = await team.save();
    const requestResult = await Request.deleteOne({
        _id: requestId
    })
    const teamLeaderResult = await teamLeader.save();


    res.json({ result: [teamResult, requestResult, teamLeaderResult] });
}

const rejectRequest = async (req, res, next) => {
    const { requestId, leaderId } = req.body;

    const teamLeader = await User.findOne({
        _id: leaderId
    })

    let arrOfRequests = teamLeader.requests;
    let index = arrOfRequests.indexOf(requestId);

    if (index !== -1) {
        arrOfRequests.splice(index, 1);
    }


    const requestResult = await Request.deleteOne({
        _id: requestId
    })
    const teamLeaderResult = await teamLeader.save();


    res.json({ result: [requestResult, teamLeaderResult] });
}

exports.sendRequest = sendRequest
exports.getRequestsByUserId = getRequestsByUserId
exports.acceptRequest = acceptRequest
exports.rejectRequest = rejectRequest
const { Request, Team, User, asyncErrorHandler, HttpError } = require("../models/Model")


const sendRequest = asyncErrorHandler(async (req, res, next) => {
    const { sendingParticipantId, description, eventId, teamId } = req.body;

    const team = await Team.findOne({
        _id: teamId
    })
    if (!team) {
        throw new HttpError("Team not found", 404)
    }

    const participant = await User.findOne({
        _id: sendingParticipantId
    })
    if (!participant) {
        throw new HttpError("Participant not found", 404)
    }

    const event = await Event.findOne({
        _id: eventId
    })
    if (!event) {
        throw new HttpError("event not found", 404)
    }

    const newRequest = new Request({
        sendingParticipantId,
        description,
        eventId,
        teamId
    })
    const teamLeaderId = team.leaderId;
    let teamLeader = await User.findOne({
        _id: teamLeaderId
    })
    teamLeader.requests.push(newRequest._id)

    const requestResult = await newRequest.save();
    const teamLeaderResult = await teamLeader.save();

    if (!requestResult || !teamLeaderResult) {
        throw new HttpError("something went wrong while sending request", 500)
    }
    res.status(201).json({ message: "request successfully sent" });
})



const getRequestsByUserId = asyncErrorHandler(async (req, res, next) => {
    const { userId } = req.body;
    const user = await User.findOne({
        _id: userId
    })
    if (!user) {
        throw new HttpError("user not found", 404)
    }
    const arrOfRequestId = user.requests;

    let arr = [];
    for (let i = 0; i < arrOfRequestId.length; i++) {
        const element = arrOfRequestId[i];
        let request = await Request.findOne(element)
        arr.push(request)
    }
    res.json({ result: arr })
})

const acceptRequest = (async (req, res, next) => {
    const { requestId } = req.body;

    const request = await Request.findOne({
        _id: requestId

    })
    if (!request) {
        throw new HttpError("request not found", 404)
    }

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
    if (!teamResult || !rejectRequest || !teamLeaderResult) {
        throw new HttpError("something went wrong while accepting request", 500)
    }

    res.json({ message: "request accepted successfully" });
})


const rejectRequest = asyncErrorHandler(async (req, res, next) => {
    const { requestId, leaderId } = req.body;

    const teamLeader = await User.findOne({
        _id: leaderId
    })

    if (!teamLeader) {
        throw new HttpError("leader not found", 404)
    }

    const request = await User.findOne({
        _id: requestId
    })

    if (!request) {
        throw new HttpError("request not found", 404)
    }

    let arrOfRequests = teamLeader.requests;
    let index = arrOfRequests.indexOf(requestId);

    if (index !== -1) {
        arrOfRequests.splice(index, 1);
    }


    const requestResult = await Request.deleteOne({
        _id: requestId
    })
    const teamLeaderResult = await teamLeader.save();

    if (!rejectRequest || !teamLeaderResult) {
        throw new HttpError("something went wrong while rejecting request", 500)
    }
    res.json({ result: [requestResult, teamLeaderResult] });
})

exports.sendRequest = sendRequest
exports.getRequestsByUserId = getRequestsByUserId
exports.acceptRequest = acceptRequest
exports.rejectRequest = rejectRequest
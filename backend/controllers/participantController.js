const { Participant, User, Team, Event } = require("../models/Model")


const addParticipantAndTeam = async (req, res, next) => {
    const { eventId, description, googleId, type, members } = req.body;

    let result;
    const user = await User.findOne({
        googleId: googleId
    });
    if (type == "finding") {
        const newParticipant = new Participant({
            eventId,
            description,
            participantId: user._id
        });
        result = await newParticipant.save();

    }
    else {
        const newTeam = new Team({
            leaderId: user._id,
            description,
            members
        })
        const event = await Event.findOne({
            _id: eventId
        })
        event.teamIDs.push(newTeam._id)
        const teamResult = await newTeam.save();
        const eventResult = await event.save();
        result = [teamResult, eventResult];
    }
    res.json(result);
}



const getParticipantsByEventId = async (req, res, next) => {
    const { eventId } = req.body;
    let result = await Participant.find({
        eventId: eventId
    })
    console.log(result);
    res.json({ result: result })
}

exports.addParticipantAndTeam = addParticipantAndTeam
exports.getParticipantsByEventId = getParticipantsByEventId
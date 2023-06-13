const { Team, Event } = require("../models/Model")

//outdated
const addTeam = async (req, res, next) => {
    const { teamName, description, leaderMongoId, members, eventId } = req.body;
    const newTeam = new Team({
        teamName,
        description,
        leaderId: leaderMongoId,
        members
    })
    const event = await Event.findOne({
        _id: eventId
    })
    event.teamIDs.push(newTeam._id)
    const teamResult = await newTeam.save();
    const eventResult = await event.save();

    res.json({
        teamResult,
        eventResult
    });
}


//not complete
const getTeamsByEventId = async (req, res, next) => {
    const { teamName, description, leaderMongoId, members, eventId } = req.body;



    res.json(result);
}

exports.addTeam = addTeam
exports.getTeamsByEventId = getTeamsByEventId

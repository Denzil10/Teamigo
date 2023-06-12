const { Team, Event } = require("../models/Model")


const addTeam = async (req, res, next) => {
    const { teamName, description, leaderMongoId, members, eventId } = req.body;
    const newTeam = new Team({
        teamName,
        description,
        leaderId: leaderMongoId,
        members
    })
    console.log(newTeam);
    const event = await Event.findOne({
        _id: eventId
    })
    console.log(event);
    event.teamIDs.push(newTeam._id)
    console.log(event)
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

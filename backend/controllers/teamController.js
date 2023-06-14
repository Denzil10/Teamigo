const { Team, Event, User } = require("../models/Model")

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


const getTeamsByEventId = async (req, res, next) => {
    const { eventId } = req.body;

    let event = await Event.find({
        _id: eventId
    })
    let arrOfTeams = event[0].teamIDs;
    let result = [];

    for (let i = 0; i < arrOfTeams.length; i++) {
        const element = arrOfTeams[i];
        const team = await Team.findOne({
            _id: element
        })
        result.push(team)


    }
    res.json({ result: result });
}

//not tested
const getTeamsByTeamLeaderId = async (req, res, next) => {
    const { leaderId } = req.body;

    const result = await Team.find({
        leaderId: leaderId
    })
    res.json({ result: result });
}

exports.addTeam = addTeam
exports.getTeamsByEventId = getTeamsByEventId
exports.getTeamsByTeamLeaderId = getTeamsByTeamLeaderId

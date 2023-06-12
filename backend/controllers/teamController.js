const { Team } = require("../models/Model")






////// not complete 
const addTeam = async (req, res, next) => {
    const { teamName, description, leaderMongoID, members } = req.body;
    const newTeam = new Team({
        teamName,
        description,
        leaderID: leaderMongoID,
        members
    })
    const result = await newTeam.save();
    res.json(result);
}

exports.addTeam = addTeam

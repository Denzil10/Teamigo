const { Event } = require("../models/Model")

const addEvent = async (req, res, next) => {
    const { eventName, organizer, description, minTeamSize, maxTeamSize, date, time } = req.body;


    let timeStamp = date + "T" + time + ":00Z"
    timeStamp = new Date(timeStamp)
    const newEvent = new Event({
        eventName,
        organizer,
        description,
        minTeamSize,
        maxTeamSize,
        timeStamp: timeStamp
    })
    const result = await newEvent.save();

    res.json(result);
}

const getEvents = async (req, res, next) => {
    const result = await Event.find();
    let arr = [];
    result.forEach(element => {
        const { _id, eventName, organizer, description, minTeamSize, maxTeamSize, timeStamp } = element;
        arr.push(
            {
                _id, eventName, organizer, description, minTeamSize, maxTeamSize, timeStamp
            }
        )
    });
    res.json({ result: arr })
}
exports.addEvent = addEvent
exports.getEvents = getEvents

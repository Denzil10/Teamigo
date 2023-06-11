const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    googleId: { type: String, required: true },
    invites: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Invites' }],
    requests: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Requests' }]

    //lastName: { type: String, required: true },
    //revenue: { type: Number, required: true },
    //email: { type: String, required: true, unique: true },
    //password: { type: String, required: true, minlength: 6 },
    //image: { type: String, required: true },
    //places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]

})
const User = mongoose.model('User', userSchema)

const eventSchema = new Schema({
    eventName: { type: String, required: true },
    organizer: { type: String, required: true },
    description: { type: String, required: true },
    minTeamSize: { type: Number, required: true },
    timeStamp: { type: Date, required: true },
    maxTeamSize: { type: Number, required: true },
    teamIDs: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Team' }]

})
const Event = mongoose.model('Events', eventSchema);

exports.User = User
exports.Event = Event 

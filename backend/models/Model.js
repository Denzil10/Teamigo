const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    googleId: { type: String, required: true },
    name: { type: String, required: true },
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

const teamsSchema = new Schema({
    leaderId: { type: mongoose.Types.ObjectId, required: true },
    leaderName: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: String, required: true }]

})
const Team = mongoose.model('Team', teamsSchema);


const inviteSchema = new Schema({
    sendingTeamId: { type: mongoose.Types.ObjectId, required: true },
    description: { type: String, required: true },
    eventId: { type: mongoose.Types.ObjectId, required: true },
})
const Invite = mongoose.model('Invite', inviteSchema);



const participantSchema = new Schema({
    eventId: { type: mongoose.Types.ObjectId, required: true },
    participantId: { type: mongoose.Types.ObjectId, required: true },
    description: { type: String, required: true }
})
const Participant = mongoose.model('Participant', participantSchema);


const requestSchema = new Schema({
    sendingParticipantId: { type: mongoose.Types.ObjectId, required: true },
    eventId: { type: mongoose.Types.ObjectId, required: true },
    teamId: { type: mongoose.Types.ObjectId, required: true },
    description: { type: String, required: true }
})
const Request = mongoose.model('Request', requestSchema)

class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }
}

exports.User = User
exports.Event = Event
exports.Team = Team
exports.Invite = Invite
exports.Participant = Participant
exports.Request = Request
exports.HttpError = HttpError
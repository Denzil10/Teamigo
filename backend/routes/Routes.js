const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
const eventController = require("../controllers/eventController")
const inviteController = require("../controllers/inviteController")
const teamController = require("../controllers/teamController")
const participantController = require("../controllers/participantController")

//user Routes
router.post("/users/addUser", userController.addUser);
router.get("/users/getAllUsers", userController.getAllUsers);

//Event Routes
router.post("/events/addEvent", eventController.addEvent);
router.get("/events/getEvents", eventController.getEvents);


//Team Routes
router.post("/teams/addTeam", teamController.addTeam); //outdated
router.post("/teams/getTeamsByEventId", teamController.getTeamsByEventId);
router.post("/teams/getTeamsByTeamLeaderId", teamController.getTeamsByTeamLeaderId); //not tested


//Invites Routes
router.post("/invites/sendInvite", inviteController.sendInvite);
router.post("/invites/getInvites", inviteController.getInvites); //to be changed

//Participant and Team
router.post("/participant/addParticipantAndTeam", participantController.addParticipantAndTeam);
router.post("/participant/getParticipantsByEventId", participantController.getParticipantsByEventId);

module.exports = router;

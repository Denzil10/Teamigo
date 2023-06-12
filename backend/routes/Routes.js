const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
const eventController = require("../controllers/eventController")
const inviteController = require("../controllers/inviteController")
const teamController = require("../controllers/teamController")

//user Routes
router.post("/users/addUser", userController.addUser);
router.get("/users/getAllUsers", userController.getAllUsers);

//Event Routes
router.post("/events/addEvent", eventController.addEvent);
router.get("/events/getEvents", eventController.getEvents);


//Team Routes
router.post("/teams/addTeam", teamController.addTeam);
router.get("/teams/getTeamsByEventId", teamController.getTeamsByEventId);

//Invites Routes
router.post("/invites/addInvite", inviteController.sendInvite); //to be changed
router.get("/invites/getInvites", inviteController.getInvites); //to be changed

module.exports = router;

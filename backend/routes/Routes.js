const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
const eventController = require("../controllers/eventController")


//user Routes
router.post("/users/addUser", userController.addUser);

//Event Routes
router.post("/events/addEvent", eventController.addEvent);
router.get("/events/getEvents", eventController.getEvents);


module.exports = router;

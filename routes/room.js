const express = require('express');
const router = express.Router();
const Room = require('../controllers/room');
const verifyToken = require('../controllers/verify-user')


// Create
router.post('/', verifyToken, Room.createNewRoom);
// get all
router.get('/all', verifyToken, Room.getAllRooms);
// get all free
router.get('/free', verifyToken, Room.getAllFreeRooms);

module.exports = router;
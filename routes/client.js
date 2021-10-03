const express = require('express');
const router = express.Router();
const Client = require('../controllers/client');
const verifyToken = require('../controllers/verify-user')


// Create client
router.post('/', verifyToken, Client.createNewClientBooking);
// get all clients
router.get('/all', verifyToken, Client.getClients);
// get a client
router.get('/:clientId', verifyToken, Client.getAClient);
// update
router.put('/', verifyToken, Client.updateClient);
// delete
router.delete('/:clientId', verifyToken, Client.removeClient);

module.exports = router;
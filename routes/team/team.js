const express = require('express');
const router = express.Router();
const Team = require('../../controllers/team/team');

// Create team
router.post('/', Team.create)
// Get all team for a user
router.get('/creator/:creatorId', Team.getTeams)
// Get specific team for a user
router.get('/:teamId', Team.getTeam)
// Update team
router.put('/', Team.update)
// Delete team
router.delete('/:teamId', Team.remove)

module.exports = router;
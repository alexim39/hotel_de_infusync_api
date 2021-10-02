const express = require('express');
const router = express.Router();
const Task = require('./../../controllers/task/task');

// Create task
router.post('/', Task.create)
// Get all task for a user
router.get('/creator/:creatorId', Task.getTasks)
// Get specific task for a user
router.get('/:taskId', Task.getTask)
// Update task
router.put('/', Task.update)
// Delete task
router.delete('/:taskId', Task.remove)

module.exports = router;
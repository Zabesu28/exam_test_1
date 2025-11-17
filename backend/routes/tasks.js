const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

/**
 * @module routes/tasks
 */

/**
 * Get all tasks of the authenticated user
 * @name getTasks
 * @function
 * @memberof module:routes/tasks
 * @param {Object} req - Express request object
 * @param {Object} req.user - Authenticated user from auth middleware
 * @param {Object} res - Express response object
 * @returns {Array<Object>} 200 - Array of task objects
 * @returns {Object} 500 - Server error message
 */
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

/**
 * Add a new task
 * @name addTask
 * @function
 * @memberof module:routes/tasks
 * @param {Object} req - Express request object
 * @param {string} req.body.title - Title of the task
 * @param {string} [req.body.description] - Optional description
 * @param {Object} req.user - Authenticated user
 * @param {Object} res - Express response object
 * @returns {Object} 200 - Created task object
 * @returns {Object} 500 - Server error message
 */
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      user: req.user.id,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

/**
 * Update a task (only if owned by user)
 * @name updateTask
 * @function
 * @memberof module:routes/tasks
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Task ID
 * @param {string} [req.body.title] - Updated title
 * @param {string} [req.body.description] - Updated description
 * @param {boolean} [req.body.isCompleted] - Completion status
 * @param {Object} req.user - Authenticated user
 * @param {Object} res - Express response object
 * @returns {Object} 200 - Updated task object
 * @returns {Object} 401 - Not authorized
 * @returns {Object} 404 - Task not found
 * @returns {Object} 500 - Server error message
 */
router.put('/:id', auth, async (req, res) => {
  const { title, description, isCompleted } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, isCompleted } },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

/**
 * Delete a task (only if owned by user)
 * @name deleteTask
 * @function
 * @memberof module:routes/tasks
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Task ID
 * @param {Object} req.user - Authenticated user
 * @param {Object} res - Express response object
 * @returns {Object} 200 - Task removed message
 * @returns {Object} 401 - Not authorized
 * @returns {Object} 404 - Task not found
 * @returns {Object} 500 - Server error message
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;

const mongoose = require('mongoose');

/**
 * @typedef {Object} Task
 * @property {mongoose.Schema.Types.ObjectId} user - Owner of the task
 * @property {string} title - Title of the task
 * @property {string} [description] - Optional description
 * @property {boolean} [isCompleted=false] - Task completion status
 * @property {Date} [createdAt=Date.now] - Creation date
 */
const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', TaskSchema);

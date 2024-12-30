const Task = require('../models/Task');



// This function is used to get all tasks or just one, depending on the function that called it
const taskFinder = ({ id, completed }) => {
    // If status or id exists, its used in the query, if doesn´t, get all the tasks
    return Task.find(completed ? { completed } : id ? { _id: id } : {})
};

module.exports = taskFinder
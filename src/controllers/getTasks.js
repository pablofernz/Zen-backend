const Task = require('../models/Task');


const statusOptions = {
    completed: true,
    pending: false
}

// This function is used to get all tasks or just one, depending on the function that called it
const taskFinder = ({ id, status }) => {
    // If status or id exists, its used in the query, if doesn´t, get all the tasks
    return Task.find(status ? { completed: statusOptions[status] } : id ? { _id: id } : {})
};

module.exports = taskFinder
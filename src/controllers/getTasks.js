const Task = require('../models/Task');


const statusOptions = {
    completed: true,
    pending: false
}

const taskFinder = (status) => {
    return Task.find(status ? { completed: statusOptions[status] } : {})
};

module.exports = taskFinder
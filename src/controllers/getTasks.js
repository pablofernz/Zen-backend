const Task = require('../models/Task');


const statusOptions = {
    completed: true,
    pending: false
}

const taskFinder = (status) => {
    return Task.find(status ? { status: statusOptions[status] } : {})
};

module.exports = taskFinder
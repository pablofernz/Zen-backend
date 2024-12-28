const Task = require('../models/Task');


const statusOptions = {
    completed: true,
    pending: false
}

const taskFinder = ({ id, status }) => {
    return Task.find(status ? { completed: statusOptions[status] } : id ? { _id: id } : {})
};

module.exports = taskFinder
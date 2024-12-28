const taskSchema = require("../models/Task")

const taskAdder = ({ title, description, status, createdAt }, res) => {
    const newTask = taskSchema({ title, description, status, createdAt, })
    return newTask.save()
        .then(() => {
            return { success: true, message: "Task added successfully" };
        })
        .catch((error) => {
            return { success: false, message: error.message || "Error adding task" };
        });

}

module.exports = taskAdder
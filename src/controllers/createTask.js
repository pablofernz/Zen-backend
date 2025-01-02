const taskSchema = require("../models/Task")


const taskAdder = ({ title, description, completed, createdAt }, res) => {
    const newTask = taskSchema({ title, description, completed, createdAt })
    return newTask.save()
        .then(() => {
            return { success: true, message: "Task created successfully", data: newTask };
        })
        .catch((error) => {
            return { success: false, errors: [error.message || "Error adding task"] };
        });

}

module.exports = taskAdder
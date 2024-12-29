const Task = require('../models/Task');

const taskUpdater = async ({ id, newTask }) => {
    try {
        // Look for an element that has an ID equal to the ID passed by parameters
        const existingTask = await Task.findOne({ _id: id })

        // If the task is not found, it returns a message
        if (!existingTask) return { success: false, message: "Task not found" };

        // If the task is found, it is compared to the current task data, if nothing change return a message
        if (newTask.title === existingTask.title &&
            newTask.description === existingTask.description &&
            newTask.status === existingTask.status) return { success: false, message: "There are no changes" };

        // If there are changes, it is updated and a message is returned
        await Task.updateOne({ _id: id }, newTask);
        return {
            success: true,
            message: "Task updated successfully"
        };

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return { success: false, message: "An error occurred while updating this task", error: error.message };
    }
};

module.exports = taskUpdater
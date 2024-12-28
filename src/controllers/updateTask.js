const Task = require('../models/Task');

const taskUpdater = async ({ id, newTask }) => {
    try {
        const existingTask = await Task.findOne({ _id: id })

        if (!existingTask) return { success: false, message: "Task not found" };

        if (newTask.title === existingTask.title &&
            newTask.description === existingTask.description &&
            newTask.status === existingTask.status) return { success: false, message: "There are no changes" };

        await Task.updateOne({ _id: id }, newTask);

        return {
            success: true,
            message: "Task updated successfully"
        };

    } catch (error) {
        return { success: false, message: "An error occurred while updating this task", error: error.message };
    }
};

module.exports = taskUpdater
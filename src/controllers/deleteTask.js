const Task = require('../models/Task');


const taskDeleter = async (id) => {
    try {
        // Look for an element that has an ID equal to the ID passed by parameters
        const deletedTask = await Task.findOneAndDelete({ _id: id });

        // If the task is found, it is deleted and return a status code of 200, a message, and the deleted task data

        if (deletedTask) {
            return {
                success: true,
                message: "Task deleted successfully",
                data: deletedTask
            };
        } else {
            // If the task is not found, it returns a message
            return { success: false, message: "Task not found" };
        }

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return { success: false, message: "An error occurred while deleting the task", error: error.message };
    }
};

module.exports = taskDeleter
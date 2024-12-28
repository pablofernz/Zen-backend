const Task = require('../models/Task');


const taskDeleter = async (id) => {
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id });

        if (deletedTask) {
            return {
                success: true,
                message: "Task deleted successfully",
                data: deletedTask
            };
        } else {
            return { success: false, message: "Task not found" };
        }

    } catch (error) {
        return { success: false, message: "An error occurred while deleting the task", error: error.message };
    }
};

module.exports = taskDeleter
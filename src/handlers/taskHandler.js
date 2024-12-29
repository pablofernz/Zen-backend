const taskAdder = require("../controllers/createTask");
const taskDeleter = require("../controllers/deleteTask");
const taskFinder = require('../controllers/getTasks');
const taskUpdater = require("../controllers/updateTask");

// Function that create a new task based on the data provided in the body
const createTask = async (req, res) => {
    const { title, description, completed } = req.body

    try {
        // The 'taskAdder' function is called passing the data of req.body as an arguments to create a task
        const result = await taskAdder({ title, description, completed })

        // If something gone wrong, it return a 500 status code and a message
        if (!result.success) return res.status(500).json(result)

        // If everything its ok, it return a 200 status code, a message and the new task
        return res.status(200).json(result)

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, message: error.message })
    }

}

// Function that get all of the tasks or based on the 'status' provided in the query
const getTasks = async (req, res) => {
    const { status } = req.query

    try {
        // The 'taskFinder' function is called passing the 'status' as an argument to get tasks that match
        const result = await taskFinder({ status })


        // If no tasks are found, respond with a 404 status code and a message
        if (!result || !result.length) return res.status(404).json({ success: true, message: "Tasks not found" })

        // If tasks are found, respond with a 200 status code, a message and the found tasks data
        return res.status(200).json({
            success: true,
            message: "Tasks found",
            data: result
        });

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, message: error.message || "An error occurred while fetching tasks" })
    }
}

// Function that get only one of the tasks based on the ID provided in the query
const getOneTask = async (req, res) => {
    const { id } = req.params

    try {
        // The 'taskFinder' function is called, passing the ID as an argument to get tasks that match
        const result = await taskFinder({ id })

        // If no tasks are found, respond with a 404 status code and a message
        if (!result || !result.length) return res.status(404).json({ success: true, message: "Task not found" })

        // If tasks are found, respond with a 200 status code, a message and the found tasks data
        return res.status(200).json({
            success: true,
            message: "Task found",
            data: result
        });

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, message: error.message || "An error occurred while fetching this task" })
    }
}

// Function that update a existing tasks based on the ID provided in the query
const updateTask = async (req, res) => {
    const { id } = req.params
    const { title, description, completed } = req.body

    try {
        // The 'taskUpdater' function is called, passing the ID and the new data as arguments to update the existing task
        const result = await taskUpdater({ id, newTask: { title, description, completed } })

        if (!result.success) return res.status(400).json(result)

        return res.status(200).json(result)
    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, message: error.message || "An error occurred while updating this task" })
    }
}

// Function that delete a existing tasks based on the ID provided in the query
const deleteTask = async (req, res) => {
    const { id } = req.params

    try {
        // The 'taskDeleter' function is called, passing the ID as an argument to delete the task

        const result = await taskDeleter(id)
        if (!result.success) return res.status(400).json(result)

        return res.status(200).json(result)

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, message: error.message || "An error occurred while deleting this task" })
    }
}

module.exports = {
    createTask,
    getTasks,
    getOneTask,
    updateTask,
    deleteTask
}
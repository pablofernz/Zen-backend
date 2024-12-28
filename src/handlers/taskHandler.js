const taskAdder = require("../controllers/createTask");
const taskDeleter = require("../controllers/deleteTask");
const taskFinder = require('../controllers/getTasks');
const taskUpdater = require("../controllers/updateTask");
const Task = require("../models/Task");
const mongoose = require("mongoose")

const createTask = async (req, res) => {
    const { title, description, completed } = req.body

    // This function returns the current date in DD-MM-YYYY HH:MM to be used in "createdAt" property
    const getDay = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
        return formattedDateTime
    }

    try {
        if (!title) return res.status(400).json({ error: "Must provide a task title" })
        const result = await taskAdder({ title, description, completed, createdAt: getDay() })

        if (!result.success) return res.status(500).json(result)

        return res.status(200).json(result)

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }

}

const getTasks = async (req, res) => {
    const { status } = req.query

    try {
        const result = await taskFinder(status)

        if (!result || !result.length) return res.status(404).json({ success: true, message: "Tasks not found" })

        return res.status(200).json({
            success: true,
            message: "Tasks found",
            data: result
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message || "An error occurred while fetching tasks" })
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params
    const { title, description, completed } = req.body

    if (!id) return res.status(400).json({ success: false, message: "Must provide the ID of the task to be deleted" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    try {
        const result = await taskUpdater({ id, newTask: { title, description, completed } })
        if (!result.success) return res.status(400).json(result)

        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message || "An error occurred while updating this task" })
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ success: false, message: "Must provide the ID of the task to be deleted" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    try {
        const result = await taskDeleter(id)
        if (!result.success) return res.status(400).json(result)

        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message || "An error occurred while deleting this task" })
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}
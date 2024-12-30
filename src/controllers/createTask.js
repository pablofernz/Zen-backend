const taskSchema = require("../models/Task")

// This function returns the current date in DD-MM-YYYY HH:MM to be used in "createdAt" property
const getDay = () => {
    const today = new Date();
    today.setHours(today.getHours() - 3); // Vercel uses a server located in USA EAST. Therefore, the time will be 3 hours ahead, so I subtract 3 hours to match the time at which the task was created (Argentina Time)

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');

    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDateTime;
}

const taskAdder = ({ title, description, completed }, res) => {
    const newTask = taskSchema({ title, description, completed, createdAt: getDay() })
    return newTask.save()
        .then(() => {
            return { success: true, message: "Task created successfully", data: newTask };
        })
        .catch((error) => {
            return { success: false, errors: [error.message || "Error adding task"] };
        });

}

module.exports = taskAdder
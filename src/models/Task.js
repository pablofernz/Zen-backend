const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: String,
    required: true
  }
}, {
  versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

module.exports = mongoose.model("Task", taskSchema)
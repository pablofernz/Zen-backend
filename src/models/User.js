const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const taskSchema = require("./Task").schema

const authSchema = mongoose.Schema({
  authMethod: {
    type: String,
    default: "default"
  },
  uid: {
    type: String
  }
})

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  joinedAt: {
    type: String,
    required: true
  },
  auth: authSchema,
  tasks: [taskSchema]
}, {
  versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

userSchema.pre('save', async function (next) {
  try {

    if (!this.password || this.password === '') {
      return next(); // Si está vacía, no hacer nada y continuar
    }
    // Verificar si la contraseña ya está hasheada
    if (!this.isModified('password')) {
      return next();
    }

    // Generar un salt (valor aleatorio) para hashear la contraseña
    const salt = await bcrypt.genSalt(10);

    // Hashear la contraseña y reemplazarla en el campo 'password'
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("User", userSchema)


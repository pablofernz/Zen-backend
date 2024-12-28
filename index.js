const server = require('./src/app.js');
const mongoose = require("mongoose")
require("dotenv").config()

server.listen(3001, () => {
  console.log('listening at 3001');
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión con MongoDB Atlas exitosa"))
  .catch((error) => console.log(error))
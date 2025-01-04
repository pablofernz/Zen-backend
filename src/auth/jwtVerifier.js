const jwt = require("jsonwebtoken")
require("dotenv").config()

const secret = process.env.SECRET

const verifyToken = ({ authorization }) => {
    let token = null



    if (!authorization) return { success: false, status: 401, message: "No credentials" }
    if (!authorization.toLowerCase().startsWith('bearer')) return { success: false, status: 401, message: "invalid credentials" }
    token = authorization.split(" ")[1]

    const decodedToken = jwt.verify(token, secret)

    if (!decodedToken) return { success: false, status: 404, message: "Lost or invalid Token" }

    if (Date.now() > decodedToken.exp) return { success: false, status: 401, message: "Expird token" }

    return { success: true, status: 200, message: "Token valid", data: decodedToken }


}

module.exports = verifyToken
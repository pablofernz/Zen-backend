const User = require("../../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const bcrypt = require("bcrypt")

const secret = process.env.SECRET


const userLoginDefault = async ({ receivedEmail, receivedPassword }) => {

    try {
        const existingClient = await User.findOne({ email: receivedEmail })
        if (!existingClient) return { success: false, status: 404, message: "This account don't exists" };

        const passwordsMatch = await bcrypt.compare(receivedPassword, existingClient.password)
        if (!passwordsMatch) return { success: false, status: 401, message: "Password incorrect" };

        const tokenData = {
            id: existingClient._id,
            email: existingClient.email
        }

        const token = jwt.sign(
            {
                tokenData,
                exp: Date.now() + 60 * 1000 * 60 * 24 * 7
            }, secret
        )


        return { success: true, status: 200, message: "Login successfully", token: token, data: { email: existingClient.email } };

    } catch (error) {
        return { success: false, status: 400, message: error.message || "Error log in" };
    }


}


module.exports = userLoginDefault 
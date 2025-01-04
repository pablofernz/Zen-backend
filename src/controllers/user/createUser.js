const userSchema = require("../../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const secret = process.env.SECRET


const userCreator = ({ email, password, joinedAt }) => {
    const newUser = userSchema({ email, password, joinedAt })
    return newUser.save()
        .then(() => {
            const tokenData = {
                id: newUser._id,
            }

            const token = jwt.sign(
                {
                    tokenData,
                    exp: Date.now() + 60 * 1000 * 60 * 24 * 7
                }, secret
            )
            return { success: true, status: 200, message: "User created successfully", token: token };
        })
        .catch((error) => {
            return { success: false, status: 400, message: error.message || "Error creating the user" };
        });

}

module.exports = userCreator
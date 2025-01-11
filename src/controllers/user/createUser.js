const userSchema = require("../../models/User")
const User = require("../../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const secret = process.env.SECRET


const userCreator = async ({ email, password, joinedAt, auth }) => {
    const existingUser = await User.findOne({ email: email })

    if (existingUser) return { success: false, status: 400, message: "This email is already used", data: existingUser };

    const newUser = userSchema({ email, password, joinedAt, auth })
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
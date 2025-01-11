const User = require("../../models/User")
const userSchema = require("../../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const secret = process.env.SECRET

const authAccess = async ({ email, password, joinedAt, auth }) => {

    try {
        const existingClient = await User.findOne({ "auth.uid": auth.uid })

        if (!existingClient) {
            const newUser = userSchema({ email, password, joinedAt, auth })
            return newUser.save()
                .then(() => {
                    const tokenData = {
                        uid: newUser.auth.uid,
                        email: newUser.email,
                        id: newUser._id
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
        } else {
            const tokenData = {
                uid: existingClient.auth.uid,
                email: existingClient.email,
                id: existingClient._id
            }

            const token = jwt.sign(
                {
                    tokenData,
                    exp: Date.now() + 60 * 1000 * 60 * 24 * 7
                }, secret
            )


            return { success: true, status: 200, message: "Login successfully", token: token };
        }

    } catch (error) {
        return { success: false, status: 400, message: error.message || "Error log in" };
    }


}

module.exports = authAccess
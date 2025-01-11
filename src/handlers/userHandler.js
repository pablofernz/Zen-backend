const userCreator = require("../controllers/user/createUser");
const userLoginDefault = require("../controllers/user/loginUser");
const authAccess = require("../controllers/user/thirdPartyAccess");


// Function that create a new user 
const createUser = async (req, res) => {
    const { email, password, joinedAt } = req.body

    try {
        // The 'userCreator' function is called passing the data of req.body as an arguments to create a user
        const result = await userCreator({ email, password, joinedAt })

        // If something gone wrong, it return a 500 status code and a message

        // If everything its ok, it return a 200 status code, a message and the new user
        return res.status(200).json(result)

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // The 'userCreator' function is called passing the data of req.body as an arguments to search an user and comparate passing password is equal to account password
        const result = await userLoginDefault({ receivedEmail: email, receivedPassword: password })


        // If everything its ok, it return a 200 status code, a message and the new user
        return res.status(200).json(result)

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, message: error.message })
    }
}


const thirdPartyAccess = async (req, res) => {
    const { email, password, joinedAt, auth } = req.body

    try {
        const result = await authAccess({ email, password, joinedAt, auth })
        return res.status(result.status).json(result)

    } catch (error) {
        return { success: false, status: 400, message: error.message || "Error log in" };
    }
}


module.exports = {
    createUser,
    loginUser,
    thirdPartyAccess
}
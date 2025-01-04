const userCreator = require("../controllers/user/createUser");
const userLogin = require("../controllers/user/loginUser");


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
        const result = await userLogin({ receivedEmail: email, receivedPassword: password })


        // If everything its ok, it return a 200 status code, a message and the new user
        return res.status(200).json(result)

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, message: error.message })
    }
}


module.exports = {
    createUser,
    loginUser
}
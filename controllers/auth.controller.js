const bcrypt = require("bcrypt");
const { signupSchema, loginSchema } = require("../validators/user.validator");
const User = require("../models/user.model");
require('dotenv').config();
const jwt = require("jsonwebtoken")


const signUpController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { error } = signupSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message).join(', '),
            });
        }

        const hashedpassword = await bcrypt.hash(password, 4)

        const newUser = new User({
            name,
            email,
            password: hashedpassword
        })

        await newUser.save()
        return res.status(200).json({ msg: "User Registered succesfully", newUser })
    } catch (error) {
        return res.status(500).json({ error: new Error(error).message })
    }
}


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message).join(', '),
            });
        }

        const isUser = await User.findOne({ email })
        if (!isUser) {
            return res.status(400).json({ error: `No user found with the given email id ${email}` })
        }

        const pass = await bcrypt.compare(password, isUser.password)

        if (!pass) {
            return res.status(400).json({ error: "Invalid Credentials" })
        }

        const token = await jwt.sign({ email: isUser.email, userId: isUser.id }, process.env.JWT_SECRET_KEY)

        isUser.currentToken = token;
        await isUser.save();

        return res.status(200).json({ msg: "User login succesfull", token })
    } catch (error) {
        return res.status(500).json({ error: new Error(error).message })
    }
}



module.exports = { signUpController, loginController }

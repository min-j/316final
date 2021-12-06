const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                userName: loggedInUser.userName,
                email: loggedInUser.email
            }
        }).send();
    })
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !userName || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        const existingUserName = await User.findOne({ userName: userName });
        if (existingUserName) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "That username is taken."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, userName, email, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                userName: savedUser.userName,
                email: savedUser.email
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

loginUser = async (req,res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingUser = await User.findOne({ userName: userName });
        if (!existingUser) {
            return res
                .status(400)
                .json({ errorMessage: "An account with this username does not exist." });
        }
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            return res
                .status(400)
                .json({ errorMessage: "Invalid password. Try again." });
        }
        const token = auth.signToken(existingUser);
        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                userName: existingUser.userName,
                email: existingUser.email
            }
        }).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send()
    }
}

logoutUser = async (req, res) => {
    // await res.cookie("token", '', {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none", 
    //     maxAge: 1 
    // }).status(204).send();
    await res.clearCookie("token").status(204).send();
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}
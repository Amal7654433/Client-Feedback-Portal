import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../libs/util.js';
import User from '../models/user.model.js'
export const userSignup = asyncHandler(async (req, res) => {
console.log(req.body)
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });
    if (newUser) {
        generateToken(newUser._id, res)
        await newUser.save();
        res.status(201).json({ message: "User created successfully", newUser });
        console.log(newUser)
    }
    else {
        res.status(400).json({ message: 'invalid user' })
    }

})
export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Incorrect password or email" });
    }
    generateToken(user._id, res)
    res.status(200).json({ message: "User logged in successfully",user });


})

export const userLogout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })
    return res.status(200).json({ message: "User logged out successfully" });
})
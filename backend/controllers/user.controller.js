import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { name, email, password, role, phone, address, age } = req.body;
        if (!name || !email || !password || !role || !phone || !address || !age) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashpassword,
            role,
            phone,
            address,
            age
        });
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email",
                success: false
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password",
                success: false
            });
        }
        if (user.role !== role) {
            return res.status(400).json({
                message: "Invalid role",
                success: false
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            age: user.age
        }
        return res.status(200).cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            secure: false,
            httpOnly: true,
        }).json({
            message: `Welcome back ${user.name}`,
            success: true,
            user: userData,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logged out successfully",
            success: true
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, email, phone, address, age } = req.body;
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (age) user.age = age;

        await user.save();
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            age: user.age
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            userData
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}
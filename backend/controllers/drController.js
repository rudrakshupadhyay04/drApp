import bcrypt from "bcryptjs";
import { Doctor } from "../models/drModel.js";

export const registerDoctor = async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;

    if (
      !name ||
      !phoneNumber ||
      !email ||
      !password ||
      name == " " ||
      password == " " ||
      email == " " ||
      password == " "
    ) {
      return res.status(400).json({
        message: "All field are required!!",
        success: false,
      });
    }

    const isExists = await Doctor.findOne({ email });

    if (isExists) {
      return res.status(409).json({
        message: "User is already present with this email!!",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Doctor({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({
      message: "SignUp is successfull!!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Erorr!!!",
      success: false,
    });
  }
};

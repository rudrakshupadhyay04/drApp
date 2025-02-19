import bcrypt from "bcryptjs";
import { Doctor } from "../models/drModel.js";
import { User } from "../models/user.model.js";

// export const registerDoctor = async (req, res) => {
//   try {
//     const { name, phoneNumber, email, password } = req.body;

//     if (
//       !name ||
//       !phoneNumber ||
//       !email ||
//       !password ||
//       name == " " ||
//       password == " " ||
//       email == " " ||
//       password == " "
//     ) {
//       return res.status(400).json({
//         message: "All field are required!!",
//         success: false,
//       });
//     }

//     const isExists = await Doctor.findOne({ email });

//     if (isExists) {
//       return res.status(409).json({
//         message: "User is already present with this email!!",
//         success: false,
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new Doctor({
//       name,
//       phoneNumber,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     return res.status(201).json({
//       message: "SignUp is successfull!!",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal Server Erorr!!!",
//       success: false,
//     });
//   }
// };

export const registerDoctor = async (req, res) => {
    try {
        const { userId, degree, specialization, experience, feesPerConsultation, clinicAddress, availableSlots } = req.body;
        if (!userId || !degree || !specialization || !experience || !feesPerConsultation || !clinicAddress || !phone || !availableSlots) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user=await User.findById(userId);
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const doctorExists = await Doctor.findOne({ userId });
        if (doctorExists) {
            return res.status(400).json({ message: "Doctor already exists" });
        }
        const doctor = await Doctor.create({
            userId,
            degree,
            specialization,
            experience,
            feesPerConsultation,
            clinicAddress,
            phone,
            availableSlots,
            status:"pending"
        });
        await doctor.save();
        return res.status(201).json({
            message: "Doctor registeration request submitted wait for admin approval.",
            success: true,
            doctor
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}
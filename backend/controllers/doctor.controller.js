import Appointment from "../models/appointment.model.js";
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
        if (!userId || !degree || !specialization || !experience || !feesPerConsultation || !clinicAddress || !availableSlots) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
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
            availableSlots,
            status: "pending"
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

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: "approved" });
        return res.status(200).json({
            message: "All doctors",
            success: true,
            doctors
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Doctor",
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

export const updateDoctorProfile = async (req, res) => {
    try {
        const { name, age, email, phone, degree, specialization, experience, feesPerConsultation, clinicAddress, availableSlots } = req.body;
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
                success: false
            });
        }
        const user = await User.findById(doctor.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        //update doctor profile 

        if (degree) doctor.degree = degree;
        if (specialization) doctor.specialization = specialization;
        if (experience) doctor.experience = experience;
        if (feesPerConsultation) doctor.feesPerConsultation = feesPerConsultation;
        if (clinicAddress) doctor.clinicAddress = clinicAddress;
        if (phone) doctor.phone = phone;
        if (availableSlots) doctor.availableSlots = availableSlots;

        //update user profile

        if (name) user.name = name;
        if (age) user.age = age;
        if (email) user.email = email;
        if (phone) user.phone = phone;

        await doctor.save();
        await user.save();

        return res.status(200).json({
            message: "Doctor profile updated successfully",
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

export const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
                success: false
            });
        }
        const user = await User.findById(doctor.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        await doctor.remove();
        await user.remove();
        return res.status(200).json({
            message: "Doctor deleted successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}


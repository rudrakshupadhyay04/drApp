import Appointment from "../models/appointment.model";
import { Doctor } from "../models/drModel";
import { User } from "../models/user.model";

export const bookappointment = async (req, res) => {
    try {
        const { patientId, date, timeSlot, doctorId, symptoms } = req.body;
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
                success: false
            });
        }
        const user = await User.findById(patientId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        const existingAppointment = await Appointment.findOne({
            doctorId,
            date,
            timeSlot,
            status: { $ne: "Cancelled" }
        });
        if (existingAppointment) {
            return res.status(400).json({
                message: "Slot not available",
                success: false
            });
        }
        const appointment = new Appointment({
            patientId,
            doctorId,
            date,
            timeSlot,
            symptoms,
            status: "Pending"
        });
        await appointment.save();
        return res.status(200).json({
            message: "Appointment booked successfully",
            success: true,
            appointment
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const confirmAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
                success: false
            });
        }
        appointment.status = "confirmed";
        await appointment.save();
        return res.status(200).json({
            message: "Appointment confirmed successfully",
            success: true,
            appointment
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const getDoctorAppointments = async (req, res) => {
    try {
        const patientId = req.params.id;
        const appointments = await Appointment.find({ doctorId }).populate("patientId");
        return res.status(200).json({
            message: "Doctor appointments",
            success: true,
            appointments
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const getUserAppointments = async (req, res) => {
    try {
        const patientId = req.params.id;
        const appointments = await Appointment
            .find({ patientId })
            .populate("doctorId");
        return res.status(200).json({
            message: "User appointments",
            success: true,
            appointments
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const updateAppointment = async (req, res) => {
    try {
        const { status, prescription } = req.body;
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
                success: false
            });
        }
        if (status) appointment.status = status;
        if (prescription) appointment.prescription = prescription;
        await appointment.save();
        return res.status(200).json({
            message: "Appointment updated successfully",
            success: true,
            appointment
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
                success: false
            });
        }
        appointment.status = "Cancelled";
        await appointment.save();
        return res.status(200).json({
            message: "Appointment cancelled successfully",
            success: true,
            appointment
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const addPrescription = async (req, res) => {
    try {
        const { prescription } = req.body;
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
                success: false
            });
        }
        appointment.prescription = prescription;
        await appointment.save();
        return res.status(200).json({
            message: "Prescription added successfully",
            success: true,
            appointment
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

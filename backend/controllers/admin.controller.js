import { Doctor } from "../models/drModel";

export const approveDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
                success: false
            });
        }
        doctor.status = "approved";
        await doctor.save();
        return res.status(200).json({
            message: "Doctor approved successfully",
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

export const rejectDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
                success: false
            });
        }
        doctor.status = "rejected";
        await doctor.save();
        return res.status(200).json({
            message: "Doctor rejected successfully",
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



import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", 
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String, 
      required: true,
    },
    symptoms: {
      type: String,
      required: false, 
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed","Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    prescription: {
      type: String, 
      default: "",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;

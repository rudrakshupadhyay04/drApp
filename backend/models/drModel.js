import mongoose from "mongoose";

// const drSchema = new mongoose.Schema(
//   // {
//   //   name: { type: String, required: true },
//   //   phoneNumber: { type: Number, required: true, unique: true },
//   //   email: { type: String, required: true, unique: true },
//   //   timeSlot: [{ type: String }],
//   //   password: { type: String, required: true },
//   //   profilePic: {
//   //     type: String,
//   //     default:
//   //       "https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg",
//   //   },
//   //   specification: [{ type: String }],
//   //   degree: [{ type: String, required: true }],
//   //   charges: { type: String },
//   //   isAdmin: { type: Boolean, default: false },
//   // },
//   // { timestamps: true }

// );


const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    degree:{
      type:String,
      required:true
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    feesPerConsultation: {
      type: Number,
      required: true,
    },
    clinicAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"], // For admin approval
      default: "pending",
    },
    availableSlots: [
      {
        day: String, // Example: "Monday"
        time: String, // Example: "10:00 AM - 2:00 PM"
      },
    ],
    appointments: [
      {
        patientId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        date: Date,
        time: String,
        status: {
          type: String,
          enum: ["pending", "confirmed", "cancelled"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);


export const Doctor = mongoose.model("Doctor", doctorSchema);

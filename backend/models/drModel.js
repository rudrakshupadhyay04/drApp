import mongoose from "mongoose";

const drSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    timeSlot: [{ type: String }],
    password: { type: String, required: true },
    profilePic: {
      type: String,
      default:
        "https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg",
    },
    specification: [{ type: String }],
    degree: [{ type: String, required: true }],
    charges: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", drSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor", "admin"], required: true },
  phone: { type: String ,required: true },
  address: { type: String, required: true },
  age:{type:Number,required:true},
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
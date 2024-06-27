import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const studentSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    currentCollege: {
      type: String,
      required: true,
      trim: true
    },
    degreeName: {
      type: String,
      required: true,
      trim: true
    },
    expectedYearOfGraduation: {
      type: Number,
      required: true,
    },
    profilePicture: { // Cloudinary URL
      type: String,
    },
   
    courseEnrolled: {
      type: String,
      required: true,
      trim: true
    },
  
  }, 
  { timestamps: true }
);

export const Student = model("Student", studentSchema);

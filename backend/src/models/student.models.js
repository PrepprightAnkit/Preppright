import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
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
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ["College Student", "Corporate Employee", "Other"]
    },
    institution: {
      type: String,
      required: true,
      trim: true
    },
    yearOrRole: {
      type: String,
      required: true,
      trim: true
    },
    fieldOrDepartment: {
      type: String,
      trim: true
    },
    preferredLearningMode: {
      type: String,
      required: true,
      enum: ["Live Classes", "Recorded Sessions", "Both"]
    },
    courseCategories: {
      type: [String],
      required: true,
      enum: ["Science and Technology", "Business and Management", "Arts and Humanities", "Social Sciences", "Health and Medicine", "Languages", "Personal Development"]
    },
    profilePicture: {
      type: String
    },
    preferredContactMethod: {
      type: String,
      required: true,
      enum: ["Email", "Phone", "Both"]
    }
  },
  { timestamps: true }
);

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT
userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.ACCESS_TOKEN_SECRECT, { expiresIn: '1h' });
};

export const User = model("User", userSchema);

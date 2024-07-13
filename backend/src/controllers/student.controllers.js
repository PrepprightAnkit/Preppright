import { User } from "../models/student.models.js";

import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asynchandler(async (req, res) => {
    const {
        fullName,
        email,
        phoneNumber,
        password,
        role,
        institution,
        yearOrRole,
        fieldOrDepartment,
        preferredLearningMode,
        courseCategories,
        preferredContactMethod
    } = req.body;

    if (
        [fullName, email, password, role, institution, yearOrRole, preferredLearningMode, preferredContactMethod]
        .some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All required fields must be filled out");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const avatarLocalPath = req.files?.profilePicture?.[0]?.path;

    let profilePicture;
    if (avatarLocalPath) {
        profilePicture = await uploadOnCloudinary(avatarLocalPath);
    }

    const user = await User.create({
        fullName,
        email,
        phoneNumber,
        password,
        role,
        institution,
        yearOrRole,
        fieldOrDepartment,
        preferredLearningMode,
        courseCategories,
        profilePicture: profilePicture?.url || "",
        preferredContactMethod
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

export {
    registerUser,
};

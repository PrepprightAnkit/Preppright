import { Course } from '../models/courses.model.js';
import { Category } from '../models/categories.model.js';
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const uploadCourse = asynchandler(async (req, res) => {
  const { name, price, description, detailedDescription, numberOfLessons, level, category } = req.body;

  // Ensure all required string fields are filled out
  const requiredFields = [name, description, detailedDescription, level, category];
  if (requiredFields.some((field) => typeof field === 'string' && field.trim() === "")) {
    throw new ApiError(400, "All required fields must be filled out");
  }

  // Ensure price and numberOfLessons are valid numbers
  if (isNaN(price) || isNaN(numberOfLessons)) {
    throw new ApiError(400, "Price and numberOfLessons must be valid numbers");
  }

  const existingCourse = await Course.findOne({ name });

  if (existingCourse) {
    throw new ApiError(409, "Course with this name already exists");
  }

  // Find the category by title
  const categoryDoc = await Category.findOne({ title: category });
  if (!categoryDoc) {
    throw new ApiError(400, "Invalid category");
  }

  // Handle image upload
  const imageLocalPath = req.files?.image?.[0]?.path;
  let courseImage;
  if (imageLocalPath) {
    courseImage = await uploadOnCloudinary(imageLocalPath);
  }
  if (!courseImage) {
    console.log("no image");
  }

  // Handle video uploads
  const videoPaths = req.files?.videos || [];
  const uploadedVideos = await Promise.all(
    videoPaths.map(async (file) => {
      const result = await uploadOnCloudinary(file.path);
      return result.url;
    })
  );

  // Handle file uploads
  const filePaths = req.files?.files || [];
  const uploadedFiles = await Promise.all(
    filePaths.map(async (file) => {
      const result = await uploadOnCloudinary(file.path);
      return result.url;
    })
  );

  // Handle free video upload
  const freeVideoPath = req.files?.freeVideo?.[0]?.path;
  let freeVideoUrl;
  if (freeVideoPath) {
    const result = await uploadOnCloudinary(freeVideoPath);
    freeVideoUrl = result.url;
  }

  // Handle free notes upload
  const freeNotesPath = req.files?.freeNotes?.[0]?.path;
  let freeNotesUrl;
  if (freeNotesPath) {
    const result = await uploadOnCloudinary(freeNotesPath);
    freeNotesUrl = result.url;
  }

  // Handle course intro video upload
  const courseIntroVideoPath = req.files?.courseIntroVideo?.[0]?.path;
  let courseIntroVideoUrl;
  if (courseIntroVideoPath) {
    const result = await uploadOnCloudinary(courseIntroVideoPath);
    courseIntroVideoUrl = result.url;
  }

  const course = await Course.create({
    name,
    price,
    description,
    detailedDescription,
    numberOfLessons,
    level,
    category: categoryDoc._id,
    image: courseImage?.url || "",
    videos: uploadedVideos,
    files: uploadedFiles,
    freeVideo: freeVideoUrl,
    freeNotes: freeNotesUrl,
    courseIntroVideo: courseIntroVideoUrl,
  });

  const createdCourse = await Course.findById(course._id).select();

  if (!createdCourse) {
    throw new ApiError(500, "Something went wrong while registering the course");
  }

  return res.status(201).json(
    new ApiResponse(200, createdCourse, "Course registered successfully")
  );
});

export {
  uploadCourse,
};

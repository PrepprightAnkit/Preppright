import { Category } from '../models/categories.model.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";

const uploadCat = asynchandler(async (req, res) => {
    const { title, description, imageUrl, department } = req.body;
  
    if ([title, description, department].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All required fields must be filled out");
    }
  
    const existingCat = await Category.findOne({ title });
  
    if (existingCat) {
        throw new ApiError(409, "Category with this title already exists");
    }
  
    const category = await Category.create({
        title,
        description,
        department,
        image: imageUrl || '../../uploads/images/PreepPright.png' 
    });
  
    const createdCat = await Category.findById(category._id).select();
  
    if (!createdCat) {
        throw new ApiError(500, "Something went wrong while registering the category");
    }
  
    return res.status(201).json(
        new ApiResponse(200, createdCat, "Category registered successfully")
    );
});


const bulkUploadCategories = asynchandler(async (req, res) => {
    const { categories } = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
        throw new ApiError(400, "Please provide an array of categories");
    }

    // Validate each category object
    categories.forEach((category, index) => {
        const { title, description } = category;
        if ([title, description].some((field) => !field?.trim())) {
            throw new ApiError(
                400, 
                `Invalid data in category at index ${index}. Title and description are required`
            );
        }
    });

    // Check for duplicate titles within the incoming array
    const titles = categories.map(cat => cat.title);
    const uniqueTitles = new Set(titles);
    if (titles.length !== uniqueTitles.size) {
        throw new ApiError(400, "Duplicate titles found in the request");
    }

    // Check for existing titles in database
    const existingCategories = await Category.find({
        title: { $in: titles }
    });

    if (existingCategories.length > 0) {
        const existingTitles = existingCategories.map(cat => cat.title).join(", ");
        throw new ApiError(
            409, 
            `Categories already exist with these titles: ${existingTitles}`
        );
    }

    // Prepare categories with default image if not provided
    const preparedCategories = categories.map(category => ({
        title: category.title,
        description: category.description,
        image: category.imageUrl || '../../uploads/images/PreepPright.png'
    }));

    // Insert all categories
    const createdCategories = await Category.insertMany(preparedCategories);

    return res.status(201).json(
        new ApiResponse(
            201, 
            createdCategories,
            `Successfully created ${createdCategories.length} categories`
        )
    );
});
export {
    bulkUploadCategories, uploadCat
};


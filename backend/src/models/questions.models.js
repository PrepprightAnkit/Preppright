import mongoose, { Schema } from "mongoose";
import { Option } from "./options.models.js"; // Import the Option model

const questionSchema = new Schema({
  text: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  options: {
    type: [Schema.Types.Mixed], // Use Mixed to allow custom types
    validate: {
      validator: function (v) {
        return v.length >= 2 && v.length <= 4; // Ensure 2-4 options
      },
      message: "A question must have between 2 and 4 options.",
    },
    required: true,
  },
});

export const Question = mongoose.model("Question", questionSchema);

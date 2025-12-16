import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/Post.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPost = asyncHandler(async (req, res) => {
    const localFilePath = req.file.path;
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
    if (!cloudinaryResponse?.secure_url) {
        throw new ApiError(500, "Failed to upload image");
    }

    const post = await Post.create({
      author: req.user._id,
      imageUrl: cloudinaryResponse.secure_url,
      caption: req.body.caption || "",
    })
    return res.status(201).json(
        new ApiResponse(201, post, "Post created successfully")
    )

})

export {createPost}
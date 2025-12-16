import {asyncHandler} from '../utils/asyncHandler.js';
import { User } from '../models/user.models.js';

const registerUser = asyncHandler(async (req, res) => {
    const {username,email, password} = req.body
    // NOTE:request body console log karani h
    console.log("email", email);
    if (
        [email,username,password].some((field)=>
        field?.trim()===""
    )) {
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })
    if (existedUser) {
        throw new ApiError(409, "User already exists with this email/username");
    }
    // NOTE: request files console log karani h
    // console.log("req.files", req.files);

    const user = await User.create({
        email,
        username:username.toLowerCase(),
        password
    })

    const craetedUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!craetedUser){
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(200, craetedUser, "User registered successfully")
    )

});

export { registerUser };
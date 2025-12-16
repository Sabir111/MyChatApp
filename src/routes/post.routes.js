import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createPost, getPostById } from "../controllers/post.controllers.js";

const router = Router();

router.route('/').post(verifyJWT,upload.single('image'),createPost)
router.route('/:id').get(getPostById)


export default router;
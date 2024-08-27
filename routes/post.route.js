import { Router } from "express";
import authMiddleware from "../middlewares/auth.js"
import {upload} from "../utils/multer.js"
import PostController from "../controllers/post.controller.js";
const router = Router();
router.post("/create" , authMiddleware , upload.single('image'),PostController.post)
router.get("/get" ,PostController.get)
router.put('/update/:id', authMiddleware, upload.single('image'), PostController.update);
router.get('/get-by-user', authMiddleware,  PostController.getByUser);
router.delete('/delete/:id', authMiddleware,  PostController.delete);
  
export default router

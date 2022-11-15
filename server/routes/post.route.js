import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/posts.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/post", verifyToken, getPost);

router.post("/post", verifyToken, addPost);

router.patch("/post", verifyToken, updatePost);

router.delete("/post", verifyToken, deletePost);

export default router;

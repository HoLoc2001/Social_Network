import express from "express";
import {
  addPost,
  deletePost,
  getMyPosts,
  getPosts,
  updatePost,
} from "../controllers/posts.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/posts", verifyToken, getPosts);

router.get("/myPosts", verifyToken, getMyPosts);

router.post("/post", verifyToken, addPost);

router.patch("/post", verifyToken, updatePost);

router.delete("/post", verifyToken, deletePost);

export default router;

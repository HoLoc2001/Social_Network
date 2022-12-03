import express from "express";
import {
  addCommentPost,
  addPost,
  deletePost,
  getCommentPost,
  getMyPosts,
  getPosts,
  updateLikePost,
  updatePost,
} from "../controllers/posts.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/posts", verifyToken, getPosts);

router.get("/myPosts", verifyToken, getMyPosts);

router.post("/getCommentPost", verifyToken, getCommentPost);

router.post("/addCommentPost", verifyToken, addCommentPost);

router.post("/post", verifyToken, addPost);

router.patch("/post", verifyToken, updatePost);

router.patch("/updateLikePost", verifyToken, updateLikePost);

router.delete("/post", verifyToken, deletePost);

export default router;

import express from "express";
import {
  addCommentPost,
  addPost,
  deletePost,
  getCommentPost,
  getMyPosts,
  getOtherPosts,
  getPosts,
  updateLikePost,
  updatePost,
} from "../controllers/posts.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/getPosts", verifyToken, getPosts);

router.post("/getMyPosts", verifyToken, getMyPosts);

router.post("/getOtherPosts", verifyToken, getOtherPosts);

router.post("/getCommentPost", verifyToken, getCommentPost);

router.post("/addCommentPost", verifyToken, addCommentPost);

router.post("/addPost", verifyToken, addPost);

router.patch("/updatePost", verifyToken, updatePost);

router.patch("/updateLikePost", verifyToken, updateLikePost);

router.delete("/post", verifyToken, deletePost);

export default router;

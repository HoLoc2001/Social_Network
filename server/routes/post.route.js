import express from "express";
import {
  addCommentPost,
  addPost,
  deleteComment,
  deletePost,
  getCommentPost,
  getListPostSearch,
  getMyPosts,
  getOtherPosts,
  getPosts,
  getPostSocket,
  getTotalComment,
  getTotalLikePost,
  getUpdatePost,
  updateLikePost,
  updatePost,
} from "../controllers/posts.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/getPosts", verifyToken, getPosts);

router.post("/getMyPosts", verifyToken, getMyPosts);

router.post("/getOtherPosts", verifyToken, getOtherPosts);

router.post("/getCommentPost", verifyToken, getCommentPost);

router.post("/getTotalComment", verifyToken, getTotalComment);

router.post("/getTotalLikePost", verifyToken, getTotalLikePost);

router.post("/getListPostSearch", verifyToken, getListPostSearch);

router.post("/getPostSocket", verifyToken, getPostSocket);

router.post("/addCommentPost", verifyToken, addCommentPost);

router.post("/addPost", verifyToken, addPost);

router.patch("/updatePost", verifyToken, updatePost);

router.post("/getUpdatePost", verifyToken, getUpdatePost);

router.patch("/updateLikePost", verifyToken, updateLikePost);

router.post("/deletePost", verifyToken, deletePost);

router.post("/deleteComment", verifyToken, deleteComment);

export default router;

const express = require("express");
const {
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
  updateComment,
  updateLikePost,
  updatePost,
} = require("../controllers/posts.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

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

router.patch("/updateComment", verifyToken, updateComment);

router.post("/getUpdatePost", verifyToken, getUpdatePost);

router.patch("/updateLikePost", verifyToken, updateLikePost);

router.post("/deletePost", verifyToken, deletePost);

router.post("/deleteComment", verifyToken, deleteComment);

module.exports = router;

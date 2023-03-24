const express = require("express");
const postController = require("../controllers/posts.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.post("/getPosts", verifyToken, postController.getPosts);

router.post("/getMyPosts", verifyToken, postController.getMyPosts);

router.post("/getOtherPosts", verifyToken, postController.getOtherPosts);

router.post("/getCommentPost", verifyToken, postController.getCommentPost);

router.post("/getTotalComment", verifyToken, postController.getTotalComment);

router.post(
  "/getListPostSearch",
  verifyToken,
  postController.getListPostSearch
);

router.post("/addPost", verifyToken, postController.addPost);

router.post("/getPost", verifyToken, postController.getPost);

router.post("/addCommentPost", verifyToken, postController.addCommentPost);

router.post("/getCommentPost", verifyToken, postController.getCommentPost);

router.patch("/updatePost", verifyToken, postController.updatePost);

router.patch("/updateComment", verifyToken, postController.updateComment);

router.post("/getListLike", verifyToken, postController.getListLikePost);

router.patch("/updateLikePost", verifyToken, postController.updateLikePost);

router.post("/deletePost", verifyToken, postController.deletePost);

router.post("/deleteComment", verifyToken, postController.deleteComment);

module.exports = router;

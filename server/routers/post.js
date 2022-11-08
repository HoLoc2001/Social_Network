import express from "express";
import {
  addPost,
  getPost,
  updatePost,
} from "../controllers/posts.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();
const app = express();
app.use(express.json());

router.get("/post", verifyToken, getPost);

router.post("/post", verifyToken, addPost);

router.patch("/post", verifyToken, updatePost);

router.delete("/post", verifyToken);

export default router;

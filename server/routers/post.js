import express from "express";
const router = express.Router();
import Posts from "../models/posts.js";

const app = express();
app.use(express.json());

router.get("/post", async (req, res) => {
  const posts = await Posts.findAll();
  res.status(200).json({ posts });
});

router.post("/post", async (req, res) => {
  const { userId, title } = req.body;
  const newPost = Posts.build({
    userId,
    title,
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.json(error);
  }
});

router.patch("/post/", async (request, res) => {
  const { id, title } = request.body;

  const post = await Posts.findOne({
    where: {
      id,
    },
  });

  await post.set({
    title,
  });

  await post.save();

  res.status(200).json(post);
});

router.delete("/post", async (req, res) => {
  const { id } = req.body;
  const post = await Posts.findOne({
    where: {
      id,
    },
  });

  await post.destroy();

  res.status(204).json({});
});

export default router;

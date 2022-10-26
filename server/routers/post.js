import express from "express";
import { QueryTypes } from "sequelize";
import { sequelize } from "../connectDB.js";
const router = express.Router();
import verifyToken from "../middleware/verifyToken.js";
import posts from "../models/posts.js";

const app = express();
app.use(express.json());

router.get("/post", verifyToken, async (req, res) => {
  const post1 = await posts.findAll({
    where: {
      id: req.userId,
    },
  });

  const post = await sequelize.query(
    "SELECT posts.* FROM posts INNER JOIN (SELECT list_friends.userId FROM users INNER JOIN friends ON users.id = friends.userId INNER JOIN list_friends ON friends.id = list_friends.friendId WHERE users.id = $id) as usersId ON posts.userId = usersId.userId ORDER BY posts.id DESC",
    {
      bind: { id: req.userId },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json({ post });
});

router.post("/post", verifyToken, async (req, res) => {
  const { userId, title, totalPhoto } = req.body;
  const newPost = posts.build({
    userId,
    title,
    totalPhoto,
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.json(error);
  }
});

router.patch("/post", verifyToken, async (request, res) => {
  const { id, title } = request.body;

  const post = await posts.findOne({
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

router.delete("/post", verifyToken, async (req, res) => {
  const { id } = req.body;
  const post = await posts.findOne({
    where: {
      id,
    },
  });

  await post.destroy();

  res.status(204).json({});
});

export default router;

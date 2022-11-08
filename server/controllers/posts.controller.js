import { QueryTypes } from "sequelize";
import { sequelize } from "../connectDB.js";
import Posts from "../models/posts.js";

export const getPost = async (req, res) => {
  const post = await sequelize.query(
    "SELECT posts.* FROM posts INNER JOIN (SELECT list_friends.userId FROM users INNER JOIN friends ON users.id = friends.userId INNER JOIN list_friends ON friends.id = list_friends.friendId WHERE users.id = $id) as usersId ON posts.userId = usersId.userId ORDER BY posts.id DESC",
    {
      bind: { id: req.userId },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json({ post });
};

export const addPost = async (req, res) => {
  const { userId, title, totalPhoto } = req.body;
  const newPost = Posts.build({
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
};

export const updatePost = async (request, res) => {
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
};

export const deletePost = async (req, res) => {
  const { id } = req.body;
  const post = await Posts.findOne({
    where: {
      id,
    },
  });

  await post.destroy();

  res.status(204).json({});
};

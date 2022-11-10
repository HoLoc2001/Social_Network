import { QueryTypes } from "sequelize";
import { pool } from "../connectDB.js";

export const getPost = async (req, res) => {
  const post = await pool.execute(
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
  const date = new Date();
  try {
    await pool.execute("call add_post(?, ?, ?, ?)", [
      userId,
      title,
      totalPhoto,
      date,
    ]);

    res.status(201).json({ msg: "Thanh cong!" });
  } catch (error) {
    res.json(error);
  }
};

export const updatePost = async (request, res) => {
  const { id, title } = request.body;

  try {
    await pool.execute("");
  } catch (error) {
    res.json(error);
  }

  res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  const { id } = req.body;
  try {
    await pool.execute("");
  } catch (error) {
    res.json(error);
  }

  res.status(204).json({});
};

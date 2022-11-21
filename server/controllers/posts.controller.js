import { pool } from "../connectDB.js";

export const getPosts = async (req, res) => {
  const userId = req.userId;
  try {
    const [posts] = await pool.execute("call get_post(?)", [2]);

    res.status(200).json({ posts: posts[0] });
  } catch (error) {
    res.json(error);
  }
};

export const addPost = async (req, res) => {
  const { userId, title, totalPhoto } = req.body;
  const date = new Date();
  try {
    await pool.execute("call add_post(?, ?, ?)", [userId, title, totalPhoto]);

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
    const [post] = await pool.execute(
      "select id from posts where id = ? and userId = ?",
      [id, req.userId]
    );
    if (post.length) {
      await pool.execute("call delete_post(?)", [id]);
      res.status(204).json({});
    } else {
      res.status(403).json({});
    }
  } catch (error) {
    res.json(error);
  }
};

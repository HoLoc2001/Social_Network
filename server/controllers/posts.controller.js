import { pool } from "../connectDB.js";

export const getPosts = async (req, res) => {
  const userId = req.userId;
  try {
    const [posts] = await pool.execute("call get_post(?)", [userId]);

    res.status(200).json({ posts: posts[0] });
  } catch (error) {
    res.json(error);
  }
};

export const addPost = async (req, res) => {
  const { title, image } = req.body;
  try {
    const [row] = await pool.execute("call add_post(?, ?, ?)", [
      req.userId,
      title,
      image,
    ]);

    res.status(201).json({ msg: "Thanh cong!", post: row[0] });
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

export const getMyPosts = async (req, res) => {
  try {
    const userId = req.userId;
    const [posts] = await pool.execute("call get_my_post(?)", [userId]);

    res.status(200).json({ myPosts: posts[0] });
  } catch (error) {}
};

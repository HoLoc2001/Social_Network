import { pool } from "../connectDB.js";

export const getPosts = async (req, res) => {
  const { page } = req.body;
  const userId = req.userId;
  try {
    const [posts] = await pool.execute("call get_post(?, ?)", [userId, page]);
    res.status(200).json({ posts: posts[0] });
  } catch (error) {
    res.json(error);
  }
};

export const addPost = async (req, res) => {
  const { title, image } = req.body;
  const userId = req.userId;
  try {
    const [row] = await pool.execute("call add_post(?, ?, ?)", [
      userId,
      title,
      image,
    ]);
    _io.emit("notification-addPost", {
      postId: row[0][0].id,
      userId,
    });

    res.status(201).json({ msg: "Thanh cong!", post: row[0] });
  } catch (error) {
    res.json(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId, title, img } = req.body;
    const [row] = await pool.execute("call update_post(?, ?, ?, ?)", [
      postId,
      userId,
      title,
      img,
    ]);
    _io.emit("notification-UpdatePost", { postId });
    res.status(200).json({ post: row[0] });
  } catch (error) {
    res.json(error);
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const userId = req.userId;
    const { page } = req.body;
    const [posts] = await pool.execute("call get_my_post(?, ?)", [
      userId,
      page,
    ]);

    res.status(200).json({ myPosts: posts[0] });
  } catch (error) {
    res.json(error);
  }
};

export const getOtherPosts = async (req, res) => {
  try {
    const { page, userId } = req.body;
    const [posts] = await pool.execute("call get_my_post(?, ?)", [
      userId,
      page,
    ]);

    res.status(200).json({ otherPosts: posts[0] });
  } catch (error) {
    res.json(error);
  }
};

export const updateLikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.userId;
    const [row] = await pool.execute("call update_like_post(?, ?)", [
      postId,
      userId,
    ]);
    _io.emit("notification-LikePost", { postId });
    res.status(200).json({ data: row[0] });
  } catch (error) {
    res.json(error);
  }
};

export const getCommentPost = async (req, res) => {
  try {
    const { postId } = req.body;
    console.log(postId);
    const [row] = await pool.execute("call get_comment_post(?)", [postId]);
    res.status(200).json({ data: row[0] });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const addCommentPost = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.userId;
    const [row] = await pool.execute("call add_comment_post(?, ?, ?)", [
      postId,
      userId,
      content,
    ]);
    _io.emit("notification-CommentPost", { postId, userId: req.userId });
    res.status(200).json({ data: row[0] });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const getListPostSearch = async (req, res) => {
  try {
    const { data } = req.body;
    const [row] = await pool.execute("call get_search_post(?, ?)", [
      data,
      req.userId,
    ]);

    res.json({ success: true, data: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const [row] = await pool.execute("call delete_post(?, ?)", [
      postId,
      req.userId,
    ]);
    res.json({ success: true, data: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTotalComment = async (req, res) => {
  try {
    const { postId } = req.body;
    const [row] = await pool.execute("call get_total_comments(?)", [postId]);
    res.json({ success: true, data: row[0], postId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTotalLikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const [row] = await pool.execute("call get_total_like(?)", [postId]);
    res.json({ success: true, data: row[0], postId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUpdatePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const [row] = await pool.execute("call get_update_like(?)", [postId]);
    res.json({ success: true, data: row[0], postId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getPostSocket = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.userId;
    const [row] = await pool.execute("call get_post_socket(?,?)", [
      postId,
      userId,
    ]);
    res.json({ success: true, data: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

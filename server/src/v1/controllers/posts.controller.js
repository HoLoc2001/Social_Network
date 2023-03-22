const pool = require("../../db/connectDB");
const postService = require("../services/post.service");

const getPosts = async (req, res) => {
  const { page } = req.body;
  const userId = req.userId;
  try {
    const posts = await await postService.getPosts(userId, page);
    res.status(200).json({ posts });
  } catch (error) {
    res.json(error);
  }
};

const addPost = async (req, res) => {
  const { content, urlImages } = req.body;
  const userId = req.userId;
  try {
    const post = await postService.addPost(userId, content, urlImages);

    _io.emit("notification-addPost", {
      postId: post,
      userId,
    });

    res.status(201).json({ msg: "Correct", post });
  } catch (error) {
    console.log(error.message);
    return {
      code: 500,
      message: "Server Error",
    };
  }
};

const updatePost = async (req, res) => {
  try {
    const { content, postId, urlImages } = req.body;
    const userId = req.userId;
    const post = await postService.updatePost(
      postId,
      userId,
      content,
      urlImages
    );

    _io.emit("notification-UpdatePost", { postId });
    res.status(200).json({ post });
  } catch (error) {
    res.json(error);
  }
};

const getMyPosts = async (req, res) => {
  try {
    const userId = req.userId;
    const { page } = req.body;
    const posts = await postService.getUserPosts(userId, userId, page);
    res.status(200).json({ myPosts: posts });
  } catch (error) {
    console.log(error.message);
    return {
      code: 500,
      message: "Server Error",
    };
  }
};

const getOtherPosts = async (req, res) => {
  try {
    const { page, userId } = req.body;
    const ownUserId = req.userId;
    const posts = await postService.getUserPosts(userId, ownUserId, page);

    res.status(200).json({ otherPosts: posts });
  } catch (error) {
    res.json(error);
  }
};

const updateLikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.userId;
    const isLike = await postService.getUserIsLike(postId, userId);
    let totalLikes;
    if (isLike.rowCount) {
      totalLikes = await postService.updateDecrLikePost(postId, userId);
    } else {
      totalLikes = await postService.updateIncrLikePost(postId, userId);
    }

    _io.emit("notification-LikePost", { postId });
    res.status(200).json({
      totalLikes: totalLikes?.list_like?.length,
      isLike: !isLike.rowCount,
    });
  } catch (error) {
    res.json(error);
  }
};

const getCommentPost = async (req, res) => {
  try {
    const { postId } = req.body;
    const [row] = await pool.execute("call get_comment_post(?)", [postId]);
    res.status(200).json({ data: row[0] });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const addCommentPost = async (req, res) => {
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

const getListPostSearch = async (req, res) => {
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

const deletePost = async (req, res) => {
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

const getTotalComment = async (req, res) => {
  try {
    const { postId } = req.body;
    const [row] = await pool.execute("call get_total_comments(?)", [postId]);
    res.json({ success: true, data: row[0], postId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTotalLikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const [row] = await pool.execute("call get_total_like(?)", [postId]);
    res.json({ success: true, data: row[0], postId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getListLikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const [row] = await pool.execute("call get_total_like(?)", [postId]);
    res.json({ success: true, data: row[0], postId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getUpdatePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const [row] = await pool.execute("call get_update_like(?)", [postId]);
    res.json({ success: true, data: row[0], postId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPostSocket = async (req, res) => {
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

const deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.body;
    const userId = req.userId;
    const [row] = await pool.execute("call delete_comment_post(?,?)", [
      commentId,
      postId,
    ]);
    _io.emit("notification-DeleteCommentPost", { postId, userId, commentId });
    res.json({ success: true, data: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { commentId, content, postId } = req.body;
    const userId = req.userId;
    await pool.execute("call update_comment(?,?,?)", [
      userId,
      commentId,
      content,
    ]);
    _io.emit("notification-UpdateCommentPost", { postId });
    s;
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addPost,
  addCommentPost,
  getPosts,
  getMyPosts,
  getOtherPosts,
  getCommentPost,
  getListPostSearch,
  getTotalComment,
  getTotalLikePost,
  getUpdatePost,
  getPostSocket,
  updatePost,
  updateLikePost,
  updateComment,
  deletePost,
  deleteComment,
};

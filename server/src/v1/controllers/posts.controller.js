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
      postId: post.post_id,
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

    _io.emit("notification-UpdatePost", { userId, postId });
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
    const comments = await postService.getCommentPost(postId);
    res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const addCommentPost = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.userId;
    const commentId = await postService.addCommentPost(postId, userId, content);
    const totalComments = await postService.updateIncrTotalComment(postId);

    _io.emit("notification-CommentPost", { postId, userId: req.userId });
    res.status(200).json({ commentId, totalComments, postId, content });
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
    const userId = req.userId;

    await postService.deleteComments(postId, userId);
    const data = await postService.deletePost(postId, userId);
    console.log(data);
    res.json({ success: true, postId: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTotalComment = async (req, res) => {
  try {
    const { postId } = req.body;
    const totalComments = await postService.getTotalComment(postId);
    res.json({ totalComments, postId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getListLikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const listLike = await postService.getListLike(postId);
    res.json({ listLike });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.userId;
    const post = await postService.getPost(userId, postId);
    res.json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.body;
    const userId = req.userId;
    const { post_id, comment_id } = await postService.deleteComment(
      commentId,
      postId,
      userId
    );
    await postService.updateDecrTotalComment(postId);

    _io.emit("notification-DeleteCommentPost", { postId, userId, commentId });

    res.json({ post_id, comment_id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { commentId, content, postId } = req.body;
    console.log(commentId, content, postId);
    const userId = req.userId;
    await postService.updateComment(commentId, content, userId);
    _io.emit("notification-UpdateCommentPost", { postId });

    res.json({ commentId, content, postId });
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
  getListLikePost,
  getPost,
  updatePost,
  updateLikePost,
  updateComment,
  deletePost,
  deleteComment,
};

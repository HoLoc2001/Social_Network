import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../utils";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (page, { getState }) => {
    const { posts } = getState().posts;
    const res = await axiosPrivate.post(`post/getPosts`, { page });
    const data = [...posts, ...res.data.posts];
    return data;
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ content, urlImages }, { getState }) => {
    const { myPosts } = getState().posts;
    const res = await axiosPrivate.post(`post/addPost`, { content, urlImages });
    const resData = [...res.data.post, ...myPosts];
    return resData;
  }
);

export const addImgCloudinary = createAsyncThunk(
  "posts/addImgCloudinary",
  async ({ images }) => {
    const res = await axiosPrivate.post(`uploads/cloudinary-upload`, images);
    return res.data;
  }
);

export const updateLikePost = createAsyncThunk(
  "posts/updateLikePost",
  async (postId) => {
    const res = await axiosPrivate.patch(`post/updateLikePost`, {
      postId: postId,
    });
    return { ...res.data, postId };
  }
);

export const updateLikeMyPost = createAsyncThunk(
  "posts/updateLikeMyPost",
  async (postId) => {
    const res = await axiosPrivate.patch(`updateLikePost`, {
      postId: postId,
    });
    return res.data.data[0];
  }
);

export const getMyPosts = createAsyncThunk(
  "posts/getMyPosts",
  async (page, { getState }) => {
    const { myPosts } = getState().posts;
    const res = await axiosPrivate.post(`post/getMyPosts`, { page });
    const data = [...myPosts, ...res.data.myPosts];
    return data;
  }
);

export const getOtherPosts = createAsyncThunk(
  "posts/getOtherPosts",
  async (data, { getState }) => {
    const { otherPosts } = getState().posts;
    const { page, userId } = data;
    const res = await axiosPrivate.post(`post/getOtherPosts`, { page, userId });
    if (page === 0) {
      const dataPosts = [...res.data.otherPosts];
      return dataPosts;
    }
    const dataPosts = [...otherPosts, ...res.data.otherPosts];
    return dataPosts;
  }
);

export const getCommentPost = createAsyncThunk(
  "posts/getCommentPost",
  async (postId) => {
    const res = await axiosPrivate.post("getCommentPost", { postId });
    return res.data;
  }
);

export const getCommentPostSocket = createAsyncThunk(
  "posts/getCommentPost",
  async (postId, { getState }) => {
    const res = await axiosPrivate.post("getTotalComment", { postId });
    return res.data;
  }
);

export const addCommentPost = createAsyncThunk(
  "posts/addCommentPost",
  async (data) => {
    const res = await axiosPrivate.post("addCommentPost", {
      postId: data.postId,
      content: data.content,
    });
    return res.data.data[0];
  }
);

export const getListPostSearch = createAsyncThunk(
  "posts/getListPostSearch",
  async (data) => {
    try {
      const res = await axiosPrivate.post("getListPostSearch", { data });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, content, urlImages }, { getState }) => {
    try {
      const res = await axiosPrivate.patch("post/updatePost", {
        postId,
        content,
        urlImages,
      });
      return res.data.post[0];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTotalComment = createAsyncThunk(
  "posts/getTotalComment",
  async (postId) => {
    try {
      const res = await axiosPrivate.post("getTotalComment", {
        postId,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTotalLikePost = createAsyncThunk(
  "posts/getTotalLikePost",
  async (postId) => {
    try {
      const res = await axiosPrivate.post("getTotalLikePost", {
        postId,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUpdatePost = createAsyncThunk(
  "posts/getUpdatePost",
  async (postId) => {
    try {
      const res = await axiosPrivate.post("getUpdatePost", {
        postId,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { getState }) => {
    try {
      const { myPosts } = getState().posts;
      const res = await axiosPrivate.post("deletePost", { postId });
      const data = myPosts.filter((post) => {
        return post.id !== res.data.data[0].postId;
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ commentId, postId }) => {
    try {
      const res = await axiosPrivate.post("deleteComment", {
        commentId,
        postId,
      });
      return res.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "posts/updateComment",
  async ({ commentId, content, postId }) => {
    try {
      const res = await axiosPrivate.patch("updateComment", {
        commentId,
        content,
        postId,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPostSocket = createAsyncThunk(
  "posts/getPostSocket",
  async (data, { getState }) => {
    try {
      const { listFollower } = getState().user;
      const { postId, userId } = data;

      const res = await axiosPrivate.post("getPostSocket", { postId });
      let hasFollow = listFollower.some((e) => e.id == userId);
      return { post: res.data.data[0], hasFollow };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserSocket = createAsyncThunk(
  "posts/updateUserSocket",
  async (data, { getState }) => {
    try {
      const { id, fullname, avatar } = data;

      return { id, fullname, avatar };
    } catch (error) {
      console.log(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "",
    posts: [],
    otherPosts: [],
    myPosts: [],
    listPostSearch: [],
    urlImages: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action?.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.myPosts = action?.payload;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.myPosts = action?.payload;
      })
      .addCase(getOtherPosts.fulfilled, (state, action) => {
        state.otherPosts = action.payload || [];
      })
      .addCase(updateLikePost.fulfilled, (state, action) => {
        state.posts.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (
              (e.total_like = action.payload?.totalLikes),
              (e.islike = action.payload?.isLike)
            );
          }
        });
        state.myPosts.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (
              (e.total_like = action.payload?.totalLikes),
              (e.islike = action.payload?.isLike)
            );
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (
              (e.total_like = action.payload?.totalLikes),
              (e.islike = action.payload?.isLike)
            );
          }
        });
        state.listPostSearch.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (
              (e.total_like = action.payload?.totalLikes),
              (e.islike = action.payload?.isLike)
            );
          }
        });
      })
      .addCase(updateLikeMyPost.fulfilled, (state, action) => {
        state.myPosts.forEach((e) => {
          if (e.id === action.payload?.id) {
            return (
              (e.totalLike = action.payload?.totalLike),
              (e.isLike = action.payload?.isLike)
            );
          }
        });
      })
      .addCase(getCommentPost.fulfilled, (state, action) => {
        state.posts?.forEach((e) => {
          if (e.id === action.payload?.data[0].postId) {
            return (e.comments = action.payload?.data);
          }
        });
        state.myPosts?.forEach((e) => {
          if (e.id === action.payload?.data[0]?.postId) {
            return (e.comments = action.payload?.data);
          }
        });
        state.otherPosts?.forEach((e) => {
          if (e.id === action.payload?.data[0]?.postId) {
            return (e.comments = action.payload?.data);
          }
        });
        state.listPostSearch?.forEach((e) => {
          if (e.id === action.payload?.data[0]?.postId) {
            return (e.comments = action.payload?.data);
          }
        });
      })
      .addCase(addCommentPost.fulfilled, (state, action) => {
        state.posts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (
              (e.totalComment = action.payload?.totalComment),
              (e.comment = action.payload?.content)
            );
          }
        });
        state.myPosts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (
              (e.totalComment = action.payload?.totalComment),
              (e.comment = action.payload?.content)
            );
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (
              (e.totalComment = action.payload?.totalComment),
              (e.comment = action.payload?.content)
            );
          }
        });
        state.listPostSearch.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (
              (e.totalComment = action.payload?.totalComment),
              (e.comment = action.payload?.content)
            );
          }
        });
      })
      .addCase(getListPostSearch.fulfilled, (state, action) => {
        state.listPostSearch = action?.payload?.data;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.myPosts.forEach((e) => {
          if (e.id === action.payload?.id) {
            return (
              (e.title = action.payload?.title),
              (e.image = action.payload?.image)
            );
          }
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.myPosts = action?.payload;
      })
      .addCase(getTotalComment.fulfilled, (state, action) => {
        state.myPosts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalComment = action.payload?.data[0].totalComment);
          }
        });
        state.posts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalComment = action.payload?.data[0].totalComment);
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalComment = action.payload?.data[0].totalComment);
          }
        });
        state.listPostSearch.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalComment = action.payload?.data[0].totalComment);
          }
        });
      })
      .addCase(getTotalLikePost.fulfilled, (state, action) => {
        state.myPosts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalLike = action.payload?.data[0].totalLike);
          }
        });
        state.posts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalLike = action.payload?.data[0].totalLike);
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalLike = action.payload?.data[0].totalLike);
          }
        });
        state.listPostSearch.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalLike = action.payload?.data[0].totalLike);
          }
        });
      })
      .addCase(getUpdatePost.fulfilled, (state, action) => {
        state.myPosts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (
              (e.title = action.payload?.data[0].title),
              (e.image = action.payload?.data[0].image)
            );
          }
        });
        state.posts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (
              (e.title = action.payload?.data[0].title),
              (e.image = action.payload?.data[0].image)
            );
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (
              (e.title = action.payload?.data[0].title),
              (e.image = action.payload?.data[0].image)
            );
          }
        });
        state.listPostSearch.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (
              (e.title = action.payload?.data[0].title),
              (e.image = action.payload?.data[0].image)
            );
          }
        });
      })
      .addCase(getPostSocket.fulfilled, (state, action) => {
        if (action.payload.hasFollow) {
          state.posts.push(action.payload.post);
        }
      })
      .addCase(updateUserSocket.fulfilled, (state, action) => {
        state.myPosts.forEach((e) => {
          if (e.userId === action.payload?.id) {
            e.fullname = action.payload?.fullname;
            e.avatar = action.payload?.avatar;
          }
          e.comments?.forEach((comment) => {
            if (comment.userId === action.payload?.id) {
              comment.fullname = action.payload?.fullname;
              comment.avatar = action.payload?.avatar;
            }
          });
        });
      })
      .addCase(updateComment.fulfilled, (state, action) => {})

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.posts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalComment = action.payload?.totalComment);
          }
        });
        state.myPosts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalComment = action.payload?.totalComment);
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalComment = action.payload?.totalComment);
          }
        });
        state.listPostSearch.forEach((e) => {
          if (e.id === action.payload?.postId) {
            return (e.totalComment = action.payload?.totalComment);
          }
        });
      })
      .addCase(addImgCloudinary.fulfilled, (state, action) => {
        state.urlImages = action.payload;
      });
  },
});

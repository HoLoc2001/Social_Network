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
    const { myPosts, posts } = getState().posts;
    const { user } = getState().user;
    const res = await axiosPrivate.post(`post/addPost`, { content, urlImages });
    const myPost = {
      ...res.data.post,
      fullname: user.fullname,
      avatar: user.avatar,
    };

    const postsData = [myPost, ...posts];
    const myPostsData = [res.data.post, ...myPosts];

    return { myPostsData, postsData };
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
    const res = await axiosPrivate.post("post/getCommentPost", { postId });
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
    const res = await axiosPrivate.post("post/addCommentPost", {
      postId: data.postId,
      content: data.content,
    });
    return res.data;
  }
);

export const getListPostSearch = createAsyncThunk(
  "posts/getListPostSearch",
  async (textSearch) => {
    try {
      const res = await axiosPrivate.post("post/getListPostSearch", {
        textSearch,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getListLike = createAsyncThunk(
  "posts/getListLike",
  async (postId) => {
    try {
      const res = await axiosPrivate.post("post/getListLike", { postId });
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
      const res = await axiosPrivate.post("post/getTotalComment", {
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
      const res = await axiosPrivate.post("post/getPost", {
        postId,
      });
      return res.data.post;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { getState }) => {
    try {
      const { myPosts, posts } = getState().posts;
      const res = await axiosPrivate.post("post/deletePost", { postId });
      const updatedMyPosts = myPosts.filter((post) => {
        return post.post_id !== res.data.postId;
      });
      const updatedPosts = posts.filter((post) => {
        return post.post_id !== res.data.postId;
      });

      return { updatedMyPosts, updatedPosts };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ commentId, postId }) => {
    try {
      const res = await axiosPrivate.post("post/deleteComment", {
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
      const res = await axiosPrivate.patch("post/updateComment", {
        commentId,
        content,
        postId,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPost = createAsyncThunk(
  "posts/getPost",
  async ({ postId, userId }, { getState }) => {
    try {
      const { listFollower } = getState().user;
      const res = await axiosPrivate.post("post/getPost", { postId });
      let hasFollow = listFollower.some((e) => e.user_id === userId);
      return { post: res.data.post, hasFollow };
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
    listLike: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action?.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.myPosts = action?.payload?.myPostsData;
        state.posts = action?.payload?.postsData;
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
              (e.islike = action.payload?.islike)
            );
          }
        });
        state.myPosts.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (
              (e.total_like = action.payload?.totalLikes),
              (e.islike = action.payload?.islike)
            );
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (
              (e.total_like = action.payload?.totalLikes),
              (e.islike = action.payload?.islike)
            );
          }
        });
        state.listPostSearch.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (
              (e.total_like = action.payload?.totalLikes),
              (e.islike = action.payload?.islike)
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
          if (e.post_id === action.payload?.comments[0].post_id) {
            return (e.comments = action.payload?.comments);
          }
        });
        state.myPosts?.forEach((e) => {
          if (e.post_id === action.payload?.comments[0]?.post_id) {
            return (e.comments = action.payload?.comments);
          }
        });
        state.otherPosts?.forEach((e) => {
          if (e.post_id === action.payload?.comments[0]?.post_id) {
            return (e.comments = action.payload?.comments);
          }
        });
        state.listPostSearch?.forEach((e) => {
          if (e.post_id === action.payload?.comments[0]?.post_id) {
            return (e.comments = action.payload?.comments);
          }
        });
      })
      .addCase(addCommentPost.fulfilled, (state, action) => {
        state.posts.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (
              (e.total_comment = action.payload?.totalComments),
              (e.comment = action.payload?.content)
            );
          }
        });
        state.myPosts.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (
              (e.total_comment = action.payload?.totalComments),
              (e.comment = action.payload?.content)
            );
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (
              (e.total_comment = action.payload?.totalComments),
              (e.comment = action.payload?.content)
            );
          }
        });
        state.listPostSearch.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (
              (e.total_comment = action.payload?.totalComments),
              (e.comment = action.payload?.content)
            );
          }
        });
      })
      .addCase(getListPostSearch.fulfilled, (state, action) => {
        state.listPostSearch = action?.payload?.posts;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.myPosts.forEach((e) => {
          if (e.post_id === action.payload?.post_id) {
            return (
              (e.post_content = action.payload?.post_content),
              (e.images = action.payload?.images)
            );
          }
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.myPosts = action?.payload.updatedMyPosts;
        state.posts = action?.payload.updatedPosts;
      })
      .addCase(getTotalComment.fulfilled, (state, action) => {
        state.myPosts.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (e.total_comment = action.payload?.totalComments);
          }
        });
        state.posts.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (e.total_comment = action.payload?.totalComments);
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (e.total_comment = action.payload?.totalComments);
          }
        });
        state.listPostSearch.forEach((e) => {
          if (e.post_id === action.payload?.postId) {
            return (e.total_comment = action.payload?.totalComments);
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
          if (e.post_id === action.payload?.post_id) {
            return (
              (e.post_content = action.payload?.post_content),
              (e.images = action.payload?.images)
            );
          }
        });
        state.posts.forEach((e) => {
          if (e.post_id === action.payload?.post_id) {
            return (
              (e.post_content = action.payload?.post_content),
              (e.images = action.payload?.images)
            );
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.post_id === action.payload?.post_id) {
            return (
              (e.post_content = action.payload?.post_content),
              (e.images = action.payload?.images)
            );
          }
        });
        state.listPostSearch.forEach((e) => {
          if (e.post_id === action.payload?.post_id) {
            return (
              (e.post_content = action.payload?.post_content),
              (e.images = action.payload?.images)
            );
          }
        });
      })
      .addCase(getPost.fulfilled, (state, action) => {
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
      })
      .addCase(getListLike.fulfilled, (state, action) => {
        console.log(action.payload);
        state.listLike = action.payload.listLike;
      });
  },
});

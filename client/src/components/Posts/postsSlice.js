import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../utils";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const res = await axiosPrivate.get(`posts`);
  return res.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (data) => {
  console.log(data);

  const res = await axiosPrivate.post(`post`, {
    title: data.title,
    image: data.imgPost,
  });
  return res.data;
});

export const updatePost = createAsyncThunk("posts/updatePost", async () => {
  const res = await axiosPrivate.patch(`posts`);
  return res.data;
});

export const updateLikePost = createAsyncThunk(
  "posts/updateLikePost",
  async (postId) => {
    const res = await axiosPrivate.patch(`updateLikePost`, {
      postId: postId,
    });
    return res.data.data[0];
  }
);

export const getMyPosts = createAsyncThunk("posts/getMyPosts", async () => {
  const res = await axiosPrivate.get("myPosts");
  return res.data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: { status: "", posts: [], myPosts: [], photo: "" },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action?.payload?.posts;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.myPosts.unshift(action.payload?.post);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts.push();
      })
      .addCase(updateLikePost.fulfilled, (state, action) => {
        state.posts.map((post) => {
          if (post.id === action.payload?.id) {
            return (
              (post.totalLike = action.payload?.totalLike),
              (post.isLike = action.payload?.isLike)
            );
          }
          return post;
        });
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.myPosts = action?.payload?.myPosts;
      });
  },
});

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../../utils";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const res = await axiosPrivate.get(`posts`);
  console.log(res);
  return res.data;
});

export const addPost = createAsyncThunk("posts/addPost", async () => {
  const res = await axiosPrivate.post(`posts`);
  return res.data;
});

export const updatePost = createAsyncThunk("posts/updatePost", async () => {
  const res = await axiosPrivate.patch(`posts`);
  return res.data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: { status: "", post: [], tokenExpired: null },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.post = action?.payload?.posts;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.post.push();
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.post.push();
      });
  },
});

// export const postsSelector = (state) => state.posts.post;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const postsSlice = createSlice({
  name: "posts",
  initialState: { status: "", post: [] },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.post = action.payload.posts;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.post.push();
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.post.push();
      });
  },
});

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const res = await axios.get(`localhost:5000/posts`);
  return res.data;
});

export const addPost = createAsyncThunk("posts/addPost", async () => {
  const res = await axios.post(`localhost:5000/posts`);
  return res.data;
});

export const updatePost = createAsyncThunk("posts/updatePost", async () => {
  const res = await axios.patch(`localhost:5000/posts`);
  return res.data;
});

export const postsSelector = (state) => state.posts.post;

export default postsSlice;

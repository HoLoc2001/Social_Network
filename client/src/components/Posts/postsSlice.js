import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const postsSlice = createSlice({
  name: "posts",
  initialState: { post: [2] },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.post = action.payload.posts;
      console.log(state);
      console.log(action);
    });
  },
});

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const data = await axios.get("http://localhost:5000/api/posts");
  return data.data;
});

export const postsSelector = (state) => state.posts.post;

export default postsSlice;

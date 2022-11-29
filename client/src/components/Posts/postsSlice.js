import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../utils";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const res = await axiosPrivate.get(`posts`);
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

export const getMyPosts = createAsyncThunk("posts/getMyPosts", async () => {
  const res = await axiosPrivate.get("myPosts");
  return res.data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: { status: "", posts: [], myPosts: [] },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action?.payload?.posts;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push();
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts.push();
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.myPosts = action?.payload?.myPosts;
      });
  },
});

// export const postsSelector = (state) => state.posts.post;

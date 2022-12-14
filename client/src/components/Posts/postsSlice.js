import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../utils";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (page, { getState }) => {
    const { posts } = getState().posts;
    const res = await axiosPrivate.post(`getPosts`, { page });
    const data = [...posts, ...res.data.posts];
    return data;
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data, { getState }) => {
    const { myPosts } = getState().posts;
    const res = await axiosPrivate.post(`addPost`, {
      title: data.title,
      image: data.imgPost,
    });
    const resData = [...res.data.post, ...myPosts];
    return resData;
  }
);

export const updateLikePost = createAsyncThunk(
  "posts/updateLikePost",
  async (postId) => {
    const res = await axiosPrivate.patch(`updateLikePost`, {
      postId: postId,
    });
    return res.data.data[0];
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
    const res = await axiosPrivate.post(`getMyPosts`, { page });
    const data = [...myPosts, ...res.data.myPosts];
    return data;
  }
);

export const getOtherPosts = createAsyncThunk(
  "posts/getOtherPosts",
  async (data, { getState }) => {
    const { otherPosts } = getState().posts;
    const { page, userId } = data;
    const res = await axiosPrivate.post(`getOtherPosts`, { page, userId });
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

export const updateMyPost = createAsyncThunk(
  "posts/updatePost",
  async (dataUpdate, { getState }) => {
    try {
      const { myPosts } = getState().posts;
      const { postId, title, img } = dataUpdate;
      const res = await axiosPrivate.patch("updatePost", {
        postId,
        title,
        img,
      });
      // const data = [...myPosts];
      // data.map((post) => {
      //   console.log(post.title);
      //   return (post.title = "ci");
      //   if (post.id == res.data.post[0].id) {
      //     // return (post.title = res.data.post[0].title);
      //   }
      // });
      // console.log(data);
      return res.data.post[0];
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
      console.log(data);
      return data;
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
          if (e.id === action.payload?.id) {
            return (
              (e.totalLike = action.payload?.totalLike),
              (e.isLike = action.payload?.isLike)
            );
          }
        });
        state.myPosts.forEach((e) => {
          if (e.id === action.payload?.id) {
            return (
              (e.totalLike = action.payload?.totalLike),
              (e.isLike = action.payload?.isLike)
            );
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.id === action.payload?.id) {
            return (
              (e.totalLike = action.payload?.totalLike),
              (e.isLike = action.payload?.isLike)
            );
          }
        });
        state.listPostSearch.forEach((e) => {
          if (e.id === action.payload?.id) {
            return (
              (e.totalLike = action.payload?.totalLike),
              (e.isLike = action.payload?.isLike)
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
        state.posts.forEach((e) => {
          if (e.id === action.payload?.data[0]?.postId) {
            return (e.comments = action.payload?.data);
          }
        });
        state.myPosts.forEach((e) => {
          if (e.id === action.payload?.data[0]?.postId) {
            return (e.comments = action.payload?.data);
          }
        });
        state.otherPosts.forEach((e) => {
          if (e.id === action.payload?.data[0]?.postId) {
            return (e.comments = action.payload?.data);
          }
        });
        state.listPostSearch.forEach((e) => {
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
      .addCase(updateMyPost.fulfilled, (state, action) => {
        console.log(action.payload?.img);
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
      });
  },
});

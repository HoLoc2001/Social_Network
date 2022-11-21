import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../components/Posts/postsSlice";

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

export default store;

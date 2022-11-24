import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../components/Posts/postsSlice";
import userSlice from "../components/User/userSlice";

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;

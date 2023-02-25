import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import { postsSlice } from "./postsSlice";
import { userSlice } from "./userSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

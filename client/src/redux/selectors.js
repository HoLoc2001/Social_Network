import { createSelector } from "@reduxjs/toolkit";

export const postsSelector = (state) => state.posts.post;

export const todosRemainingSelector = createSelector(
  (state) => state.posts.post
);

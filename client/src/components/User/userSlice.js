import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: { userId: "", username: "", email: "", validateEmail: false },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        console.log(action);
        state.validateEmail = action.payload.success;
      });
  },
});

export const signin = createAsyncThunk("user/signin", async (signinForm) => {
  try {
    const res = await axios.post("localhost:5000/api/", signinForm);
  } catch (error) {}
});

export const signup = createAsyncThunk("user/signup", async (signupForm) => {
  try {
    const res = await axios.post("localhost:5000/api/", signupForm);
  } catch (error) {}
});

export const checkEmail = createAsyncThunk("user/checkEmail", async (email) => {
  try {
    const res = await axios.post("http://localhost:5000/api/checkemail", {
      email,
    });
    console.log({ res });
    // const data = await res.json();
    // console.log({ data });
    return res.data;
  } catch (error) {}
});

export const validateEmailSelector = (state) => state.user.validateEmail;

export default userSlice;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      userId: "",
      username: "",
      email: "",
      birthday: null,
    },
    token: { accessToken: "", refreshToken: "" },
    validateEmail: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.token = action.payload?.token;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload?.token;
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        console.log(action);
        state.validateEmail = action.payload?.success;
      });
  },
});

export const signin = createAsyncThunk("user/signin", async (signinForm) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/signin",
      signinForm
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const signup = createAsyncThunk("user/signup", async (signupForm) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/signup",
      signupForm
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
});

export const validateEmailSelector = (state) => state.user.validateEmail;

export const userSelector = (state) => state.user.user;

export const tokenSelector = (state) => state.user.token;

export default userSlice;

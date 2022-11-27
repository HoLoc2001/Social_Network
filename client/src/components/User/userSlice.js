import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../../utils";

export const signin = createAsyncThunk("user/signin", async (signinForm) => {
  try {
    const res = await axiosPublic.post("signin", signinForm);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const signup = createAsyncThunk("user/signup", async (signupForm) => {
  try {
    const res = await axiosPublic.post("signup", signupForm);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (token) => {
    try {
      const res = await axiosPublic.post("refreshToken", token);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const checkEmail = createAsyncThunk("user/checkEmail", async (email) => {
  try {
    const res = await axiosPublic.post("checkEmail", {
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

export const getInfo = createAsyncThunk("user/getInfo", async () => {
  try {
    const res = await axiosPrivate.get("user");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      email: "",
      fullname: "",
      birthday: null,
      avatar: null,
      createdAt: null,
    },
    token: {
      accessToken: localStorage["AT"] || null,
      refreshToken: localStorage["RT"] || null,
    },
    validateEmail: false,
    isAuthenticated: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        console.log(action.payload);
        localStorage.setItem("AT", action.payload.token.accessToken);
        localStorage.setItem("RT", action.payload.token.refreshToken);
        state.isAuthenticated = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload?.token;
        if (state.token.accessToken) {
          state.isAuthenticated = true;
        }
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.validateEmail = action.payload?.success;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.user = action.payload?.user[0];
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export const validateEmailSelector = (state) => state.user.validateEmail;

export const userSelector = (state) => state.user.user;

export const tokenSelector = (state) => state.user.token;

export const isAuthenticatedSelector = (state) => state.user.isAuthenticated;
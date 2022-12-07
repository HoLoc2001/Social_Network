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

export const getOtherInfo = createAsyncThunk(
  "user/getOtherInfo",
  async (userId) => {
    try {
      const res = await axiosPrivate.post("user/getOtherInfo", { userId });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (avatar) => {
    try {
      console.log(avatar);
      const res = await axiosPrivate.patch("user/updateAvatar", { avatar });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getListFollower = createAsyncThunk(
  "user/getListFollower",
  async () => {
    try {
      const res = await axiosPrivate.post("user/getListFollower");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getNotFollower = createAsyncThunk(
  "user/getNotFollower",
  async () => {
    try {
      const res = await axiosPrivate.post("user/getNotFollower");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addFollower = createAsyncThunk(
  "user/addFollower",
  async (user) => {
    try {
      const res = await axiosPrivate.post("user/addFollower", { user });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
    otherUser: [],
    listFollower: [],
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
        localStorage.setItem("AT", action.payload.token.accessToken || "");
        localStorage.setItem("RT", action.payload.token.refreshToken || "");
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
      .addCase(getOtherInfo.fulfilled, (state, action) => {
        state.otherUser = action.payload?.user[0];
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user.avatar = action?.payload?.avatar?.avatar;
      })
      .addCase(getListFollower.fulfilled, (state, action) => {
        state.listFollower = action?.payload?.data;
      });
  },
});

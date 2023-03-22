import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const signin = createAsyncThunk(
  "user/signin",
  async (signinForm, thunkAPI) => {
    try {
      const res = await axiosPublic.post("auth/signin", signinForm);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const signUp = createAsyncThunk("user/signup", async (signupForm) => {
  try {
    const res = await axiosPublic.post("auth/signup", signupForm);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const sendMailPass = createAsyncThunk(
  "user/sendMailPass",
  async (email) => {
    try {
      console.log(email);
      const res = await axiosPublic.post("sendMailPass", { email });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
    const res = await axiosPublic.post("auth/checkEmail", {
      email,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const checkPass = createAsyncThunk("user/checkPass", async (pass) => {
  try {
    const res = await axiosPrivate.post("checkPass", {
      pass,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const updatePass = createAsyncThunk("user/updatePass", async (pass) => {
  try {
    const res = await axiosPrivate.post("updatePass", {
      pass,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
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
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const { avatar, fullname } = data;
    const res = await axiosPrivate.patch("user/updateUser", {
      avatar,
      fullname,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getListFollower = createAsyncThunk(
  "user/getListFollower",
  async () => {
    try {
      const res = await axiosPrivate.post("user/getListFollower");
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getListFollowing = createAsyncThunk(
  "user/getListFollowing",
  async (userId) => {
    try {
      const res = await axiosPrivate.post("user/getListFollowing", { userId });
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
  async (user, { getState }) => {
    try {
      const { listFollower } = getState().user;
      const res = await axiosPrivate.post("user/addFollower", { user });

      // const data = [...res?.data?.data];
      return {
        data: res?.data?.data,
        totalFollow: res?.data?.totalFollow[0],
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getListUserSearch = createAsyncThunk(
  "user/getListUserSearch",
  async (data) => {
    try {
      const res = await axiosPrivate.post("user/getListUserSearch", { data });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getListLike = createAsyncThunk(
  "user/getListLike",
  async (postId) => {
    try {
      const res = await axiosPrivate.post("user/getListLike", { postId });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    listUserSearch: [],
    otherUser: [],
    listFollower: [],
    listFollowing: [],
    notFollower: [],
    token: {
      accessToken: localStorage["AT"] || null,
      refreshToken: localStorage["RT"] || null,
    },
    validateEmail: false,
    isAuthenticated: null,
    isPassValue: null,
    isForgetPass: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        localStorage.setItem("AT", action.payload?.token?.accessToken || "");
        localStorage.setItem("RT", action.payload?.token?.refreshToken || "");
        state.isAuthenticated = action.payload.success;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isAuthenticated = action.payload.data.success;
      })
      .addCase(sendMailPass.fulfilled, (state, action) => {
        state.isForgetPass = action.payload.success;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.token = action.payload?.token;
        if (state.token.accessToken) {
          state.isAuthenticated = true;
        }
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.validateEmail = action.payload?.success;
      })
      .addCase(checkPass.fulfilled, (state, action) => {
        state.isPassValue = action.payload?.success;
      })
      .addCase(updatePass.fulfilled, (state, action) => {})
      .addCase(getInfo.fulfilled, (state, action) => {
        state.user = action.payload?.user;
      })
      .addCase(getOtherInfo.fulfilled, (state, action) => {
        state.otherUser = action.payload?.user || false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload?.user[0];
      })
      .addCase(getListFollower.fulfilled, (state, action) => {
        state.listFollower = action?.payload?.listFollower;
      })
      .addCase(getListFollowing.fulfilled, (state, action) => {
        state.listFollowing = action?.payload?.data;
      })
      .addCase(getNotFollower.fulfilled, (state, action) => {
        state.notFollower = action?.payload?.listNotFollower;
      })
      .addCase(addFollower.fulfilled, (state, action) => {
        state.listFollower = action?.payload.data;
        state.user.totalFollowing = action?.payload.totalFollow?.totalFollowing;
        state.otherUser.totalFollower =
          action?.payload.totalFollow?.totalFollower;
      })
      .addCase(getListUserSearch.fulfilled, (state, action) => {
        state.listUserSearch = action?.payload?.data;
      })
      .addCase(getListLike.fulfilled, (state, action) => {
        state.listLike = action?.payload?.data;
      });
  },
});

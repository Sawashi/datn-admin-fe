import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  email: string | null;
  username: string;
  password: string;
  imgUrl: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  status: string | null;
  role: string | null;
  isLogin: boolean | null;
}

const initialState: UserState = {
  id: 0,
  email: null,
  username: "",
  password: "",
  imgUrl: null,
  gender: null,
  dateOfBirth: null,
  createdAt: null,
  updatedAt: null,
  status: null,
  role: null,
  isLogin: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.imgUrl = action.payload.imgUrl;
      state.gender = action.payload.gender;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.status = action.payload.status;
      state.role = action.payload.role;
      state.isLogin = action.payload.isLogin;
    },
    clearUser: (state) => {
      state.id = 0;
      state.email = null;
      state.username = "";
      state.password = "";
      state.imgUrl = null;
      state.gender = null;
      state.dateOfBirth = null;
      state.createdAt = null;
      state.updatedAt = null;
      state.status = null;
      state.role = null;
      state.isLogin = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

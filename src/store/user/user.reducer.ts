import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type userResults = {
  accessToken: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  uid: string;
};
type tokenResponse = {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
};
export type HomePageContainerProps = {
  operationType: string;
  providerId?: string;
  user: userResults | null; // userResults veya null olabilir
  __tokenResponse: tokenResponse[];
};
export type photoProps = URL;

export type userInıtalState = {
  user: HomePageContainerProps;
  photoURLFile: any;
};
const initialState: userInıtalState = {
  user: {} as HomePageContainerProps,
  photoURLFile: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPhotoURL: (state, action) => {
      state.photoURLFile = action.payload;
    },
  },
});

export const { setUser, setPhotoURL } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectPhotoURL = (state: RootState) => state.user.photoURLFile;

export const userReducer = userSlice.reducer;

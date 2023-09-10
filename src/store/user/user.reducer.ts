import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type userResults = {
  accessToken: string;
  displayName?: string;
  email: string;
  photoURL?: string;
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

export type userInıtalState = {
  user: HomePageContainerProps;
};
const initialState: userInıtalState = {
  user: {} as HomePageContainerProps,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export const userReducer = userSlice.reducer;

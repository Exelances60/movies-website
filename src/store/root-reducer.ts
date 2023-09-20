import { combineReducers } from "redux";
import movieReducer from "./movieData/movie.reducer";
import { userReducer } from "./user/user.reducer";
import { dialogReducer } from "./dialog/dialog.reducer";
export const rootReducer = combineReducers({
  movie: movieReducer,
  user: userReducer,
  dialog: dialogReducer,
});

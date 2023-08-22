import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchPopularMovies = createAsyncThunk(
  "movie/fetchPopularMovies",
  async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjQ0YTFjMzJjZjdmZjBjMWYwNjkwZTVhMWFmZjE5YyIsInN1YiI6IjY0ZTBkMTQwYjc3ZDRiMTE0MjYwMmRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MRpaKOVBQfE0_w2v-pfcCaV1HwnqFcb4udc85yCyu7Q",
      },
    };

    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );
    return response?.json();
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    popularMovies: [{}],
  },
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popularMovies = action.payload;
    });
  },
});

export const { setPopularMovies } = movieSlice.actions;
export const selectPopularMovie = (state) => state.movie.popularMovies;

export default movieSlice.reducer;

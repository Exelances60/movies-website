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
export const fetchUpComingMovies = createAsyncThunk(
  "movie/fetchUpComingMovies",
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
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    );
    return response?.json();
  }
);

export const fetchMovieVideos = createAsyncThunk(
  "movie/fetchMovieVideos",
  async (id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjQ0YTFjMzJjZjdmZjBjMWYwNjkwZTVhMWFmZjE5YyIsInN1YiI6IjY0ZTBkMTQwYjc3ZDRiMTE0MjYwMmRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MRpaKOVBQfE0_w2v-pfcCaV1HwnqFcb4udc85yCyu7Q",
      },
    };

    const response = await fetch(
      ` https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    );
    return response?.json();
  }
);

export const popularTvShows = createAsyncThunk(
  "movie/popularTvShows",
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
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      options
    );
    return response?.json();
  }
);
export const clickMoviesDetails = createAsyncThunk(
  "movie/clickMoviesDetails",
  async (id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjQ0YTFjMzJjZjdmZjBjMWYwNjkwZTVhMWFmZjE5YyIsInN1YiI6IjY0ZTBkMTQwYjc3ZDRiMTE0MjYwMmRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MRpaKOVBQfE0_w2v-pfcCaV1HwnqFcb4udc85yCyu7Q",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    return response?.json();
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    popularMovies: [{}],
    upComingMovies: [{}],
    popularTvShows: [{}],
    clickShows: {},
    clickShowsVideos: {},
    clickMoviesDetails: {},
  },
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setClickShows: (state, action) => {
      state.clickShows = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popularMovies = action.payload;
    });
    builder.addCase(fetchUpComingMovies.fulfilled, (state, action) => {
      state.upComingMovies = action.payload;
    });
    builder.addCase(popularTvShows.fulfilled, (state, action) => {
      state.popularTvShows = action.payload;
    });
    builder.addCase(fetchMovieVideos.fulfilled, (state, action) => {
      state.clickShowsVideos = action.payload;
    });
    builder.addCase(clickMoviesDetails.fulfilled, (state, action) => {
      state.clickMoviesDetails = action.payload;
    });
  },
});

export const { setPopularMovies, setClickShows } = movieSlice.actions;
export const selectPopularMovie = (state) => state.movie.popularMovies;
export const selectUpComingMovie = (state) => state.movie.upComingMovies;
export const selectPopularTvShows = (state) => state.movie.popularTvShows;
export const selectClickShows = (state) => state.movie.clickShows;
export const selectClickShowsVideos = (state) => state.movie.clickShowsVideos;
export const selectClickMoviesDetails = (state) =>
  state.movie.clickMoviesDetails;

export default movieSlice.reducer;

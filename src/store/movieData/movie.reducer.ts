import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchPopularMovies = createAsyncThunk(
  "movie/fetchPopularMovies",
  async (): Promise<IpopularMovies> => {
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
  async (): Promise<IpopularMovies> => {
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
/* asdasdasd */
export const fetchMovieVideos = createAsyncThunk(
  "movie/fetchMovieVideos",
  async (id: number) => {
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
  async (): Promise<IpopularMovies> => {
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
  async (id: number) => {
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

export const fetchWithQuery = createAsyncThunk(
  "movie/fetchWithQuery",
  async (query: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjQ0YTFjMzJjZjdmZjBjMWYwNjkwZTVhMWFmZjE5YyIsInN1YiI6IjY0ZTBkMTQwYjc3ZDRiMTE0MjYwMmRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MRpaKOVBQfE0_w2v-pfcCaV1HwnqFcb4udc85yCyu7Q",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    );
    return response?.json();
  }
);

export type popularMoviesResults = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
export type IpopularMovies = {
  page: number;
  results: popularMoviesResults[];
  total_pages: number;
  total_results: number;
};
export type IClickMovieDetailsGenres = {
  id: number;
  name: string;
};

export type IClickMovieDetails = popularMoviesResults & {
  genres: IClickMovieDetailsGenres[];
};
export type IClickShowsResult = {
  backdrop_path: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export type IClickShowsVideos = {
  id: number;
  results: IClickShowsResult[];
};

export type MovieState = {
  popularMovies: IpopularMovies;
  movieWithQuery: IpopularMovies;
  upComingMovies: IpopularMovies;
  popularTvShows: IpopularMovies;
  clickShows: popularMoviesResults;
  clickShowsVideos: IClickShowsVideos;
  clickMoviesDetails: IClickMovieDetails;
};

const initialState: MovieState = {
  popularMovies: {} as IpopularMovies,
  movieWithQuery: {} as IpopularMovies,
  upComingMovies: {} as IpopularMovies,
  popularTvShows: {} as IpopularMovies,
  clickShows: {} as popularMoviesResults,
  clickShowsVideos: {} as IClickShowsVideos,
  clickMoviesDetails: {} as IClickMovieDetails,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setClickShows: (state, action) => {
      state.clickShows = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchPopularMovies.fulfilled,
      (state, action: PayloadAction<IpopularMovies>) => {
        state.popularMovies = action.payload;
      }
    );
    builder.addCase(
      fetchUpComingMovies.fulfilled,
      (state, action: PayloadAction<IpopularMovies>) => {
        state.upComingMovies = action.payload;
      }
    );
    builder.addCase(
      popularTvShows.fulfilled,
      (state, action: PayloadAction<IpopularMovies>) => {
        state.popularTvShows = action.payload;
      }
    );
    builder.addCase(fetchMovieVideos.fulfilled, (state, action) => {
      state.clickShowsVideos = action.payload;
    });
    builder.addCase(clickMoviesDetails.fulfilled, (state, action) => {
      state.clickMoviesDetails = action.payload;
    });
    builder.addCase(fetchWithQuery.fulfilled, (state, action) => {
      state.movieWithQuery = action.payload;
    });
  },
});

export const { setPopularMovies, setClickShows } = movieSlice.actions;
export const selectPopularMovie = (state: RootState) =>
  state.movie.popularMovies;
export const selectUpComingMovie = (state: RootState) =>
  state.movie.upComingMovies;
export const selectPopularTvShows = (state: RootState) =>
  state.movie.popularTvShows;
export const selectClickShows = (state: RootState) => state.movie.clickShows;
export const selectClickShowsVideos = (state: RootState) =>
  state.movie.clickShowsVideos;
export const selectClickMoviesDetails = (state: RootState) =>
  state.movie.clickMoviesDetails;
export const selectQueryMovie = (state: RootState) =>
  state.movie.movieWithQuery;

export default movieSlice.reducer;

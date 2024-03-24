import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";
export const fetchAsyncMovies = createAsyncThunk(
  `movies/fetchAsyncMovies`,
  async () => {
    const movieText = "Harry";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  `movies/fetchAsyncShows`,
  async () => {
    const seriesText = "Friends";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${seriesText}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowsDetail = createAsyncThunk(
  `movies/fetchAsyncMovieOrShowsDetail`,
  async (id) => {
    const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully!");
        return { ...state, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        console.log("Rejected!");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully!");
        return { ...state, shows: payload };
      })
      .addCase(fetchAsyncMovieOrShowsDetail.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully!");
        return { ...state, selectMovieOrShow: payload };
      });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;

export default movieSlice.reducer;

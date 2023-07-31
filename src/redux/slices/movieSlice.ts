import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  castMember,
  genre,
  getByIdParams,
  movie,
  searchParams,
  tvShow,
  video,
} from "../../model/main.model";
import {
  GetList,
  getById,
  getCast,
  getGenres,
  getVideos,
} from "../../axios/apis";

export interface moviesState {
  movies: movie[];
  tvshows: tvShow[];
  singleMovie: movie;
  singleShow: tvShow;
  cast: castMember[];
  genres: genre[];
  hasMore: boolean;
}

const initialState = {
  isSearch: false,
  movies: [],
  tvshows: [],
  hasMore: true,
  singleMovie: {
    id: -1,
    overview: "",
    poster_path: "",
    backdrop_path: "",
    release_date: "",
    title: "",
    genres: [],
    production_companies: [],
    budget: 0,
    revenue: 0,
  },
  singleShow: {
    first_air_date: "",
    id: -1,
    name: "",
    overview: "",
    poster_path: "",
    backdrop_path: "",
    number_of_seasons: 0,
    genres: [],
    production_companies: [],
  },
  cast: [],
  trailer: {
    id: "",
    key: "",
    name: "",
  },
  genres: [],
} as moviesState;

export const fetchList = createAsyncThunk(
  "moviestv/list",
  async (params: searchParams) => {
    const response = await GetList(params);
    return response;
  }
);
export const fetchById = createAsyncThunk(
  "movie/id",
  async (params: getByIdParams) => {
    const response = await getById(params);
    return response;
  }
);
export const fetchCast = createAsyncThunk(
  "movies/cast",
  async (params: getByIdParams) => {
    const response = await getCast(params);
    return response;
  }
);
export const fetchGenres = createAsyncThunk(
  "movies/genres",
  async (type: string) => {
    const response = await getGenres(type);
    return response;
  }
);
const movieSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    reset: (state: moviesState) => {
      state.movies = [];
      state.tvshows = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchList.fulfilled, (state: moviesState, action) => {
      const args = action.meta.arg;
      if (args.isSearch) {
        if (args.type === "movie") state.movies = action.payload.results;
        else state.tvshows = action.payload.results;
      } else {
        if (args.type === "movie") state.movies.push(...action.payload.results);
        else state.tvshows.push(...action.payload.results);
      }
      if (
        (args.type === "movie" &&
          state.movies &&
          state.movies.length === action.payload.total_results) ||
        (args.type === "tv" &&
          state.tvshows &&
          state.tvshows.length === action.payload.total_results)
      )
        state.hasMore = false;
    });
    builder.addCase(fetchById.fulfilled, (state: moviesState, action) => {
      const args = action.meta.arg;
      if (args.type === "movie") state.singleMovie = action.payload;
      else state.singleShow = action.payload;
    });
    builder.addCase(fetchCast.fulfilled, (state: moviesState, action) => {
      state.cast = action.payload.cast;
    });
    builder.addCase(fetchGenres.fulfilled, (state: moviesState, action) => {
      state.genres = action.payload.genres;
    });
  },
});

export const movieReducer = movieSlice.reducer;
export const { reset } = movieSlice.actions;

import React, { useEffect } from "react";
import { APIKey } from "../../common/apis/MovieApiKey";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/moviesSlice";
import MovieListing from "../MovieListing/MovieListing";

const Home = () => {
  const dispatch = useDispatch();
  const movieText = "Harry";
  const showText = "Friends";
  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncShows());
  }, [dispatch]);
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;

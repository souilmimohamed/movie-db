import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { types } from "../model/enums";
import "../moviedetails.css";
import { imgApi } from "../constants";
import { fetchById, fetchCast } from "../redux/slices";
import CastMemberCard from "./castMemeberCard";
import ProdCompany from "./productionCompany";
const MoviesDetails = () => {
  type MovieParams = {
    id: string;
  };
  const { id } = useParams<MovieParams>();
  const movie = useSelector((state: RootState) => state.movies.singleMovie);
  const cast = useSelector((state: RootState) => state.movies.cast);
  const dispatch = useDispatch<AppDispatch>();
  const type = useSelector((state: RootState) => state.utils.type);
  const castListRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (castListRef.current) {
      castListRef.current.scrollBy({
        left: -200, // Adjust the scrolling amount as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (castListRef.current) {
      castListRef.current.scrollBy({
        left: 200, // Adjust the scrolling amount as needed
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const _type = type === types.movie ? "movie" : "tv";
    dispatch(fetchById({ id: parseInt(id!), type: _type }));
    dispatch(fetchCast({ id: parseInt(id!), type: _type }));
  }, [id]);
  return (
    <>
      <div
        className="movie-details"
        style={{ backgroundImage: `url(${imgApi}${movie.backdrop_path})` }}
      >
        <div className="overlay"></div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p className="release-date">Release Date: {movie.release_date}</p>
          <div className="genres-list">
            <p className="genres-label">Genres:</p>
            <ul className="genres">
              {movie?.genres?.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))}
            </ul>
          </div>
          <span>Budget: {movie.budget.toLocaleString("en-US")}$</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>Revenue: {movie.revenue.toLocaleString("en-US")}$</span>
          <p className="cast-title">CAST</p>
          <div className="cast-list" ref={castListRef}>
            {cast?.map((member, key) => (
              <CastMemberCard member={member} key={key} />
            ))}
          </div>
          <div className="scroll-buttons">
            <button onClick={scrollLeft}>{"<<"}</button>
            <button onClick={scrollRight}>{">>"}</button>
          </div>
        </div>
        <div className="production-companies-list">
          <ul className="companies">
            {movie?.production_companies?.map((company, key) => (
              <ProdCompany company={company} key={key} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MoviesDetails;

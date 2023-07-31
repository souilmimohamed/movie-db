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
const ShowDetails = () => {
  type ShowParams = {
    id: string;
  };
  const { id } = useParams<ShowParams>();
  const show = useSelector((state: RootState) => state.movies.singleShow);
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
    dispatch(fetchById({ id: parseInt(id!), type: "tv" }));
    dispatch(fetchCast({ id: parseInt(id!), type: "tv" }));
  }, [id]);
  return (
    <div
      className="movie-details"
      style={{ backgroundImage: `url(${imgApi}${show.backdrop_path})` }}
    >
      <div className="overlay"></div>
      <div className="movie-info">
        <h1>{show.name}</h1>
        <p>{show.overview}</p>
        <p className="release-date">First air Date: {show.first_air_date}</p>
        <p className="release-date">Saisons: {show.number_of_seasons}</p>
        <div className="genres-list">
          <p className="genres-label">Genres:</p>
          <ul className="genres">
            {show?.genres?.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
          </ul>
        </div>
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
          {show?.production_companies?.map((company, key) => (
            <ProdCompany company={company} key={key} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowDetails;

import React, { FC } from "react";
import { movie } from "../model/main.model";
import { imgApi } from "../constants";
interface movieCardProps {
  movie: movie;
}
const MovieCard: FC<movieCardProps> = ({ movie }) => {
  const truncatedTitle =
    movie.title.length > 15 ? movie.title.slice(0, 15) + "..." : movie.title;
  const formattedDate = movie.release_date || "No release date";
  const imagePath = movie.poster_path
    ? imgApi + movie.poster_path
    : "./img-01.jpeg";
  return (
    <div className="column">
      <div className="card">
        <a className="card-media" href="./img-01.jpeg">
          <img src={imagePath} alt={movie.title} width="100%" />
        </a>
        <div className="card-content">
          <div className="card-header">
            <div className="left-content">
              <h3 style={{ fontWeight: 600 }}>{truncatedTitle}</h3>
              <span style={{ color: "#12efec" }}>released {formattedDate}</span>
            </div>
            <div className="right-content">
              <a href={`movie/${movie.id}`} className="card-btn">
                See Details
              </a>
            </div>
          </div>
          <div className="info">{movie.overview || "No overview yet..."}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

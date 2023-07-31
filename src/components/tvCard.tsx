import React, { FC } from "react";
import { tvShow } from "../model/main.model";
import { imgApi } from "../constants";
interface movieCardProps {
  tvshow: tvShow;
}
const TvCard: FC<movieCardProps> = ({ tvshow }) => {
  const truncatedTitle =
    tvshow.name.length > 15 ? tvshow.name.slice(0, 15) + "..." : tvshow.name;
  const formattedDate = tvshow.first_air_date || "No release date";
  const imagePath = tvshow.poster_path
    ? imgApi + tvshow.poster_path
    : "./img-01.jpeg";
  return (
    <div className="column">
      <div className="card">
        <a className="card-media" href="./img-01.jpeg">
          <img src={imagePath} alt={tvshow.name} width="100%" />
        </a>
        <div className="card-content">
          <div className="card-header">
            <div className="left-content">
              <h3 style={{ fontWeight: 600 }}>{truncatedTitle}</h3>
              <span style={{ color: "#12efec" }}>
                first aired {formattedDate}
              </span>
            </div>
            <div className="right-content">
              <a href={`show/${tvshow.id}`} className="card-btn">
                See Details
              </a>
            </div>
          </div>
          <div className="info">{tvshow.overview || "No overview yet..."}</div>
        </div>
      </div>
    </div>
  );
};

export default TvCard;

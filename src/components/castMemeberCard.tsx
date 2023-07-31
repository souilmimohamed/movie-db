import React, { FC } from "react";
import { castMember } from "../model/main.model";
import { imgApi } from "../constants";
interface castMemeberPrpo {
  member: castMember;
}

const CastMemberCard: FC<castMemeberPrpo> = ({ member }) => {
  return (
    <div className="cast-member">
      {member.profile_path ? (
        <img
          className="cast-image"
          src={`${imgApi}${member.profile_path}`}
          alt=""
        />
      ) : (
        <img className="cast-image" src={`/placeholder.jpg`} alt="" />
      )}

      <div className="cast-name">{member.name}</div>
      <div className="cast-character">{member.character}</div>
    </div>
  );
};

export default CastMemberCard;

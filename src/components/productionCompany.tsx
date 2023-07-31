import React, { FC } from "react";
import { productionCompany } from "../model/main.model";
import { imgApi } from "../constants";
interface prodCompanyprop {
  company: productionCompany;
}
const ProdCompany: FC<prodCompanyprop> = ({ company }) => {
  return (
    <li className="company">
      {company.logo_path ? (
        <img
          className="company-logo"
          src={`${imgApi}${company.logo_path}`}
          alt={company.name}
        />
      ) : (
        <>
          <img
            className="company-logo"
            src={`/nologo.png`}
            alt={company.name}
          />
          <p className="company-name">{company.name}</p>
        </>
      )}
    </li>
  );
};

export default ProdCompany;

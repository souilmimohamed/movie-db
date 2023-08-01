export interface movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  release_date: string;
  overview: string;
  genres: genre[];
  production_companies: productionCompany[];
  budget: number;
  revenue: number;
  runtime: number;
}

export interface tvShow {
  id: number;
  poster_path: string;
  backdrop_path: string;
  name: string;
  first_air_date: string;
  overview: string;
  number_of_seasons: number;
  genres: genre[];
  production_companies: productionCompany[];
}
export interface searchParams {
  isSearch: boolean;
  searchText: string;
  page: number;
  type: string;
  genres: number[];
}

export interface castMember {
  name: string;
  character: string;
  profile_path: string;
  job: string;
}

export interface genre {
  id: number;
  name: string;
}
export interface productionCompany {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface getByIdParams {
  type: string;
  id: number;
}

export interface video {
  id: string;
  name: string;
  key: string;
}

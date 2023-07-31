import axios from "axios";
import { getByIdParams, searchParams } from "../model/main.model";
import { apiKey } from "../constants";

export const GetList = async (params: searchParams) => {
  try {
    const _genres =
      params && params.genres && params.genres.length > 0
        ? `?with_genres=${params.genres.join("|")}&`
        : `?`;
    const url =
      params && params.searchText
        ? `https://api.themoviedb.org/3/search/${params.type}${_genres}api_key=${apiKey}&query=${params.searchText}&page=${params.page}`
        : `https://api.themoviedb.org/3/discover/${params.type}${_genres}sort_by=popularity.desc&api_key=${apiKey}&page=${params.page}`;
    const { data: response } = await axios.get(url);
    return response;
  } catch (error: any) {
    console.log(`error:${error.message}`);
  }
};

export const getById = async (params: getByIdParams) => {
  try {
    const { data: response } = await axios.get(
      `https://api.themoviedb.org/3/${params.type}/${params.id}?api_key=${apiKey}`
    );
    return response;
  } catch (error: any) {
    console.log(`error:${error.message}`);
  }
};

export const getCast = async (params: getByIdParams) => {
  try {
    const { data: response } = await axios.get(
      `https://api.themoviedb.org/3/${params.type}/${params.id}/credits?api_key=${apiKey}`
    );
    return response;
  } catch (error: any) {
    console.log(`error:${error.message}`);
  }
};

export const getVideos = async (params: getByIdParams) => {
  try {
    const { data: response } = await axios.get(
      `https://api.themoviedb.org/3/${params.type}/${params.id}/videos?api_key=${apiKey}`
    );
    return response;
  } catch (error: any) {
    console.log(`error:${error.message}`);
  }
};

export const getGenres = async (type: string) => {
  try {
    const { data: response } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}`
    );
    return response;
  } catch (error: any) {
    console.log(`error:${error.message}`);
  }
};

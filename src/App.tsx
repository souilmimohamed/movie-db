import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { genre, movie, searchParams, tvShow } from "./model/main.model";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useDispatch } from "react-redux";
import {
  fetchGenres,
  fetchList,
  reset,
  setIsLoading,
  switchType,
} from "./redux/slices";
import MovieCard from "./components/movieCard";
import Loader from "./components/loader";
import { types } from "./model/enums";
import TvCard from "./components/tvCard";
import Chip from "./components/chip";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [serachParams, setSearchParams] = useState<searchParams>({
    page: 1,
    searchText: "",
    isSearch: false,
    type: "movie",
    genres: [],
  });
  const [selectedGenres, setSeletedGenres] = useState<genre[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const isLoading = useSelector((state: RootState) => state.utils.isLoading);
  const hasMore = useSelector((state: RootState) => state.movies.hasMore);
  const movies = useSelector((state: RootState) => state.movies.movies);
  const tvshows = useSelector((state: RootState) => state.movies.tvshows);
  const type = useSelector((state: RootState) => state.utils.type);
  const genres = useSelector((state: RootState) => state.movies.genres);
  useEffect(() => {
    const _type = type === types.movie ? "movie" : "tv";
    dispatch(setIsLoading(true));
    dispatch(fetchList({ ...serachParams, type: _type }));
    dispatch(fetchGenres(_type));
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 1000);
  }, [serachParams, type]);
  useEffect(() => {
    setSearchParams({
      ...serachParams,
      isSearch: true,
      page: 1,
      genres: selectedGenres.map((g) => g.id),
    });
  }, [selectedGenres]);

  const handleSubmit = () => {
    const _type = type === types.movie ? "movie" : "tv";
    dispatch(
      fetchList({
        ...serachParams,
        searchText: inputRef.current?.value || "",
        page: 1,
        isSearch: true,
        type: _type,
      })
    );
  };
  const switchBetweenTypes = (type: types) => {
    setSearchParams({ ...serachParams, page: 1, searchText: "" });
    dispatch(reset());
    dispatch(switchType(type));
  };
  const renderType = () => {
    if (type === types.movie)
      return movies?.map((movie: movie, key: any) => (
        <MovieCard movie={movie} key={key} />
      ));
    else
      return tvshows?.map((show: tvShow, key: any) => (
        <TvCard tvshow={show} key={key} />
      ));
  };
  const handleGenreSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const _selected = genres?.filter((item) => item.id === parseInt(value))[0];
    if (!selectedGenres.includes(_selected)) {
      setSeletedGenres([...selectedGenres, _selected]);
    }
  };
  const removeGenre = (item: genre) => {
    setSeletedGenres((current) =>
      current.filter((element) => {
        return element.id !== item.id;
      })
    );
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="container">
        <div className="search-box">
          <a href="#">
            <h1>MoviesDB App</h1>
          </a>
          <span>select one or more genres</span>
          <select
            className="genre-select"
            onChange={handleGenreSelect}
            value={-1}
          >
            <option value={-1} disabled></option>
            {genres?.map((genre, key) => (
              <option key={key} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <div className="type">
            <button
              onClick={() => switchBetweenTypes(types.movie)}
              className={type === types.movie ? "selected" : ""}
            >
              movies
            </button>
            <button
              onClick={() => switchBetweenTypes(types.tv)}
              className={type === types.tv ? "selected" : ""}
            >
              tv shows
            </button>
          </div>
          <div className="form">
            <input type="text" placeholder="search movies ..." ref={inputRef} />
            <button className="search-btn" onClick={() => handleSubmit()}>
              Search
            </button>
          </div>
        </div>
        <div className="seleted-genres">
          {selectedGenres?.map((item, key) => (
            <Chip title={item.name} key={key} close={() => removeGenre(item)} />
          ))}
        </div>

        <InfiniteScroll
          dataLength={type === types.movie ? movies.length : tvshows.length}
          next={() =>
            setSearchParams({
              ...serachParams,
              isSearch: false,
              page: serachParams.page + 1,
            })
          }
          hasMore={hasMore}
          loader={undefined}
        >
          <div className="result">{renderType()}</div>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default App;

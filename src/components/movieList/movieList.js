import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [type, searchQuery]);

  const getData = () => {
    let apiUrl = `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
    if (searchQuery) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${searchQuery}`;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setMovieList(data.results || []))
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        setMovieList([]);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query.trim() !== "") {
      setMovieList([]);
      navigate(`/movies/search?q=${query}`);
    }
  };

  return (
    <div className="movie__list">
        <div className="search__form">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search movies"
            className="search__input"
          />
          <button type="submit" className="search__button">
            Search
          </button>
        </form>
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      </div>
      <div className="list__cards">
        {movieList.map((movie) => (
          <Cards movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;

import React, { useContext } from "react";
import { WatchedMovieContext } from "../context/WatchedMovieContext";

export const Movie = ({ movie }) => {
  const { handleClick } = useContext(WatchedMovieContext);

  return (
    <li onClick={() => handleClick(movie?.imdbID)} key={movie?.imdbID}>
      <img src={movie?.Poster} alt={`${movie?.Title} poster`} />
      <h3>{movie?.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie?.Year}</span>
        </p>
      </div>
    </li>
  );
};

import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContextComponent";
import { Movie } from "./Movie";

export const MovieList = () => {
  const { movies } = useContext(MovieContext);
  return (
    <ul className="list list-movies">
      {movies[0]?.map((movie) => (
        <Movie movie={movie} />
      ))}
    </ul>
  );
};

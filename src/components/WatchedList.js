import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContextComponent";
import { WatchedMovieContext } from "../context/WatchedMovieContext";
import { WatchedMovie } from "./WatchedMovie";

export const WatchedList = () => {
  const { watched } = useContext(WatchedMovieContext);
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <WatchedMovie movie={movie} />
      ))}
    </ul>
  );
};

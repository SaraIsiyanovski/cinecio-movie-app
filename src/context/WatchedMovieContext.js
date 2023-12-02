import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { MovieContext } from "./MovieContextComponent";

export const WatchedMovieContext = createContext(null);

export const WatchedMovieContextComponent = ({ children }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [movieDet, setMovieDet] = useState({});

  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleClick = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    console.log(id, "id");
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  };

  const value = {
    watched,
    setWatched,
    selectedId,
    setSelectedId,
    handleClick,
    handleClose,
    movieDet,
    setMovieDet,
    handleAddWatched,
    handleDeleteWatched,
  };
  return (
    <WatchedMovieContext.Provider value={value}>
      {children}
    </WatchedMovieContext.Provider>
  );
};

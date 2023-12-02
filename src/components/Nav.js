import React, { useContext, useEffect, useRef, useState } from "react";
import { MovieContext } from "../context/MovieContextComponent";
import { WatchedMovieContext } from "../context/WatchedMovieContext";
import { useKey } from "../hooks/useKey";

export const Nav = () => {
  const { movies, query, setQuery } = useContext(MovieContext);
  const { handleClose } = useContext(WatchedMovieContext);
  const inputEl = useRef(null);

  useKey(function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
    handleClose();
  }, "Enter");

  return (
    <nav className="nav-bar">
      <div className="logo">
        <h1>CINECIO</h1>
      </div>
      <input
        ref={inputEl}
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
};

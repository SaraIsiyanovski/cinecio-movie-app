import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { WatchedMovieContext } from "./WatchedMovieContext";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const MovieContext = createContext(null);

export const MovieContextComponent = ({ children }) => {
  const { handleClose } = useContext(WatchedMovieContext);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const KEY = "ce7aabfa";
  const url = `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`;

  useEffect(() => {
    const controler = new AbortController();
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const axios1 = await axios.get(url, { signal: controler.signal });

        if (axios1.status !== 200) throw new Error("Something went wrong!");

        if (axios1.data.Response === "False")
          throw new Error("Movie not found!");

        setMovies([axios1.data.Search]);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleClose();
    getMovies();

    return function () {
      controler.abort();
    };
  }, [query]);

  const value = {
    movies,
    setMovies,
    average,
    query,
    setQuery,
    isLoading,
    error,
    KEY,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

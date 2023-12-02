import "./style.css";
import { Nav } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/MovieList";
import { WatchedSummary } from "./components/WatchedSummary";
import { List, WatchedList } from "./components/WatchedList";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "./context/MovieContextComponent";
import { WatchedMovieContext } from "./context/WatchedMovieContext";
import axios from "axios";
import { StarRating } from "./components/StarRating";
import { MovieDetail } from "./components/MovieDetail";

export default function App() {
  const { isLoading, error } = useContext(MovieContext);
  const { selectedId } = useContext(WatchedMovieContext);
  console.log(error);
  return (
    <>
      <Nav />

      <main className="main">
        <Box>
          {!error && !isLoading && <MovieList />}
          {error && <ErrorMessage />}
          {!error && isLoading && <Loader />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail />
          ) : (
            <>
              <WatchedSummary />
              <WatchedList />
            </>
          )}
        </Box>
      </main>
    </>
  );
}

export function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage() {
  const { error } = useContext(MovieContext);
  return <p className="error">{error}</p>;
}

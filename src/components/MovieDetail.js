import React, { useContext, useEffect, useRef, useState } from "react";
import { Loader } from "../App";
import { MovieContext } from "../context/MovieContextComponent";
import { WatchedMovieContext } from "../context/WatchedMovieContext";
import { useKey } from "../hooks/useKey";
import { StarRating } from "./StarRating";

export const MovieDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  const {
    selectedId,
    handleClose,
    setMovieDet,
    movieDet,
    handleAddWatched,
    watched,
  } = useContext(WatchedMovieContext);
  const { KEY } = useContext(MovieContext);

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    actors: actors,
    Director: director,
    Genre: genre,
  } = movieDet;

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  useEffect(() => {
    const url = `http://www.omdbapi.com/?&apikey=${KEY}&i=${selectedId}`;
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);

        const data = await res.json();
        setMovieDet(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "CINECIO";
    };
  }, [title]);

  useKey(handleClose, "Escape");

  const handleAdd = () => {
    const newMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      couuntRatingDecisions: countRef.current,
    };
    handleAddWatched(newMovie);
    handleClose();
  };

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movieDet} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button onClick={() => handleAdd()} className="btn-add">
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

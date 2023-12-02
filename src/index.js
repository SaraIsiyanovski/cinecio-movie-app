import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StarRating } from "./components/StarRating";
import { MovieContextComponent } from "./context/MovieContextComponent";
import {
  WatchedMovieContext,
  WatchedMovieContextComponent,
} from "./context/WatchedMovieContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WatchedMovieContextComponent>
      <MovieContextComponent>
        <App />
      </MovieContextComponent>
    </WatchedMovieContextComponent>
  </React.StrictMode>
);

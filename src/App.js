import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";

import MovieHeader from "./components/MovieHeader";

import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";
import EditMovieForm from "./components/EditMovieForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddMovieForm from "./components/AddMovieForm";
import useAxios, { REQ_TYPES } from "./hooks/useAksios";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { push } = useHistory();
  const [getMovies] = useAxios();
  const [deleteMovieWithId] = useAxios();

  useEffect(() => {
    getMovies({
      endpoint: `/api/movies`,
      reqType: REQ_TYPES.GET,
    }).then((res) => {
      setMovies(res);
    });
  }, []);

  const deleteMovie = (id) => {
    deleteMovieWithId({
      endpoint: `/api/movies/${id}`,
      reqType: REQ_TYPES.DELETE,
    }).then((res) => {
      setMovies(res);
      push("/movies");
    });
  };

  const addToFavorites = (movie) => {};

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;

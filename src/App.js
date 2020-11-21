
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToFavourites from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=e5805ab9`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];

    setFavourites(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourites) => favourites.imdbID !== movie.imdbID);
    
    setFavourites(newFavouriteList);
  }

  useEffect(() => {
    getMovieRequest();
  }, [searchValue]);

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading = 'Movies'/>
        <SearchBox searchValue = {searchValue} setSearchValue = {setSearchValue}/>
      </div>
      <div className="row">
        <MovieList movies={movies} favouriteComponent={AddToFavourites} handleFavouritesClick={ addFavouriteMovie }></MovieList>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading = 'Favourites'/>
      </div>
      <div className="row">
        <MovieList movies={favourites} favouriteComponent={AddToFavourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent={RemoveFavourites} ></MovieList>
      </div>
      
    </div>
  )
}

export default App;
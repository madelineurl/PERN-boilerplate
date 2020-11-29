/* eslint-disable no-console */
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../secrets";

const Search = () => {
  const [entry, setEntry] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [msg, setMsg] = useState('');

  // when component mounts, fetch previous search data from local storage if present
  // instead of showing blank search page
  useEffect(() => {
    const lastSearch = JSON.parse(localStorage.getItem('searchData'));
    if (lastSearch) setSearchData(lastSearch);
  }, []);

  const handleChange = (evt) => {
    setEntry(evt.target.value);
  };

  const handleSearch = async (searchVal) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
        params: {s: searchVal, page: '1', r: 'json'},
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
        }
      };
      const response = await axios.request(options);
      localStorage.removeItem('searchData');

      if (response.data.Response === 'True') {
        setSearchData(response.data.Search);
        localStorage.setItem('searchData', JSON.stringify(response.data.Search));
      } else {
        setSearchData([]);
        setMsg(response.data.Error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form method="GET" >
        <input
          type="text"
          name="search"
          onChange={handleChange}
          className="search"
          value={entry}
          onKeyPress={
            (evt) => {
              if (evt.key === 'Enter') {
                evt.preventDefault();
                handleSearch(entry);
              }
            }
          }
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => { handleSearch(entry); }}
         >
            Search
        </button>
      </form>
      <hr/>
      <ul className="list-unstyled movie-listing">
        {
          searchData.length ? (
            searchData.map(movie => (
              <li key={movie.imdbID} className='card'>
                <div className='card-body'>
                  <Link className='link' to={`/movies/${movie.imdbID}`}>
                    <img
                      className='card-img-top'
                      src={movie.Poster}
                      alt={`${movie.Title} poster`} />
                    <h4 className='card-title'>
                      {movie.Title}
                    </h4>
                    <h5 className='card-subtitle mb-2 text-muted'>{movie.Year}</h5>
                </Link>
                </div>
              </li>
            ))
          ) : <div>{msg}</div>
        }
        </ul>
    </>
  );
};

export default Search;

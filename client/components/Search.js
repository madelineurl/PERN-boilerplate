import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../secrets";

const Search = () => {
  const [entry, setEntry] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [msg, setMsg] = useState('');

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
      if (response.data.Response === 'True') {
        setSearchData(response.data.Search);
        //localStorage.setItem();
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
          onKeyPress={
            (evt) => {
              evt.preventDefault();
              if (evt.key === 'Enter') handleSearch(entry);
            }
          }
        />
        <button
          type="button"
          onClick={() => { handleSearch(entry); }}
         >
            Search
        </button>
      </form>
      <ul className="list-unstyled">
        {
          searchData.length ? (
            searchData.map(movie => (
              <Link key={movie.imdbID} to={`/movies/${movie.imdbID}`}>
                <li className='col-3'>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <div>{movie.Title}</div>
                </li>
              </Link>
            ))
          ) : <div>{msg}</div>
        }
        </ul>
    </>
  )
}

export default Search;

import axios from "axios";

const state = {
  searchData: [],
  msg: '',
  singleMovie: {
    Title: '',
    Year: '',
    Director: '',
    Plot: '',
    Poster: ''
  }
};

const searchMovies = async (evt) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
      params: {s: evt.target.value, page: '1', r: 'json'},
      headers: {
        'x-rapidapi-key': '5f3c7b77bbmsh4c423dfece25eebp1257ebjsnb0b535b2cc4e',
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    console.log(response.data);
    if (response.data.Response === 'True') {
      state.searchData = response.data.Search;
    } else {
      state.searchData = [];
      state.msg = response.data.Error;
      console.log(state.msg)
    }
  } catch (err) {
    console.error(err);
  }
}

async function fetchSingleMovie() {
  try {
    //const id = this.props.match.params.id;
    const options = {
      method: 'GET',
      url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
      params: {i: 'Superman', r: 'json'},
      headers: {
        'x-rapidapi-key': '5f3c7b77bbmsh4c423dfece25eebp1257ebjsnb0b535b2cc4e',
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    console.log(response.data);
    // const { Title, Year, Director, Plot, Poster } = response.data;
    // this.setState({
    //   Title, Year, Director, Plot, Poster
    // })
  } catch (err) {
    console.error(err);
  }
}

const searchButton = document.getElementById('search');
searchButton.addEventListener('click', searchMovies);

const movies = document.getElementById('movie-listing');

if (state.searchData.length) {
  state.searchData.forEach(movie => {
    const movieListing = document.createElement('li');
    const html = `
      <a href=${`/movies/${movie.imdbID}`}>
        <img src=${movie.Poster} alt=${movie.Title} poster />
        <div>{movie.Title}</div>
      </a>
    `;
    movieListing.innerHTML = html;
    movies.appendChild(movieListing);
  });
} else {
  const notFound = document.createElement('div');
  notFound.innerHTML = state.msg;
  movies.appendChild(notFound);
}

//   render() {
//     const { Title, Year, Director, Plot, Poster } = this.state;
//     return (
//       <Layout>
//         <div>{Title}</div>
//         <div>{Year}</div>
//         <div>{Director}</div>
//         <div>{Plot}</div>
//         <img src={Poster} alt={`${Title} poster`} />
//         <i className="glyphicon glyphicon-thumbs-up"></i>
//         <i className="glyphicon glyphicon-thumbs-down"></i>
//         <Link to='/'>Back to movies</Link>
//       </Layout>
//     )
//   }
// }



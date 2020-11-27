import React, { Component } from "react"
import { Link } from "react-router-dom"
import Layout from "./Layout"
import axios from "axios"

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      Title: '',
      Year: '',
      Director: '',
      Plot: '',
      Poster: ''
    }
  }
  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const options = {
        method: 'GET',
        url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
        params: {i: id, r: 'json'},
        headers: {
          'x-rapidapi-key': '5f3c7b77bbmsh4c423dfece25eebp1257ebjsnb0b535b2cc4e',
          'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
        }
      };
      const response = await axios.request(options)
      console.log(response.data)
      const { Title, Year, Director, Plot, Poster } = response.data;
      this.setState({
        Title, Year, Director, Plot, Poster
      })
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { Title, Year, Director, Plot, Poster } = this.state;
    return (
      <Layout>
        <div>{Title}</div>
        <div>{Year}</div>
        <div>{Director}</div>
        <div>{Plot}</div>
        <img src={Poster} alt={`${Title} poster`} />
        <i className="glyphicon glyphicon-thumbs-up"></i>
        <i className="glyphicon glyphicon-thumbs-down"></i>
        <Link to='/'>Back to movies</Link>
      </Layout>
    )
  }
}

export default MovieDetails;

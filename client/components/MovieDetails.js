/* eslint-disable no-console */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      Title: '',
      Year: '',
      Director: '',
      Plot: '',
      Poster: ''
    };
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
      const response = await axios.request(options);
      const { Title, Year, Director, Plot, Poster } = response.data;
      this.setState({ Title, Year, Director, Plot, Poster });
    } catch (err) {
      console.error(err);
    }
  }

  upvoteMovie = async () => {
    try {
      let title = this.state.Title;
      //title = title.toLowerCase().replace(' ', '-');
      await axios.post(`/movies/${title}/upvote`);
    } catch (err) {
      console.error(err);
    }
  }

  downvoteMovie = async () => {
    try {
      let title = this.state.Title;
      //title = title.toLowerCase().replace(' ', '-');
      await axios.post(`/movies/${title}/downvote`);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { Title, Year, Director, Plot, Poster } = this.state;
    return (
      <Layout>
        <h2>{Title} ({Year})</h2>
        <h4>Directed by {Director}</h4>
        <img src={Poster} alt={`${Title} poster`} />
        <i
          className="glyphicon glyphicon-thumbs-up"
          onClick={this.upvoteMovie}
        />
        <i
          className="glyphicon glyphicon-thumbs-down"
          onClick={this.downvoteMovie}
        />
         <div>{Plot}</div>
        <Link to='/'>Back to movies</Link>
      </Layout>
    );
  }
}

export default MovieDetails;

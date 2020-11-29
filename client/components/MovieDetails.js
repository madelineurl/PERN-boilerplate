/* eslint-disable no-console */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import "../../secrets";

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      Title: '',
      Year: '',
      Director: '',
      Plot: '',
      Poster: '',
      upvotes: 0,
      downvotes: 0
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
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
        }
      };
      const { data } = await axios.request(options);
      const { Title, Year, Director, Plot, Poster } = data;
      const dbResponse = await axios.get(`/movies/${Title}/data`);

      let upvotes, downvotes;
      // if the movie hasn't been voted on, set votes to zero
      if (!dbResponse.data.upvotes) {
        upvotes = 0;
        downvotes = 0;
      } else {
        // if the movie exists in DB (has votes), set state votes to response data
        upvotes = dbResponse.data.upvotes;
        downvotes = dbResponse.data.downvotes;
      }

      this.setState({ Title, Year, Director, Plot, Poster, upvotes, downvotes });
    } catch (err) {
      console.error(err);
    }
  }

  upvoteMovie = async () => {
    try {
      let title = this.state.Title;
      await axios.post(`/movies/${title}/upvote`);
      const upvotes = this.state.upvotes + 1;
      this.setState({ upvotes });
    } catch (err) {
      console.error(err);
    }
  }

  downvoteMovie = async () => {
    try {
      let title = this.state.Title;
      await axios.post(`/movies/${title}/downvote`);
      const downvotes = this.state.downvotes + 1;
      this.setState({ downvotes });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      Title, Year, Director, Plot, Poster, upvotes, downvotes
    } = this.state;

    return (
      <Layout>
        <h2>{Title} ({Year})</h2>
        <h4>Directed by {Director}</h4>
        <img src={Poster} alt={`${Title} poster`} />
        <i
          className="fas fa-thumbs-up"
          onClick={this.upvoteMovie}
        />
        <div>{upvotes} upvotes</div>
        <i
          className="fas fa-thumbs-down"
          onClick={this.downvoteMovie}
        />
         <div>{downvotes} downvotes</div>
         <div>
           {
              Plot === 'N/A' ?
              'Movie description not available' : Plot
            }
          </div>
        <Link to='/'>Back to search results</Link>
      </Layout>
    );
  }
}

export default MovieDetails;

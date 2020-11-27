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
          'x-rapidapi-key': '5f3c7b77bbmsh4c423dfece25eebp1257ebjsnb0b535b2cc4e',
          'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
        }
      };
      const { data } = await axios.request(options);
      const { Title, Year, Director, Plot, Poster } = data;
      const dbResponse = await axios.get(`/movies/${Title}`);
      console.log(dbResponse.data);
      const {upvotes, downvotes} = dbResponse.data;

      this.setState({ Title, Year, Director, Plot, Poster, upvotes, downvotes });
    } catch (err) {
      console.error(err);
    }
  }

  upvoteMovie = async () => {
    try {
      let title = this.state.Title;
      //title = title.toLowerCase().replace(' ', '-');
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
      //title = title.toLowerCase().replace(' ', '-');
      await axios.post(`/movies/${title}/downvote`);
      const downvotes = this.state.downvotes + 1;
      this.setState({ downvotes });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { Title, Year, Director, Plot, Poster, upvotes, downvotes } = this.state;
    return (
      <Layout>
        <h2>{Title} ({Year})</h2>
        <h4>Directed by {Director}</h4>
        <img src={Poster} alt={`${Title} poster`} />
        <i
          className="glyphicon glyphicon-thumbs-up"
          onClick={this.upvoteMovie}
        />
        <div>{upvotes} upvotes</div>
        <i
          className="glyphicon glyphicon-thumbs-down"
          onClick={this.downvoteMovie}
        />
         <div>{downvotes} downvotes</div>
         <div>{Plot}</div>
        <Link to='/'>Back to movies</Link>
      </Layout>
    );
  }
}

export default MovieDetails;

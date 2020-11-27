import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import MovieDetails from "./components/MovieDetails";
// import "../secrets"

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/movies/:id' component={MovieDetails} />
    </Router>
  );
}

export default App;

import React, { Component } from "react";
import { getMovies, deleteMovie } from "./services/fakeMovieService";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state.movies = getMovies();
  }

  state = {
    movies: {}
  };

  render() {
    return (
      <main className="container">
        <span>
          {this.state.movies.length === 0 &&
            "There are no movies in the database."}
        </span>
        {this.state.movies.length > 0 &&
          this.renderMoviesTable(this.state.movies)}
      </main>
    );
  }

  deleteMovie = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);

    deleteMovie(movie._id);
    this.setState({ movies });
  };

  renderMoviesTable = movies => {
    return (
      <div>
        <span>Showing {movies.length} movies in the database.</span>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
            </tr>
          </thead>
          <tbody>{movies.map(movie => this.renderMovie(movie))}</tbody>
        </table>
      </div>
    );
  };

  renderMovie = movie => {
    return (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <button
            onClick={() => this.deleteMovie(movie)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };
}

export default App;

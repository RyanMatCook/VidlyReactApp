import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4
  };

  render() {
    const { pageSize, currentPage } = this.state;
    const movies = paginate(this.state.movies, currentPage, pageSize);
    return (
      <main className="container">
        <span>
          {movies.length === 0 ? (
            "There are no movies in the database."
          ) : (
            <span>
              There are {this.state.movies.length} movies in the database.
            </span>
          )}
        </span>
        {movies.length > 0 &&
          this.renderMoviesTable(movies, pageSize, currentPage)}
      </main>
    );
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);

    deleteMovie(movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie); //.filter(m => m._id === movie._id);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderMoviesTable = movies => {
    const { currentPage, pageSize } = this.state;
    const moviesCount = this.state.movies.length;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{movies.map(movie => this.renderMovie(movie))}</tbody>
        </table>
        <Pagination
          itemsCount={moviesCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
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
          <Like onClick={() => this.handleLike(movie)} liked={movie.liked} />
        </td>
        <td>
          <button
            onClick={() => this.handleDelete(movie)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };
}

export default Movies;

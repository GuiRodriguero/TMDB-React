import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}

    this.performSearch("Ant Man")
  }

  performSearch(searchTerm) {
    console.log("Perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=3c19bf7ac51514eec1ebe5b3ca20c62e&query=" + searchTerm
   
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")

        const results = searchResults.results

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path

          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },

      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }

    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        <header className="head">
          <div class="title-image"><img class="logo" src="./logo192.png"/></div>
          <div class="title-app">Moviee</div>
        </header>

        <input className="search" onChange={this.searchChangeHandler.bind(this)} placeholder="Digite um Filme"/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;

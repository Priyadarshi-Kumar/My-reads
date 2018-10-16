import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import BooksList from './components/BooksList'
import Search from './components/Search'


class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    this.fetchBooksDetails()
  }

  fetchBooksDetails = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBooksDetails = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState((prevState) => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/'render={() => (
            <BooksList
              books={this.state.books}
              onChange={this.updateBooksDetails}
            />)}
          />
          <Route exact path='/Search' render={({history}) => (
            <Search 
              myBooks = {this.state.books} 
              onChange={this.updateBooksDetails}
            />)}
          />
        </Switch>
      </div>
    )
  }
}

export default BooksApp

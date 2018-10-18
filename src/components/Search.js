import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import { PropTypes } from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import BookNotFound from './BookNotFound'

class Search extends Component {

  static propTypes = {
  	onChange: PropTypes.func.isRequired,
  	myBooks: PropTypes.array.isRequired
  }

  state = {
  	books: [],
  	query: '',
    error: ''
  }

  handleChange = (e) => {
  	var searchValue = e.target.value
  	this.setState(() => {
      return {query: searchValue}
    })
  	this.booksSearch(searchValue)
  }

  changeBookShelf = (books) => {
  	let allBooks = this.props.myBooks
  	for (let book of books) {
  		book.shelf = 'none'
  	}
  	for (let book of books) {
  		for(let ab of allBooks) {
  			if (ab.id === book.id) {
  				book.shelf = ab.shelf
  			}
  		}
  	}
  	return books
  }

  booksSearch = (searchValue) => {
  	if (searchValue.length) {
  		BooksAPI.search(searchValue, 16).then((books) => {
  		if (books.length) {
          books = books.filter((book) => (book.imageLinks.thumbnail))
          books = this.changeBookShelf(books)
          this.setState({ books, error: '' })
        }else {
          this.setState({ books: [], error: 'error' })
        }
  	  })
  	}
  	else {
      this.setState({books: [], query: ''})
    }
  }

  readBook = (book, shelf) => {
  	this.props.onChange(book, shelf)
  }

  render() {	
    return(
      <div className='search-books'>
      	<div className='search-books-bar'>
      	  <Link to='/' className="close-search">Close</Link>
           <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>
           </div>
      	</div>
      	<div className="search-books-results">
          <ol className="books-grid">
            {this.state.query.length > 0 && this.state.books.map((book, index) => (<Book book={book} key={index} onUpdate={(shelf) => {
              this.readBook(book, shelf)
            }}/>))}
            {this.state.error && <BookNotFound />}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search

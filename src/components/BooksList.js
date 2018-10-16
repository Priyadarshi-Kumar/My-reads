import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

function BooksList(props) {

    const books = props.books
    return(
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>My Reads</h1>
        </div>
        <div className='list-books-content'>
          <Shelf books={books.filter((book) => (book.shelf === 'currentlyReading'))} title='Currently Reading' onChangeShelf={props.onChange}/>
          <Shelf books={books.filter((book) => (book.shelf === 'read'))} title='Read' onChangeShelf={props.onChange}/>
          <Shelf books={books.filter((book) => (book.shelf === 'wantToRead'))} title='Want To Read' onChangeShelf={props.onChange}/>
        </div>
        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
}

BooksList.PropTypes = {
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

export default BooksList

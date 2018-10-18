import React from 'react'
import { Link } from 'react-router-dom'

function BookNotFound() {
	return(
		<div class='notfound'>
			<h1>Book not found.</h1>
			<div class='notfound'>
				<Link to='/'>
					<button>Go back to the homepage.</button>
				</Link>
			</div>
		</div>
	)
}

export default BookNotFound
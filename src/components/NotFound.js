import React from 'react'
import { Link } from 'react-router-dom'


function NotFound() {
	return(
		<div id="notfound">
			<div class="notfound">
				<div class="notfound-404">
					<h1>Oops!</h1>
					<h2>404 - The Page can't be found</h2>
				</div>
				<Link to='/'>
					<button> Go back to the homepage</button>
				</Link>
			</div>
		</div>
		)
}

export default NotFound
import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/EventPost.css'

const EventPost = ({post}) => {

    // If we don't have a post, return null
    if (!post) return <p>There is no event listing with that ID</p>

    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
	}

    const {title, modified_date, category, content} = post 

    return (
        <div class="post">
            <Link style={linkStyles} to={`/posts/${post._id}`}>
                <h1>{title}</h1>
            </Link>
			<p>{modified_date.toLocaleString()}</p>
			<p>{category}</p>
			<p>{content}</p>
        </div>
    )
}
export default EventPost
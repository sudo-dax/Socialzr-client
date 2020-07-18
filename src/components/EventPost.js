import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/EventPost.css'

const EventPost = ({post}) => {

    // If we don't have a post, return null
    if (!post) return <div id="noPost"><p>There is no event listing with that ID</p></div>

    const {title, modified_date, location, category, content} = post 

    return (
        <div class="post">
            <Link className="postLinkStyles" to={`/posts/${post._id}`}>
                <h1>{title}</h1>
                <p>{modified_date.toLocaleString()}</p>
                <p>{category}</p>
                <p>{location}</p>
                <p>{content}</p>
            </Link>
        </div>
    )
}
export default EventPost
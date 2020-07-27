import React from 'react'
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/store'

import '../styles/EventPost.css'

const EventPost = ({history, post, showControls}) => {

    const {store, dispatch} = useGlobalState()
    const {eventPosts} = store
    // If we don't have a post, return null
    console.log("got post: ", post)
    if (!post) return <div id="noPost"><p>There is no event listing with that ID</p></div>

    const {title, category, organiser, location, date, description} = post 

    // Handle the delete button
    function handleDelete(event) {
        event.preventDefault()
        const updatedPosts = eventPosts.filter((eventPost) => eventPost._id !== post._id)
        dispatch({
            type: "setEventPosts",
            data: updatedPosts
        })
        history.push("/")
    }

    // Handle the edit button
    function handleEdit(event) {
        event.preventDefault()
        history.push(`/events/edit/${post._id}`)
    }

    return (
        <div className="post">
            <Link className="postLinkStyles" to={`/events/${post._id}`}>
                <h1>{title}</h1>
                <p>{category}</p>
                <p>{organiser}</p>
                <p>{location}</p>
                <p>{date}</p>
                <p>{description}</p>
                {showControls && (
                    <div>
                        <button className="buttonStyles" onClick={handleDelete}>Delete</button>
                        <button className="buttonStyles" onClick={handleEdit}>Edit</button>
                    </div>
                )}
            </Link>
        </div>
    )
}
export default EventPost

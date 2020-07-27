import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {getPostFromId} from '../services/eventPostServices'

import '../styles/EditEventPost.css'

const EditEventPost = ({history, match}) => {

    const {store, dispatch} = useGlobalState()
    const {eventPosts} = store
    const postId = match && match.params ? match.params.id : -1
    const post = getPostFromId(eventPosts, postId)


    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        const updatedPost = {
            _id: post._id,
            title: formState.title,
            category: formState.category || "general",
            organiser: formState.organiser,
            location: formState.location,
            date: formState.date,
            description: formState.description
        }
        const otherPosts = eventPosts.filter((post) => post._id !== updatedPost._id)
        dispatch({
            type: "setEventPosts",
            data: [...otherPosts, updatedPost]
        })
        history.push(`/events/${post._id}`)
    }
    // Set initial form values to what is in the current post
    const initialFormState = {
        title: "",
        category: "",
        organiser: "",
        location: "",
        date: "",
        description: ""
    } 

    const [formState,setFormState] = useState(initialFormState)

    useEffect(() => {
        // Set the formState to the fields in the post after mount and when post changes
        post && setFormState({
            title: post.title,
            category: post.category,
            organiser: "",
            location: "",
            date: "",
            description: post.description
        })
    },[post])

    return (
        <form id="editPostForm" onSubmit={handleSubmit}>
            <div className="divStyles">
                <label className="labelStyles">Title</label>
                <input className="inputStyles" required type="text" name="title" value={formState.title} onChange={handleChange}></input>
            </div>

            <div className='divStyles'>
                <label className='labelStyles'>Category</label>
                    <select name='Cat' id='Cat'>
                        <option value='Festival'>Festival</option>
                        <option value='Party'>Party</option>
                        <option value='Event'>Event</option>
                    </select>
            </div>

            <div className='divStyles'>
                <label className='labelStyles'>Organiser</label>
                <input className='inputStyles' required type='text' name='organiser' placeholder='Enter Event Organiser' onChange={handleChange} />
            </div>

            <div className='divStyles'>
                <label className='labelStyles'>Location</label>
                <input className='inputStyles' required type='text' name='location' placeholder='Enter Event Location' onChange={handleChange} />
            </div>

            <div className='divStyles'>
                <label className='labelStyles'>Date</label>
                <input className='inputStyles' required type='date' name='date' onChange={handleChange} />
            </div>

            <div className="divStyles">
                <label className="labelStyles">Description</label>
                <textarea form="editPostForm" required className="textAreaStyles" name="description" value={formState.description} onChange={handleChange}></textarea>
            </div>
            <input type="submit" value="Update post"></input>
        </form>
    ) 
}

export default withRouter(EditEventPost)
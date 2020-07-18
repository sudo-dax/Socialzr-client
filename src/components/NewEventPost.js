import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'

import '../styles/NewEventPost.css'

const NewEventPost = ({history, addEventPost, nextId}) => {

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
        const newPost = {
            _id: nextId,
            title: formState.title,
            category: formState.category || "general",
            modified_date: new Date(),
            content: formState.content
        }
        addEventPost(newPost)
        history.push(`/posts/${nextId}`)
    }

    // Initial State 
    const initialFormState = {
        title: "",
        category: "",
        location: "",
        date: "",
        content: ""
    } 

    const [formState,setFormState] = useState(initialFormState)

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
    }

    return (
        <form id="newPostForm" onSubmit={handleSubmit}>
            
            <div className="divStyles">
                <label className="labelStyles">Event Title</label>
                <input className="inputStyles" required type="text" name="title" placeholder="Enter a title" onChange={handleChange}></input>
            </div>

            <div className="divStyles">
                <label className="labelStyles">Category</label>
                <select name="Cat" id="Cat">
                    <option value="Festival">Festival</option>
                    <option value="Party">Party</option>
                    <option value="Event">Event</option>
                </select>
            </div>

            <div className="divStyles">
                <label className="labelStyles">Location</label>
                <input className="inputStyles" required type="text" name="title" placeholder="Enter Event Location" onChange={handleChange}></input>
            </div>

            <div className="divStyles">
                <label className="labelStyles">Date</label>
                <input className="inputStyles" required type="date" name="date" onChange={handleChange}></input>
            </div>

            <div className="divStyles">
                <label className="labelStyles">Content</label>
                <textarea form="newPostForm" required className="textAreaStyles" name="content" placeholder="Enter post here" onChange={handleChange}></textarea>
            </div>
            
            <input type="submit" value="Add post"></input>
        </form>
    ) 
}

export default withRouter(NewEventPost)
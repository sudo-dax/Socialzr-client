import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {getPostFromId} from '../services/eventPostServices'

const EditEventPost = ({history, match}) => {

    const {store, dispatch} = useGlobalState()
    const {eventPosts} = store
    const postId = match && match.params ? match.params.id : -1
    const post = getPostFromId(eventPosts, postId)

    const divStyles = {
        display: "grid",
        width: "100vw"
    }
    const inputStyles = {
        width: "70vw",
        margin: ".5em"
    }
    const labelStyles = {
        fontSize: "1.2em"
    }
    const textAreaStyles = {
        height: "200px",
        margin: ".5em",
        width: "70vw"
    }
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
            // modified_date: new Date(),
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
        description: ""
    } 

    const [formState,setFormState] = useState(initialFormState)

    useEffect(() => {
        // Set the formState to the fields in the post after mount and when post changes
        post && setFormState({
            title: post.title,
            category: post.category,
            description: post.description
        })
    },[post])

    return (
        <form id="editPostForm" onSubmit={handleSubmit}>
            <div style={divStyles}>
                <label style={labelStyles}>Title</label>
                <input style={inputStyles} required type="text" name="title" value={formState.title} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Category</label>
                <input style={inputStyles} type="text" name="category" value={formState.category} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Description</label>
                <textarea form="editPostForm" required style={textAreaStyles} name="content" value={formState.content} onChange={handleChange}></textarea>
            </div>
            <input type="submit" value="Update post"></input>
        </form>
    ) 
}

export default withRouter(EditEventPost)
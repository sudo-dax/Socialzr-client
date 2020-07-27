import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import { useGlobalState } from '../config/store'
import {addEventPost} from '../services/eventPostServices'
// import {Block, Input, Label, ErrorText} from './StyledComponents'

import '../styles/NewEventPost.css'

const NewEventPost = ({history}) => {

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
          title: formState.title,
          category: formState.category || "Event",
          organiser: formState.organiser,
          location: formState.location,
          date: formState.date,
          description: formState.description
      }
      
      addEventPost(newPost).then((newPost) => {
          dispatch({
              type: "setEventPosts",
              data: [newPost ,...eventPosts]
          })
          history.push(`/events/${newPost._id}`)
      })
      
      .catch((error) => {
          const status = error.response ? error.response.status : 500
          console.log("caught error on edit", error)
          if(status === 403)
              setErrorMessage("Oops! It appears we lost your login session. Make sure 3rd party cookies are not blocked by your browser settings.")
          else
              setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
      })
  // console.log(newPost)
  }
  // Initial State 
  const initialFormState = {
      title: "",
      category: "",
      organiser: "",
      location: "",
      date: "",
      description: ""
  } 

  const [formState,setFormState] = useState(initialFormState)
  const [errorMessage, setErrorMessage] = useState(null)
  const {store, dispatch} = useGlobalState()
  const {eventPosts} = store

  return (
    <form id="newPostForm" onSubmit={handleSubmit}>
        {/* {errorMessage && <ErrorText>{errorMessage}</ErrorText>} */}
        <div className="divStyles">
            <p className="labelStyles">Event Title</p>
            <input className="inputStyles" required type="text" name="title" placeholder="Enter a title" onChange={handleChange}></input>
        </div>

        <div className="divStyles">
            <p className="labelStyles">Organiser</p>
            <input className="inputStyles" required type="text" name="organiser" placeholder="Enter a title" onChange={handleChange}></input>
        </div>

      <div className='divStyles'>
        <label className='labelStyles'>Category</label>
          <select name='category' id='Cat'>
            <option value='Festival'>Festival</option>
            <option value='Party'>Party</option>
            <option value='Event'>Event</option>
          </select>
      </div>

      <div className='divStyles'>
        <label className='labelStyles'>Location</label>
        <input className='inputStyles' required type='text' name='location' placeholder='Enter Event Location' onChange={handleChange} />
      </div>

      <div className='divStyles'>
        <label className='labelStyles'>Date</label>
        <input className='inputStyles' required type='date' name='date' onChange={handleChange} />
      </div>

      <div className='divStyles'>
        <label className='labelStyles'>Description</label>
        <textarea form='newPostForm' required className='textAreaStyles' name='description' placeholder='Enter post here' onChange={handleChange} />
      </div>

      <input type='submit' value='Add post' />
    </form>
  )
}

 export default withRouter(NewEventPost)

import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import EventPosts from './components/EventPosts'
import eventData from './data/post_data'
import EventPost from './components/EventPost'
import NewEventPost from './components/NewEventPost'

import './styles/App.css'


const App = () => {
  const [eventPosts, setEventposts] = useState([])

  useEffect(()=> {
    console.log(eventData)
    setEventposts(eventData)
  }, [])

  function getPostFromId (id) {
    // console.log(eventPosts)
    return eventPosts.find((post) => post._id == id )
  }


  return (
    <div >
      <BrowserRouter>
        <Nav />
        <div id="div_spacer">
          <h1 id="main_title">Social<span><img id="eye" src='https://www.kindpng.com/picc/b/158-1589280_blue-eyes-png.png' alt="i" /></span>Zr</h1>
        </div>
      <Switch>
        <Route exact path="/" render={(props) => <EventPosts {...props} eventData={eventPosts} /> } />
        <Route exact path="/posts/new" render={() => <NewEventPost /> } />
        <Route exact path="/posts/:id" render={(props) => <EventPost {...props} post={getPostFromId(props.match.params.id) } /> } /> 
        </Switch>
      </BrowserRouter>
  </div>
  )
}

export default App

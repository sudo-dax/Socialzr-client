import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/Nav.css'

const Nav = () => {

    return (

        <div id={divStyles}>
            <Link style={linkStyles} to="/">Home</Link>
            <Link style={linkStyles} to="/posts/new">Create an Event</Link>
        </div>
    )
}

export default Nav
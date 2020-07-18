import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/Nav.css'

const Nav = () => {
    const divStyles = {
        display: 'flex',
        justifyContent: 'space-between'
    }
    const linkStyles = {
        fontSize: '1.2em',
        textDecoration: 'none',
        margin: '.5em'
    }
    return (
        <div id="divStyles">
            <Link style={linkStyles} to="/">Home</Link>
            <Link style={linkStyles} to="/posts/new">Add an Event</Link>
        </div>
    )
}

export default Nav
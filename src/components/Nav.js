import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/Nav.css'

const Nav = () => {

    return (
        <div id="divStyles">
            <Link className="linkStyles" to="/">Home</Link>
            <Link className="linkStyles" to="/posts/new">Add an Event</Link>
        </div>
    )
}

export default Nav
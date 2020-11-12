import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
        <h1>
            <Link to="/"><i className="far fa-dumbbell">Fattest looser</i></Link>
        </h1>
        <ul>
            <li><Link to="/register">Registrera</Link></li>
            <li><Link to="/login">Logga in</Link></li>
        </ul>
    </nav>
    )
}

export default Navbar;
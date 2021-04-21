import * as React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <div className="menu">
            <div className="links">
                <Link to="/doujins">All Doujins</Link>
                <Link to="/">Home</Link>
                <Link to="/bookmarks">Bookmarks</Link>
            </div>
            <section>
                <div className="notice">Desktop UI is a work in progress</div>
                <div className="copyright">Cyan Froste © 2021</div>
            </section>
        </div>
    )
}

export default Menu

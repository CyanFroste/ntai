import * as React from 'react'
import { HiMenu } from 'react-icons/hi'
import { Link } from 'react-router-dom'

// interface NavbarProps {
//     // size?: DisplaySize
// }

const Navbar = () => {
    // states
    // const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    // const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    // const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    // const closeMenu = () => setIsMenuOpen(false)

    return (
        <div className="navbar">
            <nav>
                <section>
                    <button className="menu-toggle" type="button">
                        <HiMenu />
                    </button>
                </section>

                <section>
                    <div className="logo">
                        <Link to="/">ntai</Link>
                    </div>
                </section>
            </nav>
        </div>
    )
}

export default Navbar

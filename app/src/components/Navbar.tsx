import * as React from 'react'
import { HiMenu } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Drawer from '../layouts/Drawer'
import Menu from './Menu'

const Navbar = () => {
    // states
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    return (
        <div className="navbar">
            <nav>
                <section>
                    <button className="menu-toggle" type="button" onClick={() => setIsMenuOpen(true)}>
                        <HiMenu />
                    </button>
                </section>

                <section>
                    <div className="logo">
                        <Link to="/">ntai</Link>
                    </div>
                </section>
            </nav>

            <Drawer isOpen={isMenuOpen} close={() => setIsMenuOpen(false)}>
                <Menu />
            </Drawer>
        </div>
    )
}

export default Navbar

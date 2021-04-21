import * as React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Screen from '../layouts/Screen'

const Home = () => {
    const history = useHistory()

    const [searchString, setSearchString] = React.useState('')

    const go = () => {
        if (!searchString) return history.push('/doujins')
        if (isNaN(parseInt(searchString))) return history.push(`/doujins?k=${searchString}`)
        history.push(`/doujin/${parseInt(searchString)}`)
    }

    return (
        <Screen title="ntai" navbar={false}>
            <main className="home">
                <section className="details">
                    <div className="logo">ntai</div>
                    <div className="copyright">Cyan Froste © 2021</div>
                </section>

                <section className="controls">
                    <form
                        id="search"
                        onSubmit={(e) => {
                            e.preventDefault()
                            go()
                        }}
                    >
                        <input type="text" placeholder="eg. 177013" onChange={(e) => setSearchString(e.target.value)} />
                    </form>
                    <button className="go" onClick={go}>
                        {searchString ? 'SEARCH' : 'ALL DOUJINS'}
                    </button>
                    <Link to="/bookmarks" className="bookmarks">
                        BOOKMARKS
                    </Link>
                </section>
            </main>
        </Screen>
    )
}

export default Home

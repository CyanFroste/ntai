import * as React from 'react'
import { HiSearch, HiTag, HiMenuAlt3 } from 'react-icons/hi'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Modal from '../layouts/Modal'

interface ControllerProps {
    keyword: string | null
    tag: string | null
    page: string | null
    sort: string | null
    tagName: string | null
}

const sortMethod = (sort: string | null) => {
    if (sort === 'today') return 'Popular Today'
    if (sort === 'week') return 'Popular this Week'
    if (sort === 'recent') return 'Recent'
    return 'Popular all Time'
}

const Controller = ({ keyword, page, tag, sort, tagName }: ControllerProps) => {
    const location = useLocation()
    const history = useHistory()

    // ! refactor
    const path = (option: string) => {
        const { pathname } = location
        let url = pathname + '?s=' + option
        if (keyword) url += '&k=' + keyword
        if (tag) url += '&t=' + tag + '&tn=' + tagName
        if (page) url += '&p=' + page
        return url
    }

    const [isSorterOpen, setIsSorterOpen] = React.useState(false)
    const [searchString, setSearchString] = React.useState('')

    const search = () => {
        if (isNaN(parseInt(searchString))) return history.push(`/doujins?k=${searchString}`)
        history.push(`/doujin/${parseInt(searchString)}`)
    }

    return (
        <section className="controller">
            <div className="search">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        search()
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search eg. big boobs"
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                    {searchString.length > 0 && (
                        <button className="go" type="button" onClick={search}>
                            <HiSearch />
                        </button>
                    )}
                </form>
            </div>

            <div className="current">
                <div className="filter">
                    {tag && (
                        <div className="pill">
                            <HiTag /> {tagName}
                        </div>
                    )}
                    {keyword && (
                        <div className="pill">
                            <HiSearch /> {keyword}
                        </div>
                    )}
                </div>

                <div className="sort">
                    <button onClick={() => setIsSorterOpen(true)}>
                        {sortMethod(sort)} <HiMenuAlt3 />
                    </button>
                </div>
            </div>

            <Modal isOpen={isSorterOpen} close={() => setIsSorterOpen(false)}>
                <div className="sorter">
                    <div className="options">
                        <Link to={path('recent')}>Recent</Link>
                        <Link to={path('week')}>Popular this Week</Link>
                        <Link to={path('today')}>Popular Today</Link>
                        <Link to={path('all')}>Popular all Time</Link>
                    </div>
                </div>
            </Modal>
        </section>
    )
}

export default Controller

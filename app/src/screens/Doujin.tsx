import * as React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { getDoujin } from '../services/requests'
import Image from '../components/Image'
import { HiBookOpen, HiCalendar, HiCheckCircle, HiChevronDown, HiChevronUp, HiHeart } from 'react-icons/hi'
import { capitalize, shortenNumber } from '../services/common'
import Screen from '../layouts/Screen'
import Modal from '../layouts/Modal'
import { addBookmark, mapDoujin } from '../services/bookmark'
import Loading from './Loading'
import Error from './Error'

export const group = (tags: any[]) => {
    const grouped: { [key: string]: any } = { list: [] }
    for (const tag of tags) {
        if (!grouped.hasOwnProperty(tag.type)) {
            grouped[tag.type] = []
            grouped.list.push(tag.type)
        }
        grouped[tag.type].push(tag)
    }
    grouped.list.sort((a: string, b: string) => a.localeCompare(b))
    return grouped
}

const tags = (tags: object[]) => {
    const grouped = group(tags)
    return (grouped.list as string[]).map((group, i) => (
        <div key={i} className="group">
            <div className="group-title">{capitalize(group)}</div>
            <div className="tags-wrap">
                {(grouped[group] as any[]).map((tag, i) => (
                    <Link to={`/doujins?t=${tag.id}&tn=${tag.name}`} key={i} className="tag">
                        {tag.name}
                        <span className="count">{shortenNumber(tag.count)}</span>
                    </Link>
                ))}
            </div>
        </div>
    ))
}

const Doujin = () => {
    // route query
    const { id } = useParams<{ id: string }>()

    // states
    const [isAddBookmarkDialogOpen, setIsAddBookmarkDialogOpen] = React.useState(false)
    const [bookmarkCategory, setBookmarkCategory] = React.useState('')
    const [coverSrc, setCoverSrc] = React.useState('')

    // react query
    const { data, status } = useQuery(['doujin', id], () => getDoujin(id))

    const pageStyles = (imgWidth: number, imgHeight: number) => {
        // using pages' margin, image h/w ratio and window.innerWidth, calculate page width and height
        // margin horizontal = 10, vertical = 5
        const margin = 5
        const width = window.innerWidth - 2 * margin
        const height = (width * imgHeight) / imgWidth
        return { width, height, margin: `${margin / 2}px ${margin}px` }
    }

    const onCoverSrcFeedback = (src: string) => setCoverSrc(src)

    // * Bookmark controls
    const bookmark = () => {
        addBookmark(bookmarkCategory, mapDoujin(data))
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        setIsAddBookmarkDialogOpen(false)
    }

    return (
        <Screen title="ntai | doujins">
            {status === 'loading' && <Loading full={true} />}
            {status === 'error' && <Error full={true} />}
            {status === 'success' && data && (
                <main className="doujin">
                    <section className="details">
                        <div className="cover">
                            {coverSrc && <img className="bg" src={coverSrc} alt="cover-bg" />}
                            <Image className="main" {...data.thumbnail} feedbackSrc={onCoverSrcFeedback} />
                        </div>
                        <div className="controls">
                            <div className="id">{data.id}</div>
                            <button className="bookmark" onClick={() => setIsAddBookmarkDialogOpen(true)}>
                                <HiHeart />
                            </button>
                        </div>
                        <div className="titles">
                            <div>{data.titles.pretty}</div>
                        </div>
                        <div className="date">
                            <HiCalendar />
                            {new Date(data.uploadDate).toLocaleDateString()}
                        </div>
                        <div className="chapters">
                            <HiBookOpen />
                            {data.length}
                        </div>
                        <div className="favorites">
                            <HiHeart />
                            {data.favorites}
                        </div>
                        <div className="tags">{tags(data.tags.all)}</div>
                    </section>

                    {/* related doujins */}
                    {/* <Related id={data.doujinId} /> */}

                    <section className="pages">
                        {(data.pages as any[]).map((page, i) => (
                            <div key={i} className="page" style={pageStyles(page.width, page.height)}>
                                <div className="pg-no">
                                    {i + 1} of {data.length}
                                </div>
                                <Image className="page-image" {...page} lazy={true} />
                            </div>
                        ))}
                    </section>

                    <div className="scroll">
                        <button
                            className="end"
                            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                        >
                            <HiChevronDown />
                        </button>
                        <button className="top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <HiChevronUp />
                        </button>
                    </div>

                    <Modal isOpen={isAddBookmarkDialogOpen} close={() => setIsAddBookmarkDialogOpen(false)}>
                        <div className="add-bookmark-dialog">
                            <div className="category-select">Category</div>
                            <div className="category-options">
                                {data.tags.all.map((tag: any) => (
                                    <div key={tag.id} onClick={() => setBookmarkCategory(tag.name)}>
                                        {tag.name} {tag.name === bookmarkCategory && <HiCheckCircle />}
                                    </div>
                                ))}
                            </div>
                            <button type="button" disabled={!bookmarkCategory} onClick={bookmark}>
                                Add Bookmark
                            </button>
                        </div>
                    </Modal>
                </main>
            )}
        </Screen>
    )
}

export default Doujin

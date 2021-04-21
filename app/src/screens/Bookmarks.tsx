import * as React from 'react'
import { HiExternalLink, HiTrash } from 'react-icons/hi'
import { useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import Modal from '../layouts/Modal'
import Screen from '../layouts/Screen'
import { getBookmarks, Bookmark, removeBookmark } from '../services/bookmark'
import Error from './Error'
import Loading from './Loading'
// import Image from '../components/Image'

const Bookmarks = () => {
    const history = useHistory()

    // * Query Client to modify cache
    const queryClient = useQueryClient()

    const { data, status } = useQuery('bookmarks', getBookmarks)

    const [bookmarkIdToRemove, setBookmarkIdToRemove] = React.useState(0)

    // * Bookmark controls
    const unbookmark = () => {
        removeBookmark(bookmarkIdToRemove)
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        setBookmarkIdToRemove(0)
        queryClient.invalidateQueries('bookmarks')
    }

    return (
        <Screen title="ntai | bookmarks">
            {status === 'loading' && <Loading full={true} />}
            {status === 'error' && <Error full={true} />}
            {status === 'success' && data && (
                <main className="bookmarks">
                    {/* make it a masonry grid */}
                    <section className="grid">
                        {data.map((bookmark: Bookmark) => (
                            <div className="bookmark" key={bookmark.doujin.id}>
                                {/* Either display Title or Thumbnail: make a switch to toggle  */}
                                {/* <Image className="thumbnail" url={bookmark.doujin.thumbnail} lazy={true} /> */}
                                <div className="details">
                                    <div className="id">{bookmark.doujin.id}</div>
                                    <div className="title">{bookmark.doujin.title}</div>
                                    <div className="category">{bookmark.category}</div>
                                </div>
                                <div className="controls">
                                    <button onClick={() => setBookmarkIdToRemove(bookmark.doujin.id)}>
                                        <HiTrash />
                                    </button>
                                    <button onClick={() => history.push(`/doujin/${bookmark.doujin.id}`)}>
                                        <HiExternalLink />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>

                    <Modal isOpen={!!bookmarkIdToRemove} close={() => setBookmarkIdToRemove(0)}>
                        <div className="remove-bookmark-dialog">
                            <div className="message">
                                Remove <span>{bookmarkIdToRemove}</span> from Bookmarks?
                            </div>
                            <button type="button" onClick={unbookmark}>
                                Remove Bookmark
                            </button>
                        </div>
                    </Modal>
                </main>
            )}
        </Screen>
    )
}

export default Bookmarks

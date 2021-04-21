interface BookmarkDoujin {
    id: number
    title: string
    length: number
    favorites: number
    url: string
    cover: string
    thumbnail: string
    tags: {
        id: number
        name: string
        count: string
    }[]
}

export interface Bookmark {
    category: string
    doujin: BookmarkDoujin
}

export const mapDoujin = (data: any) =>
    ({
        id: data.id,
        title: data.titles.pretty,
        length: data.length,
        favorites: data.favorites,
        url: data.url,
        cover: data.cover.url,
        thumbnail: data.thumbnail.url,
        tags: data.tags.all.map((tag: any) => ({ id: tag.id, name: tag.name, count: tag.count })),
    } as BookmarkDoujin)

export const getBookmarks = async () => {
    try {
        const res = await fetch('/api/bookmarks')
        return res.json()
    } catch (err) {
        console.error(err)
    }
}

export const addBookmark = async (category: string, doujin: BookmarkDoujin) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, doujin }),
        }
        const res = await fetch('/api/bookmark/create', options)
        return res.json()
    } catch (err) {
        console.error(err)
    }
}

export const removeBookmark = async (id: number) => {
    try {
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        }
        const res = await fetch('/api/bookmark/remove', options)
        return res.json()
    } catch (err) {
        console.error(err)
    }
}

export const getBookmark = async (id: string | number) => {
    try {
        const res = await fetch(`/api/bookmark/${id}`)
        return res.json()
    } catch (err) {
        console.error(err)
    }
}

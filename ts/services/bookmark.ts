import { Bookmark, BookmarkModel } from './db'

export async function index() {
    return await BookmarkModel.find().sort({
        updatedAt: -1,
    })
}

export async function show(id: number | string) {
    return await BookmarkModel.findOne({ 'doujin.id': +id })
}

// create Bookmark
export async function create(bookmark: Bookmark) {
    try {
        await BookmarkModel.create(bookmark)
        return { message: bookmark.doujin.id + ' added to bookmarks' }
    } catch (err) {
        // console.error(err)
        if (err.code === 11000) throw new Error('Bookmark already exists')
        throw new Error('Bookmark not added')
    }
}

// remove bookmark
export async function remove(id: number) {
    if (await BookmarkModel.findOneAndDelete({ 'doujin.id': id })) return { message: id + ' removed from bookmarks' }
    throw new Error('Bookmark not deleted')
}

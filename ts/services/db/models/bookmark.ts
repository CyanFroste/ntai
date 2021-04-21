import { Schema, model } from 'mongoose'

export interface Bookmark {
    category: string
    doujin: {
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
}

const TagSchema = new Schema({
    id: Number,
    name: String,
    count: String,
    _id: false,
})

const DoujinSchema = new Schema({
    id: { type: Number, unique: true },
    title: String,
    length: Number,
    favorites: Number,
    url: String,
    cover: String,
    thumbnail: String,
    tags: [TagSchema],
    _id: false,
})

const BookmarkSchema = new Schema(
    {
        category: { type: String, required: true },
        doujin: { type: DoujinSchema, required: true },
    },
    { timestamps: true }
)

export default model('bookmark', BookmarkSchema)

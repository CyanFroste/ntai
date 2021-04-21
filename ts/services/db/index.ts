import { connect } from 'mongoose'
import BookmarkModel, { Bookmark } from './models/bookmark'
import dotenv from 'dotenv'

dotenv.config()

connect(process.env.DB_URL || 'mongodb://localhost:27017/ntai', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).catch(() => console.log('Database connection failed!'))

export { BookmarkModel, Bookmark }

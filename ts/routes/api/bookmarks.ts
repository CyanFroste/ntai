import { Router } from 'express'
import * as bookmark from '../../services/bookmark'
const router = Router()

router.get('/bookmarks', (_, res, next) => {
    bookmark
        .index()
        .then((data) => res.json(data))
        .catch((err) => next(err))
})

router.get('/bookmark/:id', (req, res, next) => {
    const id = req.params.id
    bookmark
        .show(id)
        .then((data) => res.json(data))
        .catch((err) => next(err))
})

router.post('/bookmark/create', (req, res, next) => {
    bookmark
        .create({ doujin: req.body.doujin, category: req.body.category })
        .then((data) => res.json(data))
        .catch((err) => next(err))
})

router.delete('/bookmark/remove', (req, res, next) => {
    bookmark
        .remove(req.body.id)
        .then((data) => res.json(data))
        .catch((err) => next(err))
})

export default router

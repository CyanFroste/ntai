import { Router } from "express";
import { API as nHentaiAPI, SortMethods } from "nhentai";

const router = Router();
const nhentai = new nHentaiAPI();

router.get("/doujin/:id", (req, res, next) => {
	const id = req.params.id;
	nhentai
		.fetchDoujin(id)
		.then((doujin) => {
			res.json(doujin);
		})
		.catch((err) => next(err));
});

router.get("/doujin/random", (req, res, next) => {
	nhentai
		.randomDoujin()
		.then((doujin) => {
			res.json(doujin);
		})
		.catch((err) => next(err));
});

router.get("/doujins/tag/:id", (req, res, next) => {
	const id = req.params.id;
	const page = req.query.page as string;
	nhentai
		.searchByTagID(id, page)
		.then((results) => {
			res.json(results);
		})
		.catch((err) => next(err));
});

router.get("/doujins/related/:id", (req, res, next) => {
	const id = req.params.id;
	const page = req.query.page as string;
	nhentai
		.searchRelated(id, page)
		.then((results) => {
			res.json(results);
		})
		.catch((err) => next(err));
});

router.get("/doujins/search", (req, res, next) => {
	const keyword = (req.query.keyword || "*") as string;
	const page = req.query.page as string;
	nhentai
		.search(keyword, page, sort(req.query.sort as string))
		.then((results) => {
			res.json(results);
		})
		.catch((err) => next(err));
});

function sort(key: string) {
	if (key === "today") return SortMethods.POPULAR_TODAY;
	if (key === "week") return SortMethods.POPULAR_THIS_WEEK;
	if (key === "recent") return SortMethods.RECENT;
	return SortMethods.POPULAR_ALL_TIME;
}

export default router;

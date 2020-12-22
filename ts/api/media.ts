import { Router } from "express";
import { base64Encode } from "../services/image";

const router = Router();

router.post("/image", (req, res, next) => {
	const url = req.body.url;
  const ext = req.body.ext;
	base64Encode(url, ext)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => next(err));
});

export default router;

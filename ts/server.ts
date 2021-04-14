import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import ip from "ip";

import doujins from "./api/doujins";
import media from "./api/media";
import errorHandler from "./middlewares/error-handler";

dotenv.config();
const app = express();
const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());

// api routes
app.use("/api", doujins);
app.use("/api", media);

// serve react
app.use(express.static(path.join(__dirname, "app", "build")));
app.get("/*", function (_, res) {
	res.sendFile(path.join(__dirname, "app", "build", "index.html"));
});

// error handling middleware
app.use(errorHandler);

app.listen(port, () => {
	console.log(`server running on ${ip.address()}:${port}`);
});

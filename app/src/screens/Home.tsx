import { useState } from "react";
import { HiChevronDown, HiSearch, HiX } from "react-icons/hi";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import Sorter from "../components/controllers/Sorter";
import Paginator from "../components/controllers/Paginator";
import View from "../components/View";
import * as fetcher from "../helpers/fetcher";

interface HomeProps {}
const Home = () => {
	const history = useHistory();
	// query params
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = query.get("p");
	const sort = query.get("s");
	const keyword = query.get("k");

	// react query
	const { data, status } = useQuery(
		["results", keyword, page, sort],
		fetcher.search
	);

	const [searchString, setSearchString] = useState("");

	const search = () => {
		if (isNaN(parseInt(searchString)))
			return history.push(`/search?k=${searchString}`);
		history.push(`/doujin/${parseInt(searchString)}`);
	};

	const reset = () => {
		setSearchString("");
		(document.querySelector("#search input") as HTMLInputElement).value = "";
	};

	return (
		<main className="home">
			<section className="landing">
				<form
					id="search"
					onSubmit={(e) => {
						e.preventDefault();
						search();
					}}
				>
					<input
						type="text"
						placeholder="eg. 177013"
						onChange={(e) => setSearchString(e.target.value)}
					/>
					{searchString.length > 0 && (
						<button type="button" className="reset" onClick={reset}>
							<HiX />
						</button>
					)}
				</form>
				<button className="go" onClick={search}>
					<HiSearch />
				</button>
				<div className="indicator">
					<button>
						<HiChevronDown />
					</button>
				</div>
			</section>
			{status === "loading" && "Loading..."}
			{status === "success" && data && (
				<>
					<Sorter {...{ current: sort, page, keyword }} />
					<section className="view-holder">
						{data.doujins && <View {...{ items: data.doujins }} />}
						<Paginator {...{ page, sort, keyword, total: data.numPages }} />
					</section>
				</>
			)}
		</main>
	);
};

export default Home;

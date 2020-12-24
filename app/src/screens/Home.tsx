import { useState } from "react";
import { HiChevronDown, HiSearch, HiX } from "react-icons/hi";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import Sorter from "../components/controllers/Sorter";
import Paginator from "../components/controllers/Paginator";
import View from "../components/View";
import * as fetcher from "../helpers/fetcher";
import { useQueryParams } from "../hooks/query";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Home = () => {
	const history = useHistory();
	// query params
	const [page, sort, keyword] = useQueryParams("p", "s", "k");
	// react query
	const { data, status } = useQuery(
		["home", keyword, page, sort],
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
			{status === "loading" && <Loading full={true} />}
			{status === "error" && (
				<Error
					full={true}
					message="Failed to get doujins, check your internet connection"
				/>
			)}
			{status === "success" && data && (
				<>
					<Sorter {...{ current: sort, page, keyword }} />
					<section className="view-holder">
						{data.doujins ? (
							<>
								<View {...{ items: data.doujins }} />
								<Paginator {...{ page, sort, keyword, total: data.numPages }} />
							</>
						) : (
							<Error message="Not Found" />
						)}
					</section>
				</>
			)}
		</main>
	);
};

export default Home;

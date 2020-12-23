import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Sorter from "../components/controllers/Sorter";
import Paginator from "../components/controllers/Paginator";
import View from "../components/View";
import * as fetcher from "../helpers/fetcher";
import { HiSearch } from "react-icons/hi";
import Searchbar from "../components/controllers/Searchbar";

interface SearchProps {}
const Search = () => {
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

	return (
		<main className="search">
			{status === "loading" && "Loading..."}
			{status === "success" && data && (
				<>
					<Sorter {...{ current: sort, page, keyword }} />
          <Searchbar />
					<section className="view-holder">
						<View {...{ items: data.doujins }} />
           
						<Paginator {...{ page, sort, keyword, total: data.numPages }} />
					</section>
				</>
			)}
		</main>
	);
};

export default Search;

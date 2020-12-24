import { useQuery } from "react-query";
import Sorter from "../components/controllers/Sorter";
import Paginator from "../components/controllers/Paginator";
import View from "../components/View";
import * as fetcher from "../helpers/fetcher";
import Searchbar from "../components/controllers/Searchbar";
import { useQueryParams } from "../hooks/query";
import Error from "../components/Error";
import Loading from "../components/Loading";

const Search = () => {
	// query params
	const [page, sort, keyword] = useQueryParams("p", "s", "k");

	// react query
	const { data, status } = useQuery(
		["results", keyword, page, sort],
		fetcher.search
	);

	return (
		<main className="search">
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
					<Searchbar />
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

export default Search;

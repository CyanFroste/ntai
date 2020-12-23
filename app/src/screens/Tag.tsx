import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import Paginator from "../components/controllers/Paginator";
import View from "../components/View";
import * as fetcher from "../helpers/fetcher";

interface TagProps {}
const Tag = () => {
	// query params
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = query.get("p");

	// more efficient way to get tag name?
	const { id, name } = useParams<{ id: string; name: string }>();

	// react query
	const { data, status } = useQuery(["results", id, page], fetcher.searchByTag);

	return (
		<main className="tagged">
			{status === "loading" && "Loading..."}
			{status === "success" && data && (
				<>
					<section className="tag-control">
						<div className="selected-tag">{name}</div>
					</section>
					<section className="view-holder">
						{data.doujins && <View {...{ items: data.doujins }} />}
						<Paginator
							{...{ page, sort: null, keyword: null, total: data.numPages }}
						/>
					</section>
				</>
			)}
		</main>
	);
};

export default Tag;

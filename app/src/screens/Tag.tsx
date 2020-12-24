import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Paginator from "../components/controllers/Paginator";
import Error from "../components/Error";
import Loading from "../components/Loading";
import View from "../components/View";
import * as fetcher from "../helpers/fetcher";
import { useQueryParams } from "../hooks/query";

const Tag = () => {
	// query params
	const [page] = useQueryParams("p");
	// more efficient way to get tag name?
	const { id, name } = useParams<{ id: string; name: string }>();
	// react query
	const { data, status } = useQuery(["results", id, page], fetcher.searchByTag);

	return (
		<main className="tagged">
			{status === "loading" && <Loading full={true} />}
			{status === "error" && (
				<Error
					full={true}
					message="Failed to get doujins, check your internet connection"
				/>
			)}
			{status === "success" && data && (
				<>
					<section className="tag-control">
						<div className="selected-tag">{name}</div>
					</section>
					<section className="view-holder">
						{data.doujins ? (
							<>
								<View {...{ items: data.doujins }} />
								<Paginator
									{...{ page, sort: null, keyword: null, total: data.numPages }}
								/>
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

export default Tag;

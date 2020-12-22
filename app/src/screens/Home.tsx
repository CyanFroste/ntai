import { HiMenuAlt3 } from "react-icons/hi";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import Select from "../components/Select";
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

	const sortMethod = (sort: string | null) => {
		if (sort === "today") return "Popular Today";
		if (sort === "week") return "Popular this Week";
		if (sort === "recent") return "Recent";
		return "Popular all Time";
	};

	return (
		<main className="home">
			<section className="landing"></section>
			<section className="sort">
				<div className="current">{sortMethod(sort)}</div>
				<div className="controls">
					<Select
						title="Sort by"
						// probable refactor
						toggle={<HiMenuAlt3 />}
						options={[
							{ value: "recent", display: sortMethod("recent") },
							{ value: "week", display: sortMethod("week") },
							{ value: "today", display: sortMethod("today") },
							{ value: "all", display: sortMethod("all") },
						]}
						onSelect={(option: string) => {
							history.push(`/?s=${option}`);
						}}
					/>
				</div>
			</section>
			<section className="view-holder">
				{status === "loading" && "Loading..."}
				{status === "success" && data && <View {...{ items: data.doujins }} />}
			</section>
		</main>
	);
};

export default Home;

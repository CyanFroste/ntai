import { HiMenuAlt3 } from "react-icons/hi";
import Select from "../Select";
import { useHistory, useLocation } from "react-router-dom";

const sortMethod = (sort: string | null) => {
	if (sort === "today") return "Popular Today";
	if (sort === "week") return "Popular this Week";
	if (sort === "recent") return "Recent";
	return "Popular all Time";
};

interface SorterProps {
	current: string | null;
	page: string | null;
	keyword: string | null;
}

const Sorter = ({ current, keyword, page }: SorterProps) => {
	const history = useHistory();
	const location = useLocation();

	const makePath = (option: string) => {		
		const currentRoute = location.pathname;
		if (!page && !keyword) return `${currentRoute}?s=${option}`;
		if (page && !keyword) return `${currentRoute}?p=${page}&s=${option}`;
		if (!page && keyword) return `${currentRoute}?k=${keyword}&s=${option}`;
		return `${currentRoute}?k=${keyword}&p=${page}&s=${option}`;
	};

	return (
		<section className="sorter">
			<div className="current">{sortMethod(current)}</div>
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
						history.push(makePath(option));
					}}
				/>
			</div>
		</section>
	);
};

export default Sorter;

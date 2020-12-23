import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useHistory, useLocation } from "react-router-dom";

interface PaginatorProps {
	page: string | null;
	sort: string | null;
	keyword: string | null;
	total: string | number;
}

const Paginator = ({ page, sort, keyword, total }: PaginatorProps) => {
	const history = useHistory();
	const location = useLocation();

	const makePath = (num: string | number) => {
		const currentRoute = location.pathname;
		if (!sort && !keyword) return `${currentRoute}?p=${num}`;
		if (sort && !keyword) return `${currentRoute}?s=${sort}&p=${num}`;
		if (!sort && keyword) return `${currentRoute}?k=${keyword}&p=${num}`;
		return `${currentRoute}?k=${keyword}&s=${sort}&p=${num}`;
	};

	const gotoPage = (pg: number) => history.push(makePath(pg));

	const changePage = (type: string | number) => {
		const currentPage = parseInt(page || "1");
		if (type === "prev" && currentPage !== 1) return gotoPage(currentPage - 1);
		if (type === "next") return gotoPage(currentPage + 1);
	};

	return (
		<div className="paginator">
			<nav>
				<button className="prev" onClick={() => changePage("prev")}>
					<HiChevronLeft />
				</button>
				<div className="current-pg">{page || 1} of</div>
        {/* onClick={() => gotoPage(+total)} */}
				<button className="last"> 
					{total}
				</button>
				<button className="next" onClick={() => changePage("next")}>
					<HiChevronRight />
				</button>
			</nav>
		</div>
	);
};

export default Paginator;

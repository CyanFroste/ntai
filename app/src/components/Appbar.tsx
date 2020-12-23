import { HiMenu } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Appbar = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
  const keyword = query.get("k");
  
	return (
		<header className="appbar">
			<nav>
				<button>
					<HiMenu />
				</button>

				{/* show search breadcrumb on '/search' route */}
				{location.pathname === "/search" && (
					<div className="searched">
						<span>{keyword || "all"}</span>
						<span>
							<Link to="/search">search</Link>
						</span>
					</div>
				)}

				<div className="logo">
					<Link to="/">ntai</Link>
				</div>
			</nav>
		</header>
	);
};

export default Appbar;

import { useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { useHistory } from "react-router-dom";

const Searchbar = () => {
	const history = useHistory();
	const [searchString, setSearchString] = useState("");

	const search = () => {
		if (isNaN(parseInt(searchString)))
			return history.push(`/search?k=${searchString}`);
		history.push(`/doujin/${parseInt(searchString)}`);
	};

	const reset = () => {
		setSearchString("");
		(document.querySelector(".searchbar input") as HTMLInputElement).value = "";
	};

	return (
		<section className="searchbar">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					search();
				}}
			>
				<input
					type="text"
					placeholder="Search eg. big boobs"
					onChange={(e) => setSearchString(e.target.value)}
				/>
				{searchString.length > 0 && (
					<div className="buttons">
						<button className="go" type="button" onClick={search}>
							<HiSearch />
						</button>
						<button className="reset" type="button" onClick={reset}>
							<HiX />
						</button>
					</div>
				)}
			</form>
		</section>
	);
};

export default Searchbar;

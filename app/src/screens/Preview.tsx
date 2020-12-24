import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import * as fetcher from "../helpers/fetcher";
import Image from "../components/Image";
import {
	HiBookOpen,
	HiHeart,
	HiOutlineBookOpen,
	HiOutlineCalendar,
} from "react-icons/hi";
import { group, capitalize, shortenCount } from "../helpers/tags";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Related from "../components/Related";

const Preview = () => {
	// route query
	const { id } = useParams<{ id: string }>();

	// split details based on tags
	const tags = (tags: object[]) => {
		const grouped = group(tags);
		return (grouped.list as string[]).map((group, i) => (
			<div key={i} className="group">
				<div className="group-title">{capitalize(group)}</div>
				<div className="tags-wrap">
					{(grouped[group] as any[]).map((tag, i) => (
						<Link to={`/tag/${tag.id}/${tag.name}`} key={i} className="tag">
							{tag.name}
							<span className="count">{shortenCount(tag.count)}</span>
						</Link>
					))}
				</div>
			</div>
		));
	};

	// react query
	const { data, status } = useQuery(["doujin", id], fetcher.doujin);

	const pageStyles = (imgWidth: number, imgHeight: number) => {
		// using pages' margin, image h/w ratio and window.innerWidth, calculate page width and height
		// margin horizontal = 10, vertical = 5
		const margin = 10;
		const width = window.innerWidth - 2 * margin;
		const height = (width * imgHeight) / imgWidth;
		return { width, height, margin: `${margin / 2}px ${margin}px` };
	};

	return (
		<main className="preview">
			{status === "loading" && <Loading full={true} />}
			{status === "error" && <Error full={true} message="Not Found" />}
			{status === "success" && data && (
				<>
					{/* // details */}
					<section className="details">
						<div className="cover">
							<Image className="bg" {...data.thumbnail} phImg={false} />
							<Image className="main" {...data.thumbnail} phImg={false} />
						</div>
						<div className="content-control">
							<div className="id">{data.doujinId}</div>
						</div>
						<div className="content-container">
							<div className="content">
								<div className="titles">
									{data.titles.pretty} / {data.titles.japanese || "none"} /{" "}
									{data.titles.english}
								</div>
								<div className="date">
									<HiOutlineCalendar />
									{new Date(data.uploadDate).toLocaleDateString()}
								</div>
								<div className="chapters">
									<HiOutlineBookOpen />
									{data.length}
								</div>
								<div className="favorites">
									<HiHeart />
									{data.favorites}
								</div>
								<div className="tags">{tags(data.tags)}</div>
							</div>
						</div>
					</section>

					{/* related doujins */}
					<Related id={data.doujinId} />

					{/* // pages */}
					<div className="chapters-indicator">
						<HiBookOpen />
					</div>
					<section className="pages">
						{(data.pages as any[]).map((page, i) => (
							<div
								key={i}
								className="page"
								style={pageStyles(page.width, page.height)}
							>
								<div className="pg-no">
									{i + 1} of {data.length}
								</div>
								<Image
									className="page-image"
									{...{
										url: page.url,
										height: page.height,
										width: page.width,
										extension: page.extension,
									}}
									phImg={false}
								/>
							</div>
						))}
					</section>
				</>
			)}
		</main>
	);
};

export default Preview;

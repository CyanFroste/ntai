import { HiHashtag } from "react-icons/hi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as fetcher from "../helpers/fetcher";
import Error from "./Error";
import Image from "./Image";
import Loading from "./Loading";

interface RelatedProps {
	id: string | number;
}

const Related = ({ id }: RelatedProps) => {
	const { data: related, status } = useQuery(["related", id], fetcher.related);

	return (
		<section className="related">
			{status === "loading" && <Loading />}
			{status === "error" && (
				<Error message="Failed to get doujins, check your internet connection" />
			)}
			{status === "success" &&
				related &&
				(related.doujins ? (
					<>
						<div className="title">Related</div>
						<div className="view">
							{(related.doujins as any[]).map((item, i) => (
								<Link key={i} to={`/doujin/${item.doujinId}`} className="item">
									<Image
										className="thumbnail"
										{...item.thumbnail}
										phImg={false}
									/>
									<div className="summary">
										<HiHashtag /> {item.doujinId}
									</div>
								</Link>
							))}
						</div>
					</>
				) : (
					<Error message="Not Found" />
				))}
		</section>
	);
};

export default Related;

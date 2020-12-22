import Image from "./Image";
import {
	HiHashtag,
	HiHeart,
	HiOutlineBookOpen,
	HiOutlineTag,
} from "react-icons/hi";
import { group, capitalize } from "../helpers/tags";

interface CardProps {
	item: any;
}
const Card = ({ item }: CardProps) => {
	return (
		<div className="card">
			<Image className="thumbnail" {...item.thumbnail} />
			<section className="summary">
				<div className="id">
					<HiHashtag />
					{item.doujinId}
				</div>
				<div className="title">{item.titles.pretty}</div>
				<div className="chapters">
					<HiOutlineBookOpen />
					{item.length}
				</div>
				<div className="favorites">
					<HiHeart />
					{item.favorites}
				</div>
				<div className="tags">
					{(() => {
						const grouped = group(item.tags);
						return (grouped.list as string[]).map((group, i) => (
							<div key={i} className="group">
								<div className="group-title">
									<HiOutlineTag /> {capitalize(group)}
								</div>
								{(grouped[group] as any[]).map((tag, i) => (
									<span key={i} className="tag">
										{tag.name}
									</span>
								))}
							</div>
						));
					})()}
				</div>
			</section>
		</div>
	);
};

export default Card;

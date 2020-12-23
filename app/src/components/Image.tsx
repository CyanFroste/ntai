import { useQuery } from "react-query";
import * as fetcher from "../helpers/fetcher";
import { useInView } from "react-intersection-observer";

interface ImageProps {
	url: string;
	height: string | number;
	width: string | number;
	extension: string;
	className: string;
}
const Image = ({ url, height, width, extension, className }: ImageProps) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	});
	// react query
	const { data, status } = useQuery(
		["results", url, extension],
		fetcher.image,
		{ enabled: inView }
	);

	return (
		<div ref={ref} id="image" className={className}>
			{status === "loading" && "Loading..."}
			{status === "error" && "Error!"}
			{status === "success" && data && (
				<img height={height} width={width} src={data.src} alt={data.src} />
			)}
		</div>
	);
};
export default Image;

import { useQuery } from "react-query";
import * as fetcher from "../helpers/fetcher";
import { useInView } from "react-intersection-observer";
import Loading from "./Loading";
import Error from "./Error";

interface ImageProps {
	url: string;
	height: string | number;
	width: string | number;
	extension: string;
	className: string;
	phImg?: boolean;
}
const Image = ({
	url,
	height,
	width,
	extension,
	className,
	phImg = true,
}: ImageProps) => {
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
			{status === "loading" && <Loading image={phImg} />}
			{status === "error" && (
				<Error
					image={phImg}
					message="Failed to get image, check your internet connection"
				/>
			)}
			{status === "success" &&
				data &&
				(data.src ? (
					<img height={height} width={width} src={data.src} alt={data.src} />
				) : (
					<Error image={phImg} message="Image Corrupted" />
				))}
		</div>
	);
};
export default Image;

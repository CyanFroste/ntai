import { useQuery } from "react-query";
import * as fetcher from "../helpers/fetcher";

interface ImageProps {
	url: string;
	height: string | number;
	width: string | number;
	extension: string;
	className: string;
}
const Image = ({ url, height, width, extension, className }: ImageProps) => {
	// react query
	const { data, status } = useQuery(["results", url, extension], fetcher.image);

	return (
		<div id="image" className={className}>
			{/* <div className="ph-image"></div> */}
			{status === "loading" && "Loading..."}
			{status === "error" && "Error!"}
			{status === "success" && data && (
				<img height={height} width={width} src={data.src} alt={data.src} />
			)}
		</div>
	);
};
export default Image;

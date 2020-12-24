import ph from "../assets/phl.png";

interface LoadingProps {
	full?: boolean;
	image?: boolean;
}

const Loading = ({ full, image = true }: LoadingProps) => {
	return (
		<div className={"loading " + (full && "fullscreen")}>
			{image && <img id="ph" src={ph} alt="loading-placeholder" />}
			<p className="text">LOADING</p>
		</div>
	);
};

export default Loading;

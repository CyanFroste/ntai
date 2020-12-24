import ph from "../assets/phe.png";

interface ErrorProps {
	full?: boolean;
	message: string;
	image?: boolean;
}
const Error = ({ full, message, image = true }: ErrorProps) => {
	return (
		<div className={"error " + (full && "fullscreen")}>
			{image && <img id="ph" src={ph} alt="error-placeholder" />}
			<p className="text">ERROR</p>
			<p className="message">{message}</p>
		</div>
	);
};

export default Error;

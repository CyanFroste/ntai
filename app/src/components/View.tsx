import Card from "./Card";

interface ViewProps {
	items: any[];
}

const View = ({ items }: ViewProps) => {
	return (
		<div className="view">
			{items.map((item, i) => (
				<Card {...{ key: i, item }} />
			))}
		</div>
	);
};

export default View;

import { useState } from "react";

interface SelectProps {
	title?: string;
	toggle: any;
	options: { value: string | number; display: string | number }[];
	onSelect: Function;
}

const Select = ({ title, toggle, options, onSelect }: SelectProps) => {
	const [isShown, setIsShown] = useState(false);

	return (
		// event bubbling triggers onCLick on .select when backdrop is clicked
		<div className="select" onClick={() => setIsShown(!isShown)}>
			<button className="toggle">{toggle}</button>
			{isShown && (
				<div className="options-background">
					<div className="options">
						{title && <div className="title">{title}</div>}
						{options.map((option, i) => (
							<div
								key={i}
								onClick={() => {
									onSelect(option.value);
								}}
								className="option"
							>
								{option.display}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Select;

import * as IconsList from "react-icons/fa";

const IconPickerItem = ({ icon = 24, size, color }) => {

	if(!IconsList[icon]){
		icon = 'FaQuestion';
	}

	return (
		<div
			className="iconpicker-item"
			style={{ fontSize: size+'px', color: color, padding: "2px" }}
		>
			{IconsList[icon]()}
		</div>
	);
};

export default IconPickerItem;

import * as IconsList from "react-icons/fa";

const IconPickerItem = ({ icon = 24, size, color }) => {

	if(icon === 'fab fa fa-calendar-alt'){
		icon = 'FaCalendarAlt';
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

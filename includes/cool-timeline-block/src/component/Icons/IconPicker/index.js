import {useState} from 'react';
import * as IconsList from "react-icons/fa";

const IconPicker = ({ icon, setIcon, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [icons, setIcons] = useState(Object.keys(IconsList));
    const [searchText, setSearchText] = useState('');

    if(icon === 'fab fa fa-calendar-alt'){
		icon = 'FaQuestion';
	}
    
    const toggleIconPicker = () => {
        setIsOpen(!isOpen);

        if (!isOpen) {
            document.addEventListener('click', documentClick);
        } else {
            document.removeEventListener('click', documentClick);
        }
    };
    
    const documentClick = (event) => {
        if (!event.target.closest('.icon-picker__popup') && !event.target.closest('.icon-picker__selected') && !event.target.classList.contains('icon-picker__selected')) {
            setIsOpen(false);
            document.removeEventListener('click', documentClick);
        }
    };

    const onIconSelect = (icon) => {
        onChange(icon);
        setIsOpen(false);
    };

    const filterIcons = (event) => {
        const searchQuery = event.target.value;
        const filteredIcons = Object.keys(IconsList).filter(icon => icon.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchText(searchQuery);
        setIcons(filteredIcons);
    }

    return (
        <div className="icon-picker">
            <div className="icon-picker__selected" onClick={toggleIconPicker}>
                {IconsList[icon]()}
            </div>
            {isOpen && (
                <div className="icon-picker__popup">
                    <div className="icon-picker__popup-content">
                        <input type="text" placeholder="Search icon" onChange={filterIcons} value={searchText}/>
                        <div className="icon-picker__list">
                            {icons.map((iconName, index) => (
                                <div
                                    className="icon-picker__item"
                                    key={index}
                                    onClick={() => onIconSelect(iconName)}
                                >
                                    {IconsList[iconName]()}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default IconPicker;
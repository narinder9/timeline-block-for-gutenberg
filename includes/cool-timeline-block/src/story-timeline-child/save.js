/**
 * BLOCK: Content timeline child - Save Block
 */

import { IconPickerItem } from 'react-fa-icon-picker-alen';

const {
	RichText
} = wp.blockEditor

export default function Save(props) {
	const {
		icon,
		t_date,
		time_heading,
		time_desc,
		iconToggle,
		iconColor,
		time_image,
		blockPosition,
		timelineDesign,
		timelineLayout,
		imageSize,
		timeLineImage,
		imageAlt,
		headingTag
	} = props.attributes

	const StoryDetail = () => (
		<div className="story-details">
			{timeLineImage !== "none" ?
				<div className={`story-image`}>
					<img src={timeLineImage} alt={imageAlt} className={time_image.id ? `wp-image-${time_image.id}` : null} />
				</div>
				:
				null}
			<div className="story-content">
				<RichText.Content
					className="timeline-block_title"
					tagName={headingTag}
					value={time_heading}
				/>
				<div className='timeline-block_desc'>
					<RichText.Content
						tagName="p"
						value={time_desc}
					/>
				</div>
			</div>
		</div>
	)
	const StoryTime = () => (

		<RichText.Content
			tagName="p"
			value={t_date}
		/>
	)
	const icon_div = <div className="timeline-block-icon">
		{icon !== "" && iconToggle == "true" ? <span className="timeline-block-render-icon" style={{ fill: iconColor }}><IconPickerItem icon={icon} size={24} color={iconColor} /></span> : <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>}
	</div>
	return (
		<div className={"timeline-content icon-" + iconToggle + " "}>
			<div className={`timeline-block-timeline ctl-row  position-${blockPosition}${t_date == '' ? ' ctl_timeFalse' : ''}`}>
				<div className="ctl-6 timeline-block-time">
					{t_date != '' &&
						<div className="story-time">
							{StoryTime()}
						</div>
					}
				</div>
				{icon_div}
				<div className="ctl-6 timeline-block-detail">
					{StoryDetail()}
				</div>
			</div>
		</div>
	)
}
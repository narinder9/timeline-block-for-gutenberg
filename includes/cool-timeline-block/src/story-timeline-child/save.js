/**
 * BLOCK: Content timeline child - Save Block
 */

import { IconPickerItem } from 'react-fa-icon-picker-alen';

const {
	RichText
} = wp.blockEditor

export default function Save( props ) {
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
		imageAlt
	} = props.attributes

	const StoryDetail = () => (
		<div className="story-details">
			{timeLineImage !== "none" ?
			<div className={`story-image`}>
			<img  src={timeLineImage}  alt={imageAlt}/>
			</div>
			:
			null}
			<div className="story-content">
			<RichText.Content
				tagName="h3"
				value={ time_heading }
			/>
			<RichText.Content
				tagName="p"
				value={ time_desc }
				/>
		</div>
			</div>
	 )
	const StoryTime = () => (
		
			<RichText.Content
				tagName="p"
				value={t_date}								
				/>
	)
		const icon_div =  <div className="timeline-block-icon">
			{icon !== "" && iconToggle == "true" ? <span className="timeline-block-render-icon" style={{fill:iconColor}}><IconPickerItem icon={icon} size={24} color={iconColor} /></span>:null}
			</div> 
	return (
		<div className={"timeline-content icon-"+iconToggle+" "}>
			<div className = {" timeline-block-timeline ctl-row  position-" +blockPosition+""}>
				<div className="ctl-6 timeline-block-time">
					<div className="story-time">
						{StoryTime()}
					</div>
				</div>
						{icon_div}
				<div className="ctl-6 timeline-block-detail">						
						{StoryDetail()} 
				</div>
			</div>
	</div>
	)
}

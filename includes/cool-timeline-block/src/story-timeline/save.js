/**
 * BLOCK: Timeline - Save Block
 */
import { Fragment } from "react"
import contentTimelineStyle from "./styling.js"
import { IconPickerItem } from 'react-fa-icon-picker-alen';

const {
	InnerBlocks,
} = wp.blockEditor

export default function Save(props) {
	const {
		block_id,
		timelineLayout,
		Orientation,
		timelineDesign,
		slidePerView,
		timelineStyle,
		timelineNavItems
	} = props.attributes
	const InnerBlocksLength = () => {
		let blocksCount = wp.data.select("core/block-editor").getBlockCount(block_id)
		return blocksCount;
	}

	const circleIcons=<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>;
	const navItems='' !== timelineNavItems ? JSON.parse(timelineNavItems) : '';
	return (
		<div className = {"cool-timeline-block-"+block_id+""}>
			{'' !== contentTimelineStyle( props ) &&
			<style dangerouslySetInnerHTML={{ __html: contentTimelineStyle( props ) }}/>
			}
			<div className={`cool-${timelineLayout}-timeline-body ctlb-wrapper ${timelineDesign} ${Orientation} ${timelineStyle}`}>
		 		<div className="cool-timeline-block-list">
				 {timelineLayout == "horizontal" ?
				 <>
				 {'design-1' === timelineStyle &&
				 <div className='ctlb-nav-swiper-outer'>
                 <div className='swiper'>
                     <div className='swiper-wrapper'>
                         {Object.values(navItems).map((items,index)=>{
                            return <div className='swiper-slide' key={index}>
                             <p className="ctlb_nav_date">{items.t_date}</p>
                             <div className={`ctlb_nav_icon ${'false' !== items.iconToggle ? 'ctlb_nav_icon_true' : ''}`}>
                                 {'false' === items.iconToggle ? circleIcons :
                                 <span className="ctl_nav_icons" style={{ fill: items.iconColor }}><IconPickerItem icon={items.icon} size={24} color={items.iconColor} /></span>
                                 }
                             </div>
                          </div>
                         })}
                     </div>
                 </div>
            	 </div>
				 }
				 <div class= "swiper-outer" id={block_id} data-slide={InnerBlocksLength < slidePerView ? InnerBlocksLength :slidePerView }>
				 <div class="swiper">
					   <div class="swiper-wrapper cvbt-horizontal-swiper">
				 <InnerBlocks.Content />
				 </div>
				</div>
				 <div class="swiper-pagination"></div>
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
				</div>
				</>
				 :
				 <InnerBlocks.Content />
				 }
		 		</div>
		 	</div> 
		</div>
	)
}

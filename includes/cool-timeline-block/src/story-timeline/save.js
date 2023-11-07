/**
 * BLOCK: Timeline - Save Block
 */
import { Fragment } from "react"
import contentTimelineStyle from "./styling.js"

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
		timelineStyle
	} = props.attributes
	const InnerBlocksLength = () => {
		let blocksCount = wp.data.select("core/block-editor").getBlockCount(block_id)
		return blocksCount;
	}
	const timelineStyles='horizontal' === timelineLayout ? timelineStyle : '';
	return (
		<div className = {"cool-timeline-block-"+block_id+""}>
			{'' !== contentTimelineStyle( props ) &&
			<style dangerouslySetInnerHTML={{ __html: contentTimelineStyle( props ) }}/>
			}
			<div className={`cool-${timelineLayout}-timeline-body ctlb-wrapper ${timelineDesign} ${Orientation} ${timelineStyles}`}>
		 		<div className="cool-timeline-block-list">
				 {timelineLayout == "horizontal" ?
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
				 :
				 <InnerBlocks.Content />
				 }
		 		</div>
		 	</div> 
		</div>
	)
}

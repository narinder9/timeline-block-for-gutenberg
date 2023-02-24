/**
 * BLOCK: Timeline - Save Block
 */

import contentTimelineStyle from "./styling.js";

const {
	InnerBlocks,
} = wp.blockEditor

export default function Save( props ) {
	const {
		block_id,
		timelineLayout,
		Orientation,
		timelineDesign,
		slidePerView
	} = props.attributes
	const InnerBlocksLength = () => {
		return wp.data.select("core/block-editor").getBlockCount(block_id);
	}
	return (
		<div className = {"cool-timeline-block-"+block_id+""}>
			<style dangerouslySetInnerHTML={{ __html: contentTimelineStyle( props ) }} scoped="true"/>
			<div className={"cool-"+timelineLayout+"-timeline-body " +timelineDesign+" "+Orientation+""}>
		 		<div className="cool-timeline-block-list" >
   				     <InnerBlocks.Content />
		 		</div>
		 	</div> 
		</div>
	)
}

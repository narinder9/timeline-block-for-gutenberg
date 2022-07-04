/**
 * BLOCK: Timeline - Save Block
 */

import classnames from "classnames"
import { Fragment } from "react"
import contentTimelineStyle from "./styling"


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
		let blocksCount = wp.data.select("core/block-editor").getBlockCount(block_id)
		return blocksCount
	}
	return (
	
			
		<div className = {"cool-timeline-block-"+block_id+""}>
			<style dangerouslySetInnerHTML={{ __html: contentTimelineStyle( props ) }} scoped="true"/>
			<div className={"cool-"+timelineLayout+"-timeline-body " +timelineDesign+" "+Orientation+""}>
		 		<div className="list" >
				 
		 		</div>
		 	</div> 
		</div>
		
	)
}

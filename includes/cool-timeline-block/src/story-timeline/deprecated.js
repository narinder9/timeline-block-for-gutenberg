import "./style.scss"
import attributes from "./attributes"
import { __ } from '@wordpress/i18n';

import { Fragment } from "react"
import contentTimelineStyle from "./deprecated"
const { useBlockProps,InnerBlocks } = wp.blockEditor;

export default [
	{
		attributes,
		save: props => {
			const Save = (props) => {
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

			const blockProps = useBlockProps.save({className: 'Cool-Content-Timeline'});

            return(
            <div {...blockProps}>
            <Save { ...props } />
            </div> );
		}
	}
]
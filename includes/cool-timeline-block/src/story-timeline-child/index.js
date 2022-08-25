/**
 * BLOCK: Content Timeline Child
 */


import "../style.scss"
import "./style.scss"
import Save from "./save"
import attributes from "./attributes"
import Edit from "./edit"

import { CoolStoryIcon } from '../component/icon/insertorIcon';
const { useBlockProps } = wp.blockEditor;
import { __ } from '@wordpress/i18n';

const {
	registerBlockType
} = wp.blocks

registerBlockType( "cp-timeline/content-timeline-block-child", {
	title: __( 'Cool Timeline Story', 'cool-timeline' ), // Block title.
	apiVersion: 2,
	icon: CoolStoryIcon,
	keywords: [
		__( "Content Timeline",'timeline-block' ),
		__( "Timeline",'timeline-block' ),
	],
	supports: {
		inserter: false,	
	},
	attributes,
	edit: props =>{
		const chilblockProps = useBlockProps( {
			className: 'swiper-slide',
		  } );
		return(
		
		<div {...chilblockProps}>
			<Edit {...props} />
		</div>
		)
	},
	save: props =>{
		const chilblockProps = useBlockProps.save({className: 'swiper-slide'});
		return(
		
			<div {...chilblockProps}>
				<Save {...props} />
			</div>
			)
		}
})


/**
 * BLOCK: Content Timeline Child
 */
import "./style.scss"
import Save from "./save.js"
import attributes from "./attributes.js"
import deprecated from "./deprecated.js"
import Edit from "./edit.js"
import { CoolStoryIcon } from '../component/icon/insertorIcon.js';
const { useBlockProps } = wp.blockEditor;
import { __ } from '@wordpress/i18n';
const {
	registerBlockType
} = wp.blocks

registerBlockType("cp-timeline/content-timeline-block-child", {
	title: __('Single Story Details', 'cool-timeline'), // Block title.
	apiVersion: 2,
	icon: CoolStoryIcon,
	keywords: [
		__("Content Timeline", 'timeline-block'),
		__("Timeline", 'timeline-block'),
	],
	supports: {
		inserter: false,
	},
	attributes,
	deprecated,
	usesContext: ['cp-timeline/timelineDesign', 'cp-timeline/timelineLayout'],
	edit: props => {
		const chilblockProps = useBlockProps({
			className: 'swiper-slide',
		});
		return (
			<div {...chilblockProps}>
				<Edit {...props} />
			</div>
		)
	},
	save: props => {
		const chilblockProps = useBlockProps.save({ className: 'swiper-slide' });
		return (
			<div {...chilblockProps}>
				<Save {...props} />
			</div>
		)
	}
})


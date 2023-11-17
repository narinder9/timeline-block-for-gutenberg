/**
 * BLOCK: Cool Timeline Child Attributes
 */

import { __ } from '@wordpress/i18n';

const attributes = {
	key:{
		type:"number"
	},
	order:{
		type:"string"
	},
	iconColor:{
		type:"string",
		default:"white"
	},
	cutom:{
		type:"string"
	},
	content_class: {
		type : "string",
	},
	dayalign_class: {
		type : "string",
	},
	imageSize:{
		type:"string",
		default:"full"
	},
	time_heading:{
		type: "string",
		default:__( "Timeline Heading ",'timeline-block' )
	},
	time_image:{
		type: "object",
		default:{}
	},
	time_desc:{
		type: "string",
		default:__( "This is Timeline description, you can change me anytime click here ",'timeline-block' )
	},
	timeLineImage:{
		type:"string",
		default:"none"
	},
	dateFormat: {
		type: "string",
		default: "F j, Y"
	},
	align : {
		type : "string",
		default : "center",
	},
	headingTag : {
		type : "string",
		default : "h4",
	},
	timelinAlignment : {
		type : "string",
		default : "center",
	},
	arrowlinAlignment : {
		type : "string",
		default : "center",
	},
	block_id  : {
		type : "string",
		default : "0",
	},
	timelineItem :{
		type : "number",
		default : 5,
	},
	tm_client_id  : {
		type : "string",
		default : "not_set",
	},
	iconSize : {
		type : "number",
		default : 12,
	},
	icon : {
		type : "string",
		default : "fab fa fa-calendar-alt"
	},
	t_date : {
		type: "string",
		default: '1/1/2019',
	},
	displayPostDate:{
		type: "boolean",
	},
	stack: {
		type: "string",
		default: "tablet"
	},
	iconType: {
		type: "string",
		default: "icon-library"
	},
	iconToggle: {
		type: "string",
		default: "false"
	},
	blockPosition:{
		type:"string",
	},

	block_position_active:{
		type:"boolean",
		default:true

	},
	timelineLayout:{ // context
		type:"string",
		default:"vertical"
	},

	timelineDesign:{ // context
		type:"string",
		default:"both-sided"
	},
	imageOption:{
		type:"array",
		default:[{label:"Full",value:"full"}]
	},
	imageAlt:{
		type:"string",
		default:"",
	},
	storyPositionHide:{
		type:"bollean",
		default:true,
	},
	headingTag:{
		type:"string",
		default:'h3',
	},
	timelineStyle: {
		type:"string",
		default:""
	},
}

export default attributes

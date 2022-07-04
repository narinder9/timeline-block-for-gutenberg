/**
 * BLOCK: Story Timeline.
 */

import classnames from "classnames"
// import map from "lodash/map"
import times from "lodash/times"
import memoize from "memize"

import contentTimelineStyle from "./styling"
import {LayoutInit} from "./layout"

// Import all of our Text Options requirements.
import TypographyControl from "../component/typography"

// // Import Web font loader for google fonts.y
import WebfontLoader from "../component/typography/fontloader"

const { dateI18n } = wp.date

const { Component, Fragment } = wp.element

import { __ } from '@wordpress/i18n';


const {
	BlockControls,
	InspectorControls,
	BlockAlignmentToolbar,
	PanelColorSettings,
	InnerBlocks,
	
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	TabPanel,
	Toolbar, 
	ToolbarDropdownMenu,
	Spinner,
	ColorPicker,
	ColorPalette 
} = wp.components

const {
	dispatch,
	select,
	withSelect
} = wp.data

const ALLOWED_BLOCKS = [ "cp-timeline/content-timeline-child" ]



const $ = jQuery;

class Edit extends Component {


	addBlock(e){
	
		let index = wp.data.select("core/block-editor").getBlockCount(this.props.clientId)
		
		let name = 'cp-timeline/content-timeline-child';
		let insertedBlock = wp.blocks.createBlock(name, {block_position_active:false
		}	);
		wp.data.dispatch('core/block-editor').insertBlocks(insertedBlock,index+1,this.props.clientId);	
		let blocksCount = wp.data.select("core/block-editor").getBlockCount(this.props.clientId)
		
			}

		
render() {
	
		// Setup the attributes.
		const {
			setAttributes,
			attributes: {
				LineColor,
				timelineLayout,
				tm_content,
				headingColor,
				subHeadingColor,
				headFontSizeType,
				headFontSize,
				headFontSizeTablet,
				headFontSizeMobile,
				headFontFamily,
				headFontWeight,
				headFontSubset,
				headLineHeightType,
				headLineHeight,
				headLineHeightTablet,
				headLineHeightMobile,
				headLoadGoogleFonts,
				timelineItem,
				subHeadFontSizeType,
				subHeadFontSize,
				subHeadFontSizeTablet,
				subHeadFontSizeMobile,
				subHeadFontFamily,
				subHeadFontWeight,
				subHeadFontSubset,
				subHeadLineHeightType,
				subHeadLineHeight,
				subHeadLineHeightTablet,
				subHeadLineHeightMobile,
				subHeadLoadGoogleFonts,
				dateColor,
				storyBorderColor,
				dateFontsizeType,
				dateFontsize,
				dateFontsizeTablet,
				dateFontsizeMobile,
				dateFontFamily,
				dateFontWeight,
				dateFontSubset,
				dateLineHeightType,
				dateLineHeight,
				dateLineHeightTablet,
				dateLineHeightMobile,
				dateLoadGoogleFonts,
				iconBg,
				Orientation,
				timelineDesign,
				slidePerView,
				iconColor
			
				
			},
		} = this.props
		
		const colors = [
			{ name: 'red', color: '#f00' },
			{ name: 'white', color: '#fff' },
			{ name: 'blue', color: '#00f' },
		];
		var element = document.getElementById( "cool-vertical-timeline-style-" + this.props.clientId )

		if( element ) {
			element.innerHTML = contentTimelineStyle( this.props )
			}
		
		const orientation_setting= <SelectControl
						label={ __( "Alignment" ) }
						value={ Orientation }
						onChange={ ( value ) =>{ setAttributes( { Orientation: value } )} }
						options={ [
							{ value: "right", label: __( "Right Sided") },
							{ value: "left", label: __( "Left Sided") },
						] }
						/>
		const general_setting= <PanelBody title={__("General Settings")} initialOpen={ false }>
			<h2 style={{'font-weight':600}}>Story Heading</h2>
			<TypographyControl
			label={ __( "Typography",'timeline-block' ) }
			attributes = { this.props.attributes }
			setAttributes = { setAttributes }
			loadGoogleFonts = { { value: headLoadGoogleFonts, label: 'headLoadGoogleFonts' } }
			fontFamily = { { value: headFontFamily, label: 'headFontFamily' } }
			fontWeight = { { value: headFontWeight, label: 'headFontWeight' } }
			fontSubset = { { value: headFontSubset, label: 'headFontSubset' } }
			fontSizeType = { { value: headFontSizeType, label: 'headFontSizeType' } }
			fontSize = { { value: headFontSize, label: 'headFontSize' } }
			fontSizeMobile = { { value: headFontSizeMobile, label: 'headFontSizeMobile' } }
			fontSizeTablet= { { value: headFontSizeTablet, label: 'headFontSizeTablet' } }
			lineHeightType = { { value: headLineHeightType, label: 'headLineHeightType' } }
			lineHeight = { { value: headLineHeight, label: 'headLineHeight' } }
			lineHeightMobile = { { value: headLineHeightMobile, label: 'headLineHeightMobile' } }
			lineHeightTablet= { { value: headLineHeightTablet, label: 'headLineHeightTablet' } }
		/>
		<div style ={{'margin-top':10 +'px'}}></div>
		<ColorPalette
			colors = {colors}
			value={headingColor}
            onChange = {( colorValue ) => setAttributes( { headingColor: colorValue } )}
			
        />
		<hr className="timeline-block-editor__separator"></hr>
		<h2 style={{'font-weight':600}}>Story Description</h2>
			<TypographyControl
			label={ __( "Typography",'timeline-block' ) }
			attributes = { this.props.attributes }
			setAttributes = { setAttributes }
			loadGoogleFonts = { { value: subHeadLoadGoogleFonts, label: 'subHeadLoadGoogleFonts' } }
			fontFamily = { { value: subHeadFontFamily, label: 'subHeadFontFamily' } }
			fontWeight = { { value: subHeadFontWeight, label: 'subHeadFontWeight' } }
			fontSubset = { { value: subHeadFontSubset, label: 'subHeadFontSubset' } }
			fontSizeType = { { value: subHeadFontSizeType, label: 'subHeadFontSizeType' } }
			fontSize = { { value: subHeadFontSize, label: 'subHeadFontSize' } }
			fontSizeMobile = { { value: subHeadFontSizeMobile, label: 'subHeadFontSizeMobile' } }
			fontSizeTablet= { { value: subHeadFontSizeTablet, label: 'subHeadFontSizeTablet' } }
			lineHeightType = { { value: subHeadLineHeightType, label: 'subHeadLineHeightType' } }
			lineHeight = { { value: subHeadLineHeight, label: 'subHeadLineHeight' } }
			lineHeightMobile = { { value: subHeadLineHeightMobile, label: 'subHeadLineHeightMobile' } }
			lineHeightTablet= { { value: subHeadLineHeightTablet, label: 'subHeadLineHeightTablet' } }
		/>
		<div style ={{'margin-top':10 +'px'}}></div>
		<ColorPalette
			colors = {colors}
            value={subHeadingColor}
            onChange = {( colorValue ) => setAttributes( { subHeadingColor: colorValue } )}
			
        />
		<hr className="timeline-block-editor__separator"></hr>
		<h2 style={{'font-weight':600}}>Primary Label(Date/Steps)</h2>
			<TypographyControl
			label={ __( "Typography",'timeline-block' ) }
			attributes = { this.props.attributes }
			setAttributes = { setAttributes }
			loadGoogleFonts = { { value: dateLoadGoogleFonts, label: 'dateLoadGoogleFonts' } }
			fontFamily = { { value: dateFontFamily, label: 'dateFontFamily' } }
			fontWeight = { { value: dateFontWeight, label: 'dateFontWeight' } }
			fontSubset = { { value: dateFontSubset, label: 'dateFontSubset' } }
			fontSizeType = { { value: dateFontsizeType, label: 'dateFontsizeType' } }
			fontSize = { { value: dateFontsize, label: 'dateFontsize' } }
			fontSizeMobile = { { value: dateFontsizeMobile, label: 'dateFontsizeMobile' } }
			fontSizeTablet= { { value: dateFontsizeTablet, label: 'dateFontsizeTablet' } }
			lineHeightType = { { value: dateLineHeightType, label: 'dateLineHeightType' } }
			lineHeight = { { value: dateLineHeight, label: 'dateLineHeight' } }
			lineHeightMobile = { { value: dateLineHeightMobile, label: 'dateLineHeightMobile' } }
			lineHeightTablet= { { value: dateLineHeightTablet, label: 'dateLineHeightTablet' } }
		/>
		<div style ={{'margin-top':10 +'px'}}></div>
		<ColorPalette
			colors = {colors}
            value={dateColor}
            onChange = {( colorValue ) => setAttributes( { dateColor: colorValue} )}
			
        />
		
	</PanelBody> 
	const advanced_setting =
				<PanelBody title={__("Advanced Settings")} initialOpen={ false }>
				<h2>Line Color</h2>
				<ColorPalette
				colors = {colors}
				value={LineColor}
				onChange = {( colorValue ) => setAttributes( { LineColor: colorValue} )}
				/>
				
				<h2>Icon Color</h2>
				<ColorPalette
				colors = {colors}
				value={iconColor}
				onChange = {( colorValue ) => setAttributes( { iconColor: colorValue } )}
				/>

				<h2>Icon Background</h2>
				<ColorPalette
				colors = {colors}
				value={iconBg}
				onChange = {( colorValue ) => setAttributes( { iconBg: colorValue } )}
				/>
				<h2>Story Border Color</h2>
				<ColorPalette
				colors = {colors}
				value={storyBorderColor}
				onChange = {( colorValue ) => setAttributes( { storyBorderColor: colorValue } )}
				/>
					
			</PanelBody>
		const timeline_setting = <InspectorControls>
			<PanelBody title={__("Timeline Settings")} >
			<SelectControl
						label={ __( "Timeline Layout" ) }
						value={ timelineLayout }
						onChange={(value)=>{
							if(value == "vertical"){
							setAttributes({timelineLayout:value,sliderActive:false})
							}
							else{
								setAttributes({timelineLayout:value})
								jQuery(".timeline-block-pre-loader").css('display','block')
							}
							select('core/block-editor').getBlocksByClientId(this.props.clientId)[0].innerBlocks.forEach(function (block,key) {
								dispatch('core/block-editor').updateBlockAttributes(block.clientId, ({ timelineLayout: value }))
							})
						}
					}
						options={ [
							{ value: "vertical", label: __( "Vertical") }
							
						] }
						/>
					{timelineLayout == "vertical" ?
			<SelectControl
						label={ __( "Timeline Design" ) }
						value={ timelineDesign }
						onChange={ ( value ) => {setAttributes( { timelineDesign: value } )
						select('core/block-editor').getBlocksByClientId(this.props.clientId)[0].innerBlocks.forEach(function (block,key) {
							dispatch('core/block-editor').updateBlockAttributes(block.clientId, ({ timelineDesign: value }))
						})
					} }
						options={ [
							{ value: "both-sided", label: __( "Both Sided") },
							{ value: "one-sided", label: __( "One Sided",) },
							
						] }
						/>
						:
						null
					// 	<RangeControl
					// 	label="Slides"
					// 	value={ slidePerView }
					// 	onChange={ ( value ) => {
					// 		setAttributes({slidePerView: value,sliderActive:false})
					// 	}
					// 	}
					// 	min={ 1 }
					// 	max={ 4 }
					// 	step={ 1 }
					// />
					}

					{timelineDesign == "one-sided" && timelineLayout == "vertical" ? orientation_setting : null }
			</PanelBody>
			{general_setting}
			{advanced_setting}
			</InspectorControls>

			const getContentTimelineTemplate = memoize( ( icon_block, tm_content ) => {
				return times( icon_block, n => [ 'cp-timeline/content-timeline-child',tm_content[n]] )
			} )

				let loadHeadGoogleFonts
				let loadSubHeadGoogleFonts
				let loadDateGoogleFonts

				if( headLoadGoogleFonts == true ) {

					const headconfig = {
						google: {
							families: [ headFontFamily + ( headFontWeight ? ":" + headFontWeight : "" ) ],
						},
					}

					loadHeadGoogleFonts = (
						<WebfontLoader config={ headconfig }>
						</WebfontLoader>
					)
				}

				if( subHeadLoadGoogleFonts == true ) {

					const subHeadconfig = {
						google: {
							families: [ subHeadFontFamily + ( subHeadFontWeight ? ":" + subHeadFontWeight : "" ) ],
						},
					}

					loadSubHeadGoogleFonts = (
						<WebfontLoader config={ subHeadconfig }>
						</WebfontLoader>
					)
				}

				if( dateLoadGoogleFonts == true ) {

					const dateconfig = {
						google: {
							families: [ dateFontFamily + ( dateFontWeight ? ":" + dateFontWeight : "" ) ],
						},
					}

					loadDateGoogleFonts = (
						<WebfontLoader config={ dateconfig }>
						</WebfontLoader>
					)
				}

				
				
				return (
					<Fragment>
						  <div>
							  { timelineDesign == "vertical" ?
				      <BlockControls group="block">
						<ToolbarDropdownMenu
							icon="layout"
							label="Layout"
							controls={ [
								{
									title: 'Both Sided',                  
									onClick: () => setAttributes({timelinDesign:"both-sided"}) ,
								},
								{
									title: 'One Sided',
									onClick: () => setAttributes({timelinDesign:"one-sided"}),
								},
							] }
							/>
					</BlockControls>
						:null}
					{ loadHeadGoogleFonts }
					 {loadSubHeadGoogleFonts }
					{timeline_setting}
					{loadDateGoogleFonts }
				
				<div className={"cool-timeline-block-" + this.props.clientId + " cool-timeline-block"}>
								<div className={"cool-" + timelineLayout + "-timeline-body " + timelineDesign + " " + Orientation + ""}>
									<div className="list">
									{timelineLayout == "vertical" ?
										<InnerBlocks
                                            allowedBlocks={ALLOWED_BLOCKS}
                                            orientation="vertical"
                                            template={ getContentTimelineTemplate( timelineItem, tm_content ) }
                                            
                                            />:
											<LayoutInit />
										}
								</div>	
							</div><div onClick={e => this.addBlock(e)} className="timeline-block-add-story">
									<button type="button" visible="true" class="components-button block-editor-button-block-appender is-primary" aria-label="Add Story"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-hidden="true" focusable="false"><path d="M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"></path></svg>Add Story</button>
								</div>
								</div>
			</div>
				</Fragment>
		
		)
	}

	componentDidMount() {
		// //Store client id.
		this.props.setAttributes( { block_id: this.props.clientId } )
		
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "cool-vertical-timeline-style-" + this.props.clientId )
		document.head.appendChild( $style )
		
		let timelineLayout= this.props.attributes.timelineLayout
		let timelineDesign= this.props.attributes.timelineDesign
		
	}
	
	componentDidUpdate(){
		let clientId= this.props.clientId 
		
		
		

	}

}export default 
( Edit )
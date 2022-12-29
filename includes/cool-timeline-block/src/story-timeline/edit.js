import classnames from "classnames"
import preview from "../component/icon/timeline.png"
// import map from "lodash/map"
import times from "lodash/times"
import memoize from "memize"

import contentTimelineStyle from "./styling"

// Import all of our Text Options requirements.
import TypographyControl from "../component/typography"

import SpacingControl from "../component/customComponents/MultipleUnits"

// // Import Web font loader for google fonts.y
import WebfontLoader from "../component/typography/fontloader"

const { dateI18n } = wp.date

const { Component, Fragment } = wp.element

import { __ } from '@wordpress/i18n';
import { sentenceCaseTransform } from "sentence-case"
import attributes from "./attributes"
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
	ColorPalette,
    RadioControl,
	ExternalLink,
	Card,
	CardBody,
	CardFooter,
	Button,
	ButtonGroup,
	__experimentalUnitControl,
	ToggleControl
} = wp.components

const {
	dispatch,
	select,
	withSelect,
} = wp.data

const ALLOWED_BLOCKS = [ "cp-timeline/content-timeline-block-child" ]


const $ = jQuery;

class Edit extends Component {
	constructor() {
		super();
		this.onUpdateOrientation = this.onUpdateOrientation.bind(this);
	}

	addBlock(e){
		let position=this.props.attributes.BothsidedOrientation;
		let index = wp.data.select("core/block-editor").getBlockCount(this.props.clientId);
		let name = 'cp-timeline/content-timeline-block-child';
		const oddPosition = position,
		evenPosition = position == 'right' ? 'left' : 'right';
		let insertedBlock = wp.blocks.createBlock(name, {block_position_active:false,blockPosition:index % 2 ? evenPosition:oddPosition,
		}	);
		wp.data.dispatch('core/block-editor').insertBlocks(insertedBlock,index+1,this.props.clientId);
		let blocksCount = wp.data.select("core/block-editor").getBlockCount(this.props.clientId)
		
	}
	
	onUpdateOrientation(newOrientation,position) {
		console.log(position);
		this.props.attributes.timelineDesign == "both-sided" && this.props.setAttributes({BothsidedOrientation: newOrientation});
		this.props.setAttributes({Orientation: newOrientation});
		if (this.props.attributes.timelineLayout == "vertical" && this.props.attributes.timelineDesign == "both-sided") {
			const blocks = select("core/block-editor").getBlock(this.props.clientId).innerBlocks,
			evenPosition = newOrientation,
			oddPosition = newOrientation === 'left' ? 'right' : 'left';
			blocks.forEach((block, index) => {block.attributes.blockPosition = index % 2 ? oddPosition : evenPosition, block.attributes.storyPositionHide=!position});
		}
	}
	resetcolorpalate = (e) => {
		this.props.setAttributes.setAttributes( e )
	};
	OrientationCheck = (e) => {
		const blocks = select("core/block-editor").getBlock(this.props.clientId).innerBlocks
		const position = blocks[0]['attributes']['blockPosition'];
		this.onUpdateOrientation(position,e);
	}
        render() {

		// Setup the attributes.
		const {
			setAttributes,
			attributes: {
				itemSpacing,
				contentAlignment,
				LineColor,
				timelineLayout,
				tm_content,
				headingColor,
				subHeadingColor,
				titileBtSpacing,
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
				descBtSpacing,
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
				iconColor,
				iconSize,
				iconSizeType,
				iconBoxSize,
				iconBoxSizeType,
				middleLineSize,
				middleLineSizeType,
				containerTopPadding,
				containerRightPadding,
				containerBottomPadding,
				containerLeftPadding,
				desktopConatinerPaddingType,
				marginLink,
				isPreview,
				OrientationCheckBox
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

		const orientation_setting = ((timelineLayout == "vertical" && timelineDesign == 'one-sided') || (timelineLayout == "vertical" && timelineDesign == 'both-sided' && OrientationCheckBox)) ?
						<Fragment><SelectControl
						label={ timelineDesign == "both-sided" ? __("first story Based") : __( "Alignment" ) }
						value={ Orientation }
						onChange={ this.onUpdateOrientation }
						options={ [
							{ value: "right", label: __( "Right Sided","timeline-block") },
							{ value: "left", label: __( "Left Sided","timeline-block") },
						] }
						/>
						{/* <p>Using this settings user need to select first story position from the Story Position. other stories  would be placed on the left/right automatically in alternatively.</p> */}
						</Fragment>:null;
		
		const general_setting=<CardBody>
			<h2 style={{fontWeight: 600}}>Story Heading</h2>
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
		<div style ={{'margin-top':15 +'px'}}></div>
		<CardBody className="cp-timeline-block-style-settings">
		<div>{__("Text Color","timeline-block")}</div>
		<div class="components-button timeline-block-colorpallete-reset is-small" onClick={e => this.resetcolorpalate({headingColor : ''}) }><span class="dashicon dashicons dashicons-image-rotate"></span></div>
		<ColorPalette className="cp-timeline-block-color-palates"
			// colors = {colors}
			clearable={false}
			value={headingColor}
            onChange = {( colorValue ) => setAttributes( { headingColor: colorValue } )}

        />

		</CardBody>
		<div style ={{'margin-top':15 +'px'}}>{__("Bottom Spacing","timeline-block")}</div>
		<RangeControl
		className="cp-timeline-block-range__control"
		value={ Number(`${titileBtSpacing != '' ? titileBtSpacing : 0}`) }
		onChange={ (value) => setAttributes({titileBtSpacing: value}) }
		resetFallbackValue={0}
		allowReset={ true }
		min={ 0 }
        max={ 200 }
		/>
		<hr className="timeline-block-editor__separator"></hr>
		<h2 style={{fontWeight: 600}}>Story Description</h2>
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
		<CardBody className="cp-timeline-block-style-settings">
		<div>{__("Text Color","timeline-block")}</div>
		<div class="components-button timeline-block-colorpallete-reset is-small" onClick={e => this.resetcolorpalate({subHeadingColor : ''}) }><span class="dashicon dashicons dashicons-image-rotate"></span></div>
		{/* <div style ={{'margin-top':10 +'px'}}></div> */}
		<ColorPalette className="cp-timeline-block-color-palates"
			// colors = {colors}
			clearable={false}
			value={subHeadingColor}
			onChange = {( colorValue ) => setAttributes( { subHeadingColor: colorValue } )}
		/>
		</CardBody>
		<div style ={{'margin-top':15 +'px'}}>{__("Bottom Spacing","timeline-block")}</div>
		<RangeControl
		className="cp-timeline-block-range__control"
		value={Number(`${descBtSpacing != '' ? descBtSpacing : 0}`) }
		onChange={ (value) => setAttributes({descBtSpacing: value}) }
		resetFallbackValue = {0}
		allowReset={ true }
		min={ 0 }
        max={ 200 }
		/>
		<hr className="timeline-block-editor__separator"></hr>
		<h2 style={{fontWeight: 600}}>Primary Label(Date/Steps)</h2>
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
		<CardBody className="cp-timeline-block-style-settings">
		<div>{__("Text Color","timeline-block")}</div>
		<div class="components-button timeline-block-colorpallete-reset is-small" onClick={e => this.resetcolorpalate({dateColor : ''}) }><span class="dashicon dashicons dashicons-image-rotate"></span></div>
		{/* <div style ={{'margin-top':10 +'px'}}></div> */}
		<ColorPalette className="cp-timeline-block-color-palates"
			// colors = {colors}
			clearable={false}
            value={dateColor}
            onChange = {( colorValue ) => setAttributes( { dateColor: colorValue} )}

        />
		</CardBody>
	</CardBody>
	const advanced_setting =
				<CardBody>
				<CardBody className="cp-timeline-block-style-settings">
				<h2>Line Color</h2>
				<div class="components-button timeline-block-colorpallete-reset is-small" onClick={e => this.resetcolorpalate({LineColor : '#000'}) }><span class="dashicon dashicons dashicons-image-rotate"></span></div>
				<ColorPalette className="cp-timeline-block-color-palates"
				// colors = {colors}
				clearable={false}
				value={LineColor}
				onChange = {( colorValue ) => setAttributes( { LineColor: colorValue} )}
				/>
				</CardBody>
				<CardBody className="cp-timeline-block-style-settings">
				<h2>Icon Color</h2>
				<div class="components-button timeline-block-colorpallete-reset is-small" onClick={e => this.resetcolorpalate({iconColor : ''}) }><span class="dashicon dashicons dashicons-image-rotate"></span></div>
				<ColorPalette className="cp-timeline-block-color-palates"
				// colors = {colors}
				clearable={false}
				value={iconColor}
				onChange = {( colorValue ) => setAttributes( { iconColor: colorValue } )}
				/>
				</CardBody>
				<CardBody className="cp-timeline-block-style-settings">
				<h2>Icon Background</h2>
				<div class="components-button timeline-block-colorpallete-reset is-small" onClick={e => this.resetcolorpalate({iconBg : ''}) }><span class="dashicon dashicons dashicons-image-rotate"></span></div>
				<ColorPalette className="cp-timeline-block-color-palates"
				// colors = {colors}
				clearable={false}
				value={iconBg}
				onChange = {( colorValue ) => setAttributes( { iconBg: colorValue } )}
				/>
				</CardBody>
				<CardBody className="cp-timeline-block-style-settings">
				<h2>Story Border Color</h2>
				<div class="components-button timeline-block-colorpallete-reset is-small" onClick={e => this.resetcolorpalate({storyBorderColor : ''}) }><span class="dashicon dashicons dashicons-image-rotate"></span></div>
				<ColorPalette className="cp-timeline-block-color-palates"
				// colors = {colors}
				clearable={false}
				value={storyBorderColor}
				onChange = {( colorValue ) => setAttributes( { storyBorderColor: colorValue } )}
				/>
				</CardBody>
				<h2>{__("Item Spacing","timeline-block")}</h2>
				<RangeControl
				className="cp-timeline-block-range__control"
				value={Number(`${itemSpacing != '' ? itemSpacing : 0}`) }
				onChange={ (value) => setAttributes({itemSpacing: value}) }
				resetFallbackValue = {0}
				allowReset={ true }
				min={ 0 }
				max={ 200 }
				/>
				<h2>{__("Icon Box Size","timeline-block")}</h2>
				<RangeControl
				className="cp-timeline-block-range__control"
				value={Number(`${iconBoxSize != '' ? iconBoxSize : 0}`) }
				onChange={ (value) => setAttributes({iconBoxSize: value}) }
				resetFallbackValue = {0}
				allowReset={ true }
				min={ 0 }
				max={ 100 }
				/>
				<h2>{__("Icon Size","timeline-block")}</h2>
				<RangeControl
				className="cp-timeline-block-range__control"
				value={Number(`${iconSize != '' ? iconSize : 0}`) }
				onChange={ (value) => setAttributes({iconSize: value}) }
				resetFallbackValue = {0}
				allowReset={ true }
				min={ 0 }
				max={ 100 }
				/>
				<h2>{__("Line Size","timeline-block")}</h2>
				<RangeControl
				className="cp-timeline-block-range__control"
				value={Number(`${middleLineSize != '' ? middleLineSize : 0}`) }
				onChange={ (value) => setAttributes({middleLineSize: value}) }
				resetFallbackValue = {0}
				allowReset={ true }
				min={ 0 }
				max={ 10 }
				/>
				<SpacingControl
					{ ...this.props }
					label={ __( 'Container Padding', 'timeline-block' ) }
					valueTop={ {
						value: containerTopPadding,
						label: 'containerTopPadding',
					} }
					valueRight={ {
						value: containerRightPadding,
						label: 'containerRightPadding',
					} }
					valueBottom={ {
						value: containerBottomPadding,
						label: 'containerBottomPadding',
					} }
					valueLeft={ {
						value: containerLeftPadding,
						label: 'containerLeftPadding',
					} }
					unit={ {
						value: desktopConatinerPaddingType,
						label: 'desktopConatinerPaddingType',
					} }
					attributes={ this.props.attributes }
					setAttributes={ setAttributes }
					link={ {
						value: marginLink,
						label: 'marginLink',
					} }
				/>
			</CardBody>
		const rating_box = <PanelBody title={__("Please Share Your Valuable Feedback.","timeline-block")}>
			<CardBody className={"cool-timeline-gt-block-review-tab"}>{__("We hope you liked our plugin created timelines. Please share your valuable feedback.","timeline-block")}<br></br><a href="https://wordpress.org/support/plugin/timeline-block/reviews/" target="_blank" >★★★★★</a>
			{/* <CardFooter className={"cool-timeline-gt-block-review-tab-button"}>
				<Button className={"button-primary"}>{__("Already Rated")}</Button>
				<Button className={"button-primary"}>{__("Not Interesetd")}</Button>
			</CardFooter> */}
			</CardBody>
		</PanelBody>
		const timeline_setting =<CardBody>
			<SelectControl
						label={ __( "Timeline Layout","timeline-block" ) }
						value={ timelineLayout }
						onChange={(value)=>{
							if(value == "vertical"){
							setAttributes({timelineLayout:value,sliderActive:false})
							}
							else{
								setAttributes({timelineLayout:value})
								jQuery(".timeline-block-pre-loader").css('display','block')
							}
						}
					}
						options={ [
							{ value: "vertical", label: __( "Vertical","timeline-block") },
							{ value: "horizontal", label: __( "Horizontal Pro","timeline-block"), disabled: true }

						] }
						/>
					{timelineLayout == "vertical" ?
			<SelectControl
						label={ __( "Timeline Design","timeline-block" ) }
						value={ timelineDesign }
						onChange={ ( value ) => {setAttributes( { timelineDesign: value } )
					} }
						options={ [
							{ value: "both-sided", label: __( "Both Sided","timeline-block") },
							{ value: "one-sided", label: __( "One Sided","timeline-block") },

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
					{
						(timelineLayout == "vertical" && timelineDesign == 'both-sided') ? 
						<div className="components-base-control">
						<label className="timeline-block-settings-labels">{__("Alternating Sided","timeline-block")}</label>
						<ToggleControl
						className="timeline-block-Orientation_checkbox"
						checked={ OrientationCheckBox }
						onChange={ (state) => {
							setAttributes({OrientationCheckBox : state}),this.OrientationCheck(state);
						} }
						/>
						</div>
						: null
					}
					
					{ ["one-sided",'both-sided'].includes(timelineDesign) && timelineLayout == "vertical" ? orientation_setting : null }
			<div className="timeline-block-settings-labels">{__("Content Alignment","timeline-block")}</div>
			<ButtonGroup className="cool-timeline-content-alignment-buttons">
				<Button onClick={(e) => {setAttributes({contentAlignment: 'left'})}} className={`${contentAlignment == 'left' ? 'active': ''}`}><span className="dashicons dashicons-editor-alignleft"></span></Button>
				<Button onClick={(e) => {setAttributes({contentAlignment: 'center'})}} className={`${contentAlignment == 'center' ? 'active': ''}`}><span className="dashicons dashicons-editor-aligncenter"></span></Button>
				<Button onClick={(e) => {setAttributes({contentAlignment: 'right'})}} className={`${contentAlignment == 'right' ? 'active': ''}`}><span className="dashicons dashicons-editor-alignright"></span></Button>
			</ButtonGroup>
			</CardBody>
			let settingTabs = 
			<InspectorControls>
				<TabPanel
					className="cooltimeline-tab-settings"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'timeline_setting',
							title: 'General',
							className: 'tab-one',
							content: timeline_setting
						},
						{
							name: 'general_setting',
							title: 'Styling',
							className: 'tab-two',
							content: general_setting
						},
						{
							name: 'advanced_setting',
							title: 'Advanced',
							className: 'tab-three',
							content: advanced_setting
						},
					] }
				>
					{ ( tab ) => <Card>{tab.content}</Card> }
				</TabPanel>
				<PanelBody title={__("View Timeline Demos","timeline-block")} initialOpen={false}>
					<CardBody className="cp-timeline-block-demo-button">
						<a target="_blank" class="button button-primary" href="https://cooltimeline.com/instant-timeline-builder/?utm_source=tbg_plugin&utm_medium=link&utm_campaign=tbg_admin_demos">View Demos</a>
						<a target="_blank" class="button button-primary" href="https://docs.coolplugins.net/docs/cool-timeline-pro/create-timeline-using-instant-timeline-builder/">Watch Videos</a>
					</CardBody>
				</PanelBody>
				{rating_box}
			</InspectorControls>
			const getContentTimelineTemplate = memoize( ( icon_block, tm_content ) => {
				return times( icon_block, n => [ 'cp-timeline/content-timeline-block-child',tm_content[n]] )
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
					isPreview ? <img width='100%' src={ preview } alt=''/>:
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
									onClick: () => setAttributes({timelineDesign:"both-sided"}) ,
								},
								{
									title: 'One Sided',
									onClick: () => setAttributes({timelineDesign:"one-sided"}),
								},
							] }
							/>
					</BlockControls>
						:null}
					{ loadHeadGoogleFonts }
					 {loadSubHeadGoogleFonts }
					{settingTabs}
					{loadDateGoogleFonts }

				<div className={"cool-timeline-block-" + this.props.clientId + " cool-timeline-block"}>
								<div className={"cool-" + (timelineLayout) + "-timeline-body " + timelineDesign + " " + Orientation + ""}>
									<div className="cool-timeline-block-list">
										<InnerBlocks
                                            allowedBlocks={ALLOWED_BLOCKS}
                                            orientation="vertical"
                                            template={ getContentTimelineTemplate( timelineItem, tm_content ) }

                                        />
								</div>
							</div><div className="timeline-block-add-story">
									<button onClick={e => this.addBlock(e)}  type="button" visible="true" className="components-button block-editor-button-block-appender is-primary" aria-label="Add Story"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-hidden="true" focusable="false"><path d="M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"></path></svg>Add Story</button>
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

		// Recalculate alternating sides if new child block was added or removed
		// this.childCount = select("core/block-editor").getBlock(this.props.clientId).innerBlocks.length;
		wp.data.subscribe(() => {
			const childBlocks = select("core/block-editor").getBlock(this.props.clientId);
			if (!childBlocks || !childBlocks.innerBlocks) {
				return;
			}
			const currentChildCount = childBlocks.innerBlocks.length;
			const childWasAddedOrRemoved = this.childCount !== currentChildCount;
			
			this.childCount = currentChildCount;
			if (!childWasAddedOrRemoved) {
				return;
			}

			// this.onUpdateOrientation(this.props.attributes.Orientation);
		});
	}

	componentDidUpdate(){
		let clientId= this.props.clientId




	}

}export default
( Edit )
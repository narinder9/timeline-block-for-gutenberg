import { IconPicker, IconPickerItem } from 'react-fa-icon-picker-alen';
const { Component, Fragment } = wp.element;
import { __ } from '@wordpress/i18n';
const { InnerBlocks } = wp.editor;

const { RichText, InspectorControls,  BlockControls } = wp.blockEditor;

const {
	dispatch,
	select,
} = wp.data;

const {
	PanelBody,
	TextControl,
	Button,
	Toolbar,
	ButtonGroup
} = wp.components;

const blockTemplate=(props)=>{
	const attr=props.attributes;

	const headingLevel=()=>{
		const headingLevel=parseInt(attr.headingTag.replace('h',''));
		return headingLevel;
	}

	return (
		[
			['core/image',
				{
					url: attr.timeLineImage,
					className: 'ctlb-block-image'
				}
			], // Default: Image block with a default image URL
			['core/heading',
				{
					level: headingLevel(),
					content: attr.time_heading,
					className: 'ctlb-block-title',
					style: {spacing: {padding:{top: '0px',left: '0px',bottom: '0px', right: '0px'}}}
				}
			], // Default: Heading block with level 2 and default content
			['core/paragraph',
				{
					content: attr.time_desc,
					className: 'ctlb-block-desc',
					style: {spacing : {padding:{top: '0px',left: '0px',bottom: '0px', right: '0px'}}}
				}
			], // Default: Paragraph block with default content
		]
	);
}

class Edit extends Component {
	componentDidMount() {
		//Store client id.
		
		this.props.setAttributes( { block_id: this.props.clientId } )
		this.props.setAttributes( { wodpressBlock: true } )
   }	

   addBlock(e){
	   const parentBlockId = select( 'core/block-editor' ).getBlockHierarchyRootClientId( this.props.clientId );
	   const parentAttribute=select('core/block-editor').getBlockAttributes( parentBlockId );
	   let position='one-sided' === parentAttribute.timelineDesign ? parentAttribute.Orientation : 'left' === this.props.attributes.blockPosition ? 'right' : 'left';
	   let index = select('core/block-editor').getBlockIndex(this.props.clientId);
	   let timelineDesign= parentAttribute.timelineDesign
	   let timelineLayout= parentAttribute.timelineLayout
	   let name = 'cp-timeline/content-timeline-block-child';
	   let insertedBlock = wp.blocks.createBlock(name, {block_position_active:false,
	   timelineDesign :timelineDesign,
	   timelineLayout:timelineLayout,
	   blockPosition: position,
	   storyPositionHide: !parentAttribute.OrientationCheckBox,
	   headingTag: parentAttribute.headingTag,
		timelineStyle: parentAttribute.timelineStyle} 	);

	   wp.data.dispatch('core/block-editor').insertBlocks(insertedBlock,index+1,parentBlockId);
	   this.UpdateOrientation();
	   if('horizontal' === parentAttribute.timelineLayout){
		const parentBlock = select("core/block-editor").getBlock(parentBlockId);
		const slideUpdate={update: false, index: index + 1};
		parentBlock.attributes.hrSliderUpdate = slideUpdate
	   }
   }

	UpdateOrientation() {
		const parentBlockId = select( 'core/block-editor' ).getBlockHierarchyRootClientId( this.props.clientId );
		const parentAttribute=select('core/block-editor').getBlockAttributes( parentBlockId );
		
		if (parentAttribute.timelineLayout == "vertical" && parentAttribute.timelineDesign == "both-sided") {
			const currentIndex = select('core/block-editor').getBlockIndex(this.props.clientId);
			const currentBlockPostion ='left' === this.props.attributes.blockPosition ? 'right' : 'left';
			const parentBlock = select("core/block-editor").getBlock(parentBlockId);
			const innerBlocks = parentBlock.innerBlocks;
			const currentPostion=currentIndex % 2;
			innerBlocks.forEach((block, index) => {
				if(index > (currentIndex + 1)){
					const blockpostion=index % 2 !== currentPostion ? currentBlockPostion : this.props.attributes.blockPosition;
					block.attributes.blockPosition = blockpostion, block.attributes.storyPositionHide=!parentAttribute.OrientationCheckBox
				}
			});
		}
	}

	render() {
		// Setup the attributes.
		const {
			setAttributes,
			attributes: {
				icon,
				t_date,
				time_heading,
				time_desc,
				iconToggle,
				iconColor,
				blockPosition,
				timeLineImage,
				storyPositionHide,
				headingTag,
				timelineStyle,
			},
			context: {
				'cp-timeline/timelineDesign': timelineDesign,
				'cp-timeline/timelineLayout': timelineLayout,
			}
		} = this.props;
		const getImage = (size, image_value) => {
			let image_size_url = "";
			if (timelineLayout == "vertical") {
				let images = Object.entries(image_value);
				images.map(image => {
					if (image[0] == size) {
						image_size_url = image[1].url;
					}
				});
			}
			else {
				image_size_url = image_value.full.url;
			}
			return (
				image_size_url
			);
		};

		const StoryDetail = () => (
			<div className="story-details">
				<div className="story-content">
					<InnerBlocks
						templateLock="all" // Lock the template to prevent users from removing blocks
						template={blockTemplate(this.props)}
						allowedBlocks={['core/image', 'core/heading', 'core/paragraph']}
						/>
				</div>
			</div>
		);

		const StoryTime = () => (
			<RichText
				tagName="p"
				placeholder={__('Date / Custom Text', 'timeline-block')}
				value={t_date}
				onChange={(value) => setAttributes({ t_date: value })}
			/>
		);

		const content_control = (
			<InspectorControls>
				<div style={{ 'margin-bottom': 15 + 'px','text-align':'center' }}>
				<Button
					isSecondary
					icon={'arrow-left-alt'}
					onClick={() => {
						const parentBlockId = select( 'core/block-editor' ).getBlockHierarchyRootClientId( this.props.clientId );
						wp.data.dispatch('core/block-editor').selectBlock(parentBlockId);
					}
					}
				>GO TO SETTINGS</Button>
				</div>
				<PanelBody title={__("Story Settings","timeline-block")}>
					<TextControl
						label="Primary Label(Date/Steps)"
						value={t_date}
						onChange={(value) => setAttributes({ t_date: value })}
					/>
					<hr className="timeline-block-editor__separator"></hr>
					<div className="timeline-block-settings-labels">{__("Story Icon", "timeline-block")}</div>
					<ButtonGroup className="cool-timeline-content-alignment-buttons">
						<Button isSmall onClick={(e) => { setAttributes({ iconToggle: 'false' }) }} className={iconToggle == 'false' ? 'active' : ''}>DOT</Button>
						<Button isSmall onClick={(e) => { setAttributes({ iconToggle: 'true' }) }} className={iconToggle == 'true' ? 'active' : ''}>Icon</Button>
					</ButtonGroup>
					{iconToggle == "true" ?
						<Fragment>  <div className="timeline-block-iconpicker" ><IconPicker value={icon} onChange={v => setAttributes({ icon: v })} /> </div>

						</Fragment>
						: null}
					{timelineLayout == "vertical" && timelineDesign == "both-sided" && storyPositionHide ? //hide story position if alternating sided on
						<Fragment>
							<hr className="timeline-block-editor__separator"></hr>
							<div className="timeline-block-settings-labels">{__("Story position", "timeline-block")}</div>
							<ButtonGroup className="cool-timeline-content-alignment-buttons">
								<Button isSmall onClick={(e) => { setAttributes({ blockPosition: 'left', block_position_active: true }) }} className={blockPosition == 'left' ? 'active' : ''}>Left</Button>
								<Button isSmall onClick={(e) => { setAttributes({ blockPosition: 'right', block_position_active: true }) }} className={blockPosition == 'right' ? 'active' : ''}>Right</Button>
							</ButtonGroup>
						</Fragment>
						: null
					}
				</PanelBody>
			</InspectorControls>
		);
		const icon_div = <div className="timeline-block-icon">
			{icon !== "" && iconToggle == "true" ? <span className="timeline-block-render-icon" ><IconPickerItem icon={icon} size={24} color={iconColor} /></span> : <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>}
		</div>;
		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<Button
							label="Delete Block"
							icon="trash"
							onClick={() => dispatch('core/block-editor').removeBlock(this.props.clientId, true)}
						/>
					</Toolbar>
					<Toolbar >
						<Button
							label="Add Block"
							icon="plus"
							onClick={() => 	
								this.addBlock()
							}
						/>
					</Toolbar>
				</BlockControls>
				{content_control}
				<div className={"timeline-content icon-" + iconToggle + ""}>
					<div className={`timeline-block-timeline ctl-row  position-${blockPosition}${t_date == '' ? ' ctl_timeFalse' : ''}`}>
						{!('design-1' === timelineStyle && 'horizontal' === timelineLayout) &&
						<>
						<div className="ctl-6 timeline-block-time">
							{t_date != '' &&
								<div className="story-time">
									{StoryTime()}
								</div>
							}
						</div>
						{icon_div}
						</>
						}
						<div className="ctl-6 timeline-block-detail">
							{StoryDetail()}
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Edit;

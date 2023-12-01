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

class Edit extends Component {
	componentDidMount() {
		//Store client id.
		
		this.props.setAttributes( { block_id: this.props.clientId } )
		this.props.setAttributes( { wodpressBlock: true } )
		const mediaBlock=!['none',''].includes(this.props.attributes.timeLineImage);
		this.innerBlockTemplate(mediaBlock);
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
	   headingTag: parentAttribute.headingTag
		});

	   wp.data.dispatch('core/block-editor').insertBlocks(insertedBlock,index+1,parentBlockId);
	   this.UpdateOrientation();
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

	innerBlockTemplate(mediaBlock){
		const innerBlocks=[];

			const headingLevel=()=>{
				const headingLevel=parseInt(this.props.attributes.headingTag.replace('h',''));
				return headingLevel;
			}
			mediaBlock && innerBlocks.push(['core/image', { url: this.props.attributes.timeLineImage, className: 'ctlb-block-image',aspectRatio: "4/3", scale: "cover", }]); // Default: Image block with a default image URL

			innerBlocks.push(
				['core/heading', { level: headingLevel(), content: this.props.attributes.time_heading, className: 'ctlb-block-title', style: {spacing: {padding:{top: '0px',left: '0px',bottom: '0px', right: '0px'}}}}], // Default: Heading block with level 2 and default content
				['core/paragraph', { content: this.props.attributes.time_desc, className: 'ctlb-block-desc', style: {spacing : {padding:{top: '0px',left: '0px',bottom: '0px', right: '0px'}}}}], // Default: Paragraph block with default content
			);
			!mediaBlock && this.props.setAttributes({timeLineImage: ''});
			this.props.setAttributes({innerBlockTemplate: innerBlocks,mediaBlock: mediaBlock});
	}

	render() {
		// Setup the attributes.
		const {
			setAttributes,
			attributes: {
				icon,
				t_date,
				iconToggle,
				iconColor,
				blockPosition,
				storyPositionHide,
				mediaBlock,
				innerBlockTemplate
			},
			context: {
				'cp-timeline/timelineDesign': timelineDesign,
				'cp-timeline/timelineLayout': timelineLayout,
			}
		} = this.props;

		const StoryDetail = () => (
			<div className="story-details">
				{ mediaBlock ?
				<Button isSmall isSecondary onClick={() => this.innerBlockTemplate(false)} style={{marginBottom: '10px'}}>{__('Remove Media Block',"timeline-block")}</Button> :
				<Button isSmall isSecondary onClick={()=> this.innerBlockTemplate(true)} style={{marginBottom: '10px'}}> {__('Add Media Block', 'timeline-block')}</Button>
				}
				<div className="story-content">
					<InnerBlocks
						templateLock="all" // Lock the template to prevent users from removing blocks
						template={innerBlockTemplate}
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
						<div className="ctl-6 timeline-block-time">
							{t_date != '' &&
								<div className="story-time">
									{StoryTime()}
								</div>
							}
						</div>
						{icon_div}
						<div className="ctl-6 timeline-block-detail">
							{StoryDetail()}
						</div>
					</div>
				</div>
			</Fragment>
		);
	}

	componentDidUpdate(){
		const childBlocks=select("core/editor").getBlock(this.props.clientId).innerBlocks;
		const paragraphBlock=childBlocks.filter(block=>{ return "core/paragraph" === block.name })[0];
		const paragraphBlockId=paragraphBlock?.clientId;
		const selectBlockId=select('core/editor').getSelectedBlockClientId();
		if(selectBlockId){
			if(paragraphBlockId === selectBlockId){
				this.paragraphToolBarPosition(selectBlockId);
			}
		}

	}

	paragraphToolBarPosition(id){
		// Getting the root element for that is a overflow Y axis auto
		const getParentOverflowElement = (parentElement) => {
			let element = parentElement;
			while (element) {
				const { overflowY } = getComputedStyle(element);
				if (overflowY !== 'auto') {
					if(element.parentElement){
						element = element.parentElement;
					}
				} else {
					return element;
				}
			}
			return element;
		};

		setTimeout(() => {
			const parentBlockId = select('core/block-editor').getBlockHierarchyRootClientId(this.props.clientId),
			paragraphBlock = document.querySelector(`#block-${id}`),
			parentBlock = paragraphBlock.closest(`#block-${parentBlockId}`),
			scrollElement = getParentOverflowElement(parentBlock),
			paragraphToolbar = document.querySelector("div.components-popover");
			if (paragraphBlock && paragraphToolbar) {

				const toolStyleValue = paragraphToolbar?.style?.transform;

				// Get Toolbar updated transform position.
				const updatedValue = () => {
					const paragraphBlock = document.querySelector(`#block-${id}`),
					paragraphStyle = getComputedStyle(paragraphBlock),
					scrollTop = scrollElement.scrollTop,
					rect = paragraphBlock.getBoundingClientRect(),
					paragraphBlockYAxis = 0 > rect.top ? -Math.abs(rect.top) : Math.abs(rect.top),
					paragraphTopSpacing = parseInt(paragraphStyle.marginTop.match(/\d+\.\d+|\d+/g)[0]),
					toolbarParentOffsetTop = paragraphToolbar.offsetParent?.offsetTop ?? 0,
					parentYPosition = Math.floor(scrollTop + paragraphBlockYAxis + paragraphBlock.clientHeight - paragraphTopSpacing - paragraphToolbar.clientHeight - toolbarParentOffsetTop + 40);
					return parentYPosition;
				};

				// Update ToolBar transform position.
				const updateToolBarStyle = (newTranslateY) => {
					if (toolStyleValue) {
						const style = toolStyleValue.replace(
							/translateY\(\d+px\)/,
							`translateY(${newTranslateY}px)`
						);
						paragraphToolbar.style.transform = style;
					}
				};

				// ToolBar Observer.
				const observerCallback = (mutationsList) => {
					const selectBlockId = select('core/editor').getSelectedBlockClientId();
					if (selectBlockId === id) {
						for (const mutation of mutationsList) {
							if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
								const currentToolBarValue = document.querySelector("div.components-popover");
								const currentTranslateY = getTranslateYValue(
									currentToolBarValue?.style?.transform
								);
								const updateValue = updatedValue();
								if (updateValue > currentTranslateY) {
									// update toolbar position
									updateToolBarStyle(updateValue);
								}
							}
						}
					}
				};

				const observerConfig = { attributes: true };
				const observer = new MutationObserver(observerCallback);
				// Observer toolBar transform position
				observer.observe(paragraphToolbar, observerConfig);

				// update toolbar position.
				updateToolBarStyle(updatedValue());

				// Function to extract translateY value from a transform string.
				function getTranslateYValue(transform) {
					const match = transform.match(/translateY\(([-+]?\d+)px\)/);
					return match ? parseInt(match[1]) : 0;
				}
			}
		}, 10);
	}
}

export default Edit;

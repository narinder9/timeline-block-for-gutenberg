import { IconPicker, IconPickerItem } from 'react-fa-icon-picker-alen';
const { Component, Fragment } = wp.element;
import { __ } from '@wordpress/i18n';

const { RichText, InspectorControls, PanelColorSettings, MediaUpload, BlockControls, AlignmentToolbar } = wp.blockEditor;

const {
	dispatch,
	select,
} = wp.data;

const {
	PanelBody,
	TextControl,
	Button,
	TextareaControl,
	Toolbar,
	RadioControl,
	SelectControl,
	ButtonGroup
} = wp.components;

class Edit extends Component {
	componentDidMount() {
		//Store client id.
		
		this.props.setAttributes( { block_id: this.props.clientId } )
		let root_id = select("core/block-editor").getBlockRootClientId(this.props.clientId);
		
		let index = select("core/block-editor").getBlockIndex(this.props.clientId,root_id);
		
		const parentBlockId = select( 'core/block-editor' ).getBlockHierarchyRootClientId( this.props.clientId );
		const parentAttribute=select('core/block-editor').getBlockAttributes( parentBlockId );
		if(!parentAttribute.hrSliderUpdate && 'horizontal' === parentAttribute.timelineLayout){
			setTimeout(()=>{
				this.SwiperUpdate(parentBlockId, index ,parentAttribute.slidePerView,parentAttribute.timelineStyle)
			},50);
		}
   }	

   addBlock(e){
	   const parentBlockId = select( 'core/block-editor' ).getBlockHierarchyRootClientId( this.props.clientId );
	   const parentAttribute=select('core/block-editor').getBlockAttributes( parentBlockId );
		const blocksCount = wp.data.select("core/block-editor").getBlockCount(parentBlockId);
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
	   headingTag: parentAttribute.headingTag} 	);

	   wp.data.dispatch('core/block-editor').insertBlocks(insertedBlock,index+1,parentBlockId);
	   const parentBlock = select("core/block-editor").getBlock(parentBlockId);
	   this.UpdateOrientation();
	   if('horizontal' === parentAttribute.timelineLayout){
		   parentBlock.attributes.hrSliderUpdate = false
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

	SwiperUpdate(blockId,blockcount,slidePerView,timelinStyle){
		let block_id = blockId;
		const mainSwiperView='design-1' === timelinStyle ? 1 : slidePerView;
		const navigation={
			nextEl: '.cool-timeline-block-'+ block_id +' .swiper-button-next',
			prevEl: '.cool-timeline-block-'+ block_id +' .swiper-button-prev',
		};
		var mainSwiper = new Swiper('.cool-timeline-block-'+ block_id +' .swiper-outer .swiper', {
			observer: true,
			observeParents: true,
			slidesPerView: mainSwiperView,
			freeMode: true,
			initialSlide:blockcount,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			preventClicks:false,
			allowTouchMove: false,
			preventClicksPropagation:false,
			navigation,
			breakpoints: {
				  // when window width is >= 320px
				280: {
				  slidesPerView: 1,
				
				},
				// when window width is >= 480px
				480: {
					slidesPerView: mainSwiperView < 2 ? mainSwiperView : 2,
				
				},
				// when window width is >= 640px
				640: {
				  slidesPerView: mainSwiperView,
				
				}
			  },
			on: {slideChange:(e)=>{
				if(0 !== e.activeIndex){
					document.querySelector(navigation.prevEl).classList.remove('swiper-button-disabled');
				}
				if(e.activeIndex !== e.slides.length - 1){
					document.querySelector(navigation.nextEl).classList.remove('swiper-button-disabled');
				}
			}}
		})

		var navSlider = new Swiper('.cool-timeline-block-'+ block_id +' .ctlb-nav-swiper-outer .swiper', {
			observer: true,
			observeParents: true,
			slidesPerView: slidePerView,
			freeMode: true,
			initialSlide:blockcount,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			preventClicks:false,
			allowTouchMove: false,
			preventClicksPropagation:false,
			centeredSlides: true,
			navigation: {
				nextEl: '.cool-timeline-block-'+ block_id +' .swiper-button-next',
				prevEl: '.cool-timeline-block-'+ block_id +' .swiper-button-prev',
			  },
			  breakpoints: {
				  // when window width is >= 320px
				280: {
				  slidesPerView: 1,
				  
				},
				// when window width is >= 480px
				480: {
					slidesPerView: slidePerView < 2 ? slidePerView : 2,
			
				},
				// when window width is >= 640px
				640: {
				  slidesPerView: slidePerView,
				 
				}
			  }
		})
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
				time_image,
				iconToggle,
				iconColor,
				blockPosition,
				imageSize,
				imageOption,
				timeLineImage,
				imageAlt,
				storyPositionHide,
				headingTag,
				timelineStyle
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
				<MediaUpload
					onSelect={(value) => {
						let image_sizes = Object.keys(value.sizes);
						let image_size_option = [];
						image_sizes.map(size => {
							image_size_option.push({ label: size.charAt(0).toUpperCase() + size.slice(1), value: size });
						});
						let img = getImage(imageSize, value.sizes);
						setAttributes({ timeLineImage: img, imageOption: image_size_option, time_image: value, imageAlt: value.alt });
					}}
					value={timeLineImage}
					allowedTypes={['image']}
					render={({ open }) => (
						<Fragment>
							{timeLineImage !== "none" ?
								<Fragment>
									<div className="story-image" style={{paddingBottom: '10px'}}>
										<img src={timeLineImage} alt={imageAlt} className={time_image.id ? `wp-image-${time_image.id}` : null} />
										<Button isSmall isSecondary onClick={(value) => setAttributes({ timeLineImage: 'none' })} style={{marginTop: '10px'}}>
										{__('Remove Image',"timeline-block")}</Button>
									</div>
								</Fragment>
								:
								<Button isSmall isSecondary onClick={open} style={{marginTop: '10px'}}> {__('Upload/Choose Image', 'timeline-block')}</Button>
							}
						</Fragment>
					)}
				/>
				<div className="story-content">
					<RichText
						className="timeline-block_title"
						tagName={headingTag}
						placeholder={__('Enter Story Title', 'timeline-block')}
						value={time_heading}
						onChange={(value) => setAttributes({ time_heading: value })}
						keepplaceholderonfocus="true"
					/>
					<div className='timeline-block_desc'>
						<RichText
							tagName="p"
							placeholder={__('Enter story description here.', 'timeline-block')}
							value={time_desc}
							onChange={(value) => setAttributes({ time_desc: value })}
							keepplaceholderonfocus="true"
						/>
					</div>
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
						label="Story Heading"
						value={time_heading}
						onChange={(value) => setAttributes({ time_heading: value })}
					/>
					<TextareaControl
						label="Story Description"
						value={time_desc}
						onChange={(value) => setAttributes({ time_desc: value })}
					/>
					<TextControl
						label="Primary Label(Date/Steps)"
						value={t_date}
						onChange={(value) => setAttributes({ t_date: value })}
					/>
					{/* <RadioControl
						label="Story Icon"
						selected={iconToggle}
						options={[
							{ label: 'Default(dot)', value: "false" },
							{ label: 'Custom(Font Awesome Icon)', value: "true" },
						]}
						onChange={(value) => setAttributes({ iconToggle: value })}
					/> */}
					<div className="timeline-block-settings-labels">{__("Story Icon", "timeline-block")}</div>
					<ButtonGroup className="cool-timeline-content-alignment-buttons">
						<Button isSmall onClick={(e) => { setAttributes({ iconToggle: 'false' }) }} className={iconToggle == 'false' ? 'active' : ''}>DOT</Button>
						<Button isSmall onClick={(e) => { setAttributes({ iconToggle: 'true' }) }} className={iconToggle == 'true' ? 'active' : ''}>Icon</Button>
					</ButtonGroup>
					{iconToggle == "true" ?
						<Fragment>  <div className="timeline-block-iconpicker" ><IconPicker value={icon} onChange={v => setAttributes({ icon: v })} /> </div>

						</Fragment>
						: null}
					<hr className="timeline-block-editor__separator"></hr>
					<label className="timeline-block-settings-labels">Story Image</label>
					<br></br>
					<MediaUpload
						title="Story Image"
						onSelect={(value) => {
							let image_sizes = Object.keys(value.sizes)
							let image_size_option = []
							image_sizes.map(size => {
								image_size_option.push({ label: size.charAt(0).toUpperCase() + size.slice(1), value: size })
							});
							let img = getImage(imageSize, value.sizes)
							setAttributes({ timeLineImage: img, imageOption: image_size_option, time_image: value })
						}}
						value={timeLineImage}
						allowedTypes={['image']}
						modalClass=""
						render={({ open }) => (
							<Fragment>
								{timeLineImage !== "none" ?
									<Fragment>
										<img src={timeLineImage} />
										<Button isSmall isSecondary onClick={(value) => setAttributes({ timeLineImage: 'none' })}>
											{__('Remove Image','timeline-block')}</Button>
									</Fragment>
									:
									<Button isSmall isSecondary onClick={open}> {__('Upload/Choose Image', 'timeline-block')}</Button>
								}
							</Fragment>
						)}
					/>
					{timelineLayout == "vertical" && timelineDesign == "both-sided" && storyPositionHide ? //hide story position if alternating sided on
						<Fragment>
							<hr className="timeline-block-editor__separator"></hr>
							{/* <RadioControl
								label="Story position"
								selected={blockPosition}
								options={[
									{ label: 'Left', value: "left" },
									{ label: 'Right', value: "right" },
								]}
								onChange={(value) => setAttributes({ blockPosition: value, block_position_active: true })}
							/> */}
							<div className="timeline-block-settings-labels">{__("Story position", "timeline-block")}</div>
							<ButtonGroup className="cool-timeline-content-alignment-buttons">
								<Button isSmall onClick={(e) => { setAttributes({ blockPosition: 'left', block_position_active: true }) }} className={blockPosition == 'left' ? 'active' : ''}>Left</Button>
								<Button isSmall onClick={(e) => { setAttributes({ blockPosition: 'right', block_position_active: true }) }} className={blockPosition == 'right' ? 'active' : ''}>Right</Button>
							</ButtonGroup>
						</Fragment>
						: null
					}
					<hr className="timeline-block-editor__separator"></hr>
					{timelineLayout == "vertical" && timeLineImage !== "none" ?
						<SelectControl
							label="Image Size"
							value={imageSize}
							options={imageOption}
							onChange={(newSize) => {
								let img = getImage(newSize, time_image.sizes)
								setAttributes({ timeLineImage: img, imageSize: newSize })
							}}
						/> :
						null
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

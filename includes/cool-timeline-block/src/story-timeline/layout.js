import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps as __stableUseInnerBlocksProps,
	__experimentalUseInnerBlocksProps,
} from '@wordpress/block-editor';

import { IconPickerItem } from 'react-fa-icon-picker-alen';

const TEMPLATE = [
    [ 'cp-timeline/content-timeline-block-child', {}, [
        [ 'core/paragraph', { placeholder: 'Enter slide content...' } ],
    ] ],
    [ 'cp-timeline/content-timeline-block-child', {}, [
        [ 'core/paragraph', { placeholder: 'Enter slide content...' } ],
    ] ]
];
export function LayoutInit(props){
    const attributes=props.attributes;
    const navItem=JSON.parse(attributes.timelineNavItems);
    const layout=attributes.timelineLayout;
    const timelinStyle=attributes.timelineStyle;
    const useInnerBlocksProps = __stableUseInnerBlocksProps
		? __stableUseInnerBlocksProps
		: __experimentalUseInnerBlocksProps;
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps( blockProps, {
        allowedBlocks: [ 'cp-timeline/content-timeline-block-child' ],
        template: TEMPLATE,
        orientation:"horizontal",
        navItemUpdate:props.navItemUpdate,
    });
    const circleIcons=<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>;

    const childBlockSelector=(element)=>{
        const targetElement=element.target;

        const parentWrp=targetElement.closest('.cool-timeline-block-list');
        const currentIndx=targetElement.closest('.swiper-slide').dataset.slideIndex;
        const navSwiper=parentWrp.querySelector('.ctlb-nav-swiper-outer .swiper');
        const mainSwiper=parentWrp.querySelector('.swiper-outer .swiper');
        navSwiper.swiper.slideTo(currentIndx);
        mainSwiper.swiper.slideTo(currentIndx);

        setTimeout(()=>{
            const childBlockId=targetElement.dataset.childId;
            wp.data.dispatch('core/block-editor').selectBlock(childBlockId);
        },100)

    };
    
    const stopParentSelect=(e)=>{
            e.preventDefault();
            e.stopPropagation();
    };


    return (
    <div { ...innerBlocksProps }>
        {'horizontal' === layout && 'design-1' === timelinStyle
        &&
            <div className='ctlb-nav-swiper-outer'>
                <div className='swiper'>
                    <div className='swiper-wrapper'>
                        {Object.keys(navItem).map((key,index)=>{
                             return <div className='swiper-slide' key={index} data-slide-index={index}>
                             <p className="ctlb_nav_date" onClick={childBlockSelector} onMouseDown={stopParentSelect} data-child-id={key}> {navItem[key].t_date}</p>
                             <div className={`ctlb_nav_icon ${'false' !== navItem[key].iconToggle ? 'ctlb_nav_icon_true' : ''}`}>
                                 {'false' === navItem[key].iconToggle ? circleIcons :
                                 <span className="ctl_nav_icons" style={{ fill: navItem[key].iconColor }}><IconPickerItem icon={navItem[key].icon} size={24} color={navItem[key].iconColor} /></span>
                                 }
                             </div>
                          </div>
                        })}
                    </div>
                </div>
            </div>
        }
        <div  className="swiper-outer">
            <div className ="swiper block-editor-block-list__layout">
                <div className="swiper-wrapper ">
                    { innerBlocksProps.children }
                </div>
            </div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </div>
</div>
    )
}



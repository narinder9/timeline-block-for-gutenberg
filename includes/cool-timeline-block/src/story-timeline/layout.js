import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps as __stableUseInnerBlocksProps,
	__experimentalUseInnerBlocksProps,
} from '@wordpress/block-editor';

const TEMPLATE = [
    [ 'cp-timeline/content-timeline-block-child', {}, [
        [ 'core/paragraph', { placeholder: 'Enter slide content...' } ],
    ] ],
    [ 'cp-timeline/content-timeline-block-child', {}, [
        [ 'core/paragraph', { placeholder: 'Enter slide content...' } ],
    ] ]
];
export function LayoutInit(props){
    const useInnerBlocksProps = __stableUseInnerBlocksProps
		? __stableUseInnerBlocksProps
		: __experimentalUseInnerBlocksProps;
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps( blockProps, {
        allowedBlocks: [ 'cp-timeline/content-timeline-block-child' ],
        template: TEMPLATE,
        orientation:"horizontal"
    });
    return (
    <div { ...innerBlocksProps }>
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



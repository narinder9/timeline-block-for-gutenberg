const { createBlock } = wp.blocks;
const { select } = wp.data;
const innerBlock=(prop)=>{
    const innerBlock=[];
    const blocks = select("core/block-editor").getBlock(prop.block_id).innerBlocks
    const innerBlocks = Array.prototype.slice.call(blocks);

    innerBlocks.map((prop,index)=>{
        innerBlock.push({
            name: 'cp-timeline/content-timeline-child',
            attributes: prop.attributes,
        });
    });
    return innerBlock;
};

export default {
    to: [
        {
            type: 'block',
            blocks: ['cp-timeline/content-timeline'], // Parent timeline block
            transform: (props) => {
                const parentBlock = {
                    name: 'cp-timeline/content-timeline', // Child timeline block
                    attributes: props,
                    innerBlocks: innerBlock(props),
                };
                return createBlock(
                    parentBlock.name,
                    parentBlock.attributes,
                    parentBlock.innerBlocks.map(innerBlock => createBlock(innerBlock.name, innerBlock.attributes))
                );
            },
        },
    ],
};
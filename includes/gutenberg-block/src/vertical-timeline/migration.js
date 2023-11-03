const { createBlock } = wp.blocks;

// Parent Block Attributes
const parentAttributes=(props)=>{
    const {
        timelineLayout: timelineLayout,
        titleSize: titleSize,
        descriptionSize: descSize,
        timeSize: dateSize,
        textColor: textColor,
        timeLineColor: timelineColor,
    }=props
    const attributes={
        timelineDesign: timelineLayout,
        headFontSize: titleSize,
        subHeadFontSize: descSize,
        headingColor: textColor,
        subHeadingColor: textColor,
        dateFontsize: dateSize,
        dateLineHeight: (parseInt(dateSize) + 7),
        dateColor: textColor,
        LineColor: timelineColor,
        iconBg: timelineColor,
        storyBorderColor: timelineColor,
    }
    return attributes;
};

// Return Child block
const innerBlock=({items,timelineLayout})=>{
    const innerBlock=[];

    items.map((prop,index)=>{
        let blockPosition='right';
        if ('one-sided' !== timelineLayout && index % 2 !== 0) {
            blockPosition = 'left';
        }

        const {
            title: timelineTitle,
            description: desc,
            time: date,
            storyImage: storyImage,
        }=prop;

        innerBlock.push({
            name: 'cp-timeline/content-timeline-block-child',
            attributes: {
                blockPosition: blockPosition,
                timeLineImage: storyImage,
                t_date: date,
                time_heading: timelineTitle,
                time_desc: desc,
            },
        });
    });

    return innerBlock;
};

export default {
    to: [
        {
            type: 'block',
            blocks: ['cp-timeline/content-timeline-block'], // Parent timeline block
            transform: (props) => {
                const parentBlock = {
                    name: 'cp-timeline/content-timeline-block', // Child timeline block
                    attributes: parentAttributes(props),
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
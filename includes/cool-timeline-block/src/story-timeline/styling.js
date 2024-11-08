/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../component/css/generateCSS.js"

function contentTimelineStyle( props ) {
   const {
        itemSpacing,
        itemSpacingType,
        contentAlignment,
       iconColor,
       dateFontsizeType,
       dateFontsize,
       dateFontFamily,
       dateFontWeight,
       dateLineHeightType,
       dateLineHeight,
       dateFontSubset,
      
       dateColor,
       iconSize,
       block_id,
       headFontSizeType,
       headFontSize,
       headFontFamily,
       headFontWeight,
       headLineHeightType,
       headLineHeight,
       headFontSubset,
       headingColor,
       titileBtSpacing,
       titileBtSpacingType,
       descBtSpacing,
       descBtSpacingType,
       subHeadFontSizeType,
       subHeadFontSize,
       subHeadFontFamily,
       subHeadFontWeight,
       subHeadLineHeightType,
       subHeadLineHeight,
       subHeadFontSubset,
       subHeadingColor,
  
       LineColor,
       iconBg,
       storyBorderColor,

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
       timelineLayout
   } = props.attributes

   const unitValue=(size,type)=>{
    const value= (undefined === size || '' === size) || 0 === size ? '' : size+type;
    return value;
   }

   const fontFamily=(family)=>{
    const arr=['Default','default',undefined,''];
    const fontFamily=!arr.includes(family) ? family : '';

    return fontFamily;
   }

   const selectors={};
   selectors[` .cool-${timelineLayout}-timeline-body`] = {
        '--ctlb-item-spacing': unitValue(itemSpacing,itemSpacingType),
        '--ctlb-content-alignment': contentAlignment,
        '--ctlb-icon-color': iconColor,
        '--ctlb-date-fontsize': unitValue(dateFontsize,dateFontsizeType),
        '--ctlb-date-font-family': fontFamily(dateFontFamily),
        '--ctlb-date-font-weight': dateFontWeight,
        '--ctlb-date-line-height': unitValue(dateLineHeight,dateLineHeightType),
        '--ctlb-date-font-subset':dateFontSubset,
        '--ctlb-date-color': dateColor,
        '--ctlb-icon-size': unitValue(iconSize,iconSizeType),
        '--ctlb-head-font-size': unitValue(headFontSize,headFontSizeType),
        '--ctlb-head-font-family': fontFamily(headFontFamily),
        '--ctlb-head-font-weight': headFontWeight,
        '--ctlb-head-line-height': unitValue(headLineHeight,headLineHeightType),
        '--ctlb-head-font-subset':headFontSubset,
        '--ctlb-heading-color': headingColor,
        '--ctlb-titile-bt-spacing': unitValue(titileBtSpacing,titileBtSpacingType),
        '--ctlb-desc-bt-spacing': unitValue(descBtSpacing,descBtSpacingType),
        '--ctlb-sub-head-font-size': unitValue(subHeadFontSize,subHeadFontSizeType),
        '--ctlb-sub-head-font-family': fontFamily(subHeadFontFamily),
        '--ctlb-sub-head-font-weight': subHeadFontWeight,
        '--ctlb-sub-head-line-height': unitValue(subHeadLineHeight,subHeadLineHeightType),
        '--ctlb-sub-head-font-subset':subHeadFontSubset,
        '--ctlb-sub-heading-color': subHeadingColor,
        '--ctlb-line-color': LineColor,
        '--ctlb-icon-bg': iconBg,
        '--ctlb-story-border-color': storyBorderColor,
        '--ctlb-icon-box-size': unitValue(iconBoxSize,iconBoxSizeType),
        '--ctlb-middle-line-size': unitValue(middleLineSize,middleLineSizeType),
        '--ctlb-container-top-padding': unitValue(containerTopPadding,desktopConatinerPaddingType),
        '--ctlb-container-right-padding': unitValue(containerRightPadding,desktopConatinerPaddingType),
        '--ctlb-container-bottom-padding': unitValue(containerBottomPadding,desktopConatinerPaddingType),
        '--ctlb-container-left-padding': unitValue(containerLeftPadding,desktopConatinerPaddingType),
    };

   var styling_css = ""
   var id = `.cool-timeline-block-${ block_id }`

   styling_css = generateCSS( selectors, id,timelineLayout )

   return styling_css

}

export default contentTimelineStyle
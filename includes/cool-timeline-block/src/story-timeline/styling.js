/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../component/css/generateCSS"
import generateCSSUnit from "../component/css/generateCSSUnit"

const addAlpha = (color, opacity) => {
    // coerce values so ti is between 0 and 1.
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}; // returns 'FF0000FF'

function contentTimelineStyle( props ) {
   const {
     
       iconColor,
       dateFontsizeType,
       dateFontsize,
       dateFontsizeTablet,
       dateFontsizeMobile,
       dateFontFamily,
       dateFontWeight,
       dateLineHeightType,
       dateLineHeight,
      
       dateColor,
       iconSize,
       iconFocus,
       iconBgFocus,
       block_id,
       headFontSizeType,
       headFontSize,
       headFontSizeTablet,
       headFontSizeMobile,
       headFontFamily,
       headFontWeight,
       headLineHeightType,
       headLineHeight,
       headLineHeightTablet,
       headLineHeightMobile,
       align,
       headingColor,
       headSpace,
       subHeadFontSizeType,
       subHeadFontSize,
      
       subHeadFontFamily,
       subHeadFontWeight,
       subHeadLineHeightType,
       subHeadLineHeight,
       subHeadLineHeightTablet,
       subHeadLineHeightMobile,
       subHeadingColor,
  
       LineColor,
       iconBg,
       storyBorderColor,
   } = props.attributes
   let border_color = addAlpha(LineColor,0)
   var resp_selectors = "left"

   var selectors = {
    " .cool-vertical-timeline-body .story-details h3" : {
        "font-size" : generateCSSUnit( headFontSize, headFontSizeType ),
        "font-family": headFontFamily,
        "font-weight": headFontWeight,
        "line-height": generateCSSUnit( headLineHeight, headLineHeightType ),
        "color": headingColor,
    },
    " .cool-horizontal-timeline-body .story-details h3" : {
        "font-size" : generateCSSUnit( headFontSize, headFontSizeType ),
        "font-family": headFontFamily,
        "font-weight": headFontWeight,
        "line-height": generateCSSUnit( headLineHeight, headLineHeightType ),
        "color": headingColor,
    },
    " .cool-vertical-timeline-body .story-time p" : {
        "color": dateColor,
        "font-size" : generateCSSUnit( dateFontsize, dateFontsizeType ),
        "font-family": dateFontFamily,
        "font-weight": dateFontWeight,
        "line-height": generateCSSUnit( dateLineHeight, dateLineHeightType ),
    },
    " .cool-horizontal-timeline-body .story-time p" : {
        "color": dateColor,
        "font-size" : generateCSSUnit( dateFontsize, dateFontsizeType ),
        "font-family": dateFontFamily,
        "font-weight": dateFontWeight,
        "line-height": generateCSSUnit( dateLineHeight, dateLineHeightType ),
    },
    " .cool-vertical-timeline-body .story-details p" : {
        "font-size" : generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
        "font-family": subHeadFontFamily,
        "font-weight": subHeadFontWeight,
        "line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
        "color": subHeadingColor,
    },
    " .cool-horizontal-timeline-body .story-details p" : {
        "font-size" : generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
        "font-family": subHeadFontFamily,
        "font-weight": subHeadFontWeight,
        "line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
        "color": subHeadingColor,
    },
    " .cool-vertical-timeline-body::before" :{
        "background":LineColor
    },
    " .cool-horizontal-timeline-body .timeline-content::before" :{
        "background":LineColor
    },
    " .cool-horizontal-timeline-body .timeline-content::after" :{
        "background":LineColor
    },
    " .cool-vertical-timeline-body .timeline-content::before" :{
        "background":storyBorderColor+" !important"
    },
    " .cool-vertical-timeline-body.left .story-details::after" :{
        "background":storyBorderColor+" !important"
    },
    " .cool-vertical-timeline-body.right .story-time::after" :{
        "background":storyBorderColor+" !important"
    },
    " .cool-vertical-timeline-body .timeline-content .timeline-block-icon":{
        "background":iconBg+" !important",
    },
    " .cool-horizontal-timeline-body .timeline-content .timeline-block-icon":{
        "background":iconBg+" !important",
    },
    " .cool-vertical-timeline-body.both-sided .timeline-content .position-right .story-details::before" :{
        "border-right-color":storyBorderColor+" !important",
    },
    " .cool-vertical-timeline-body.both-sided .timeline-content .position-left  .story-details::before" :{
        "border-left-color":storyBorderColor+" !important",
    },
    " .cool-vertical-timeline-body.one-sided.left .timeline-content  .story-details::before" :{
        "border-right-color":storyBorderColor+" !important",
    },
    " .cool-vertical-timeline-body.one-sided.right .timeline-content  .story-details::before" :{
        "border-left-color":storyBorderColor+" !important",
    },
    " .cool-vertical-timeline-body .timeline-content  .story-details" :{
        "border-color":storyBorderColor+" !important",
    },
        " .cool-horizontal-timeline-body .timeline-content .ctl-row .ctl-6.timeline-block-detail::before":{
            "border-bottom-color":storyBorderColor+" !important",
        },
        " .cool-horizontal-timeline-body .ctl-6.timeline-block-detail":{
            "border-top-color":storyBorderColor+" !important",
        },
    " .cool-vertical-timeline-body .timeline-content  .timeline-block-icon" :{
        "border-color":border_color+" !important",
    },
    " .cool-horizontal-timeline-body .swiper-button-next" :{
        "color":LineColor
    },
    " .cool-horizontal-timeline-body .swiper-button-prev" :{
        "color":LineColor
    },
    " .cool-horizontal-timeline-body .swiper-pagination-bullet-active":{
        "background":LineColor
    },
    " .icon-true .timeline-block-icon span.timeline-block-render-icon svg" : {
        "fill":iconColor
    }
    
           
       }

   var styling_css = ""
   var id = `.cool-timeline-block-${ block_id }`

   styling_css = generateCSS( selectors, id )

   return styling_css

}

export default contentTimelineStyle
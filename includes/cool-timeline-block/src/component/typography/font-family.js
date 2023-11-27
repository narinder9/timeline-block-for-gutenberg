/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';
 import Select from "react-select";
 import {useState} from "react";
const {
	SelectControl,
    Dashicon,
    Button
} = wp.components

/**
 * Internal dependencies
 */
import googleFonts from "./fonts.js";

function GoogleFontFamily( props ) {

	const fonts = [
		{ value: "", label: __( "Default",'timeline-block' ), weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Arial", label: "Arial", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Helvetica", label: "Helvetica", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Times New Roman", label: "Times New Roman", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Georgia", label: "Georgia", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
	]

    const [showAdvancedControls, setShowAdvancedControls]=useState(false);

	let fontWeight = ""

	//Push Google Fonts into stytem fonts object
	Object.keys( googleFonts ).map( ( k, v ) => {
		fonts.push(
			{ value: k, label: k, weight: googleFonts[k].weight }
		)

		if( k === props.fontFamily.value ) {
			fontWeight = googleFonts[k].weight
		}
	})

	// check if the font is a system font and then apply the font weight accordingly.
	if ( fontWeight === "" ) {
		fontWeight = fonts[0].weight
	}

	const fontWeightObj = []

	fontWeight.forEach(function(item) {
		fontWeightObj.push(
			{ value: item, label: item }
		)
	})

	const onFontfamilyChange = ( value ) => {
		const { loadGoogleFonts, fontFamily, fontWeight } = props
		props.setAttributes( { [ fontFamily.label ]: value.label } )
		onLoadGoogleFonts( loadGoogleFonts, value.label )
		onFontChange( fontWeight, value.label )
	}

	const onFontChange = ( fontWeight, fontFamily ) => {

		let font_flag
		let new_value

		if( typeof googleFonts[fontFamily] == "object" ) {

			const gfontsObj = googleFonts[fontFamily].weight

			if( typeof gfontsObj == "object" ) {
				gfontsObj.forEach(function(item) {
					if( fontWeight.value == item ) {
						font_flag = false
					} else {
						new_value  = item
						font_flag = true
						props.setAttributes( { [ props.fontWeight.label ]: new_value } )
						return
					}
				})
			}
		}
	}

	const onLoadGoogleFonts = ( loadGoogleFonts, fontFamily ) => {

		let value

		if( fontFamily != "" && typeof googleFonts[fontFamily] != "object" ) {
			value = false
		} else {
			value = true
		}

		props.setAttributes( { [loadGoogleFonts.label]: value } )
	}

    const onAdvancedControlReset=()=> {

		const { setAttributes } = props

		// Reset Font family to default.
		setAttributes( { [ props.fontFamily.label ]: "Default" } )
		setAttributes( { [ props.fontWeight.label ]: undefined } )

		// Reset Google Fonts to default.
		setAttributes( { [ props.loadGoogleFonts.label ]: false } )
	}

    const onAdvancedControlClick = () => {
        console.log('hello world');
		let control = true
		let label = __( "Hide Advanced",'timeline-block' )

		if( showAdvancedControls === true ) {
			control = false
			label = __( "Advanced",'timeline-block' )
		}
        setShowAdvancedControls(control);
	}

    const resetFontAdvancedControls = () => {
        return (
            <div
                className="components-button timeline-block-size-btn timeline-block-typography-reset-btn is-small"
                onClick={ onAdvancedControlReset }
            ><Dashicon icon="image-rotate" /></div>
        )
    }

    const timeline_settings_apply = () =>{
        return props.fontFamily.value !== 'Default' ? 'cp-timeline-typography_apply' : '';
    }

    const fontAdvancedControls = () => {
        return (
            <Button
                className="timeline-block-size-btn timeline-block-typography-control-btn"
                isSmall
                onClick={ onAdvancedControlClick }
            ><Dashicon icon="admin-tools" /></Button>
        ) 
    }

	return (
        <div className={`timeline-block-typography-options timeline-block-font-family-option ${timeline_settings_apply()}`}>
            <div className="timeline-block-typography-option-actions">
                <div>{ props.label }</div>
                { resetFontAdvancedControls() }
                { fontAdvancedControls() }
            </div>
            {showAdvancedControls && 
            
            <div className="timeline-block-typography-advanced">
                <div className="timeline-block-typography-font-family-options">
                    <label className="timeline-block-typography-font-family-label">{ __( "Font Family",'timeline-block' ) }</label>
                    <Select
                        options={ fonts }
                        value={ { value: props.fontFamily.value, label: props.fontFamily.value, weight: fontWeightObj } }
                        isMulti={ false }
                        maxMenuHeight={ 300 }
                        onChange={ onFontfamilyChange }
                        className="react-select-container" 
                        classNamePrefix="react-select"
                    />
                    <SelectControl
                        label={ __( "Font Weight",'timeline-block' ) }
                        value={ props.fontWeight.value }
                        onChange={ ( value ) => props.setAttributes( { [ props.fontWeight.label ]: value } ) }
                        options={
                            fontWeightObj
                        }
                    />
                </div>
            </div>
            }
        </div>
	)
}

export default GoogleFontFamily

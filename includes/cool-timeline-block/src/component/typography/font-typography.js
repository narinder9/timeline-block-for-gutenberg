/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';
 import Select from "react-select";
const {
	SelectControl
} = wp.components

// Extend component
const { Component, Fragment } = wp.element

/**
 * Internal dependencies
 */
import map from "lodash/map.js";
import googleFonts from "./fonts.js";

function FontFamilyControl( props ) {

	const fonts = [
		{ value: "", label: __( "Default",'timeline-block' ), weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Arial", label: "Arial", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Helvetica", label: "Helvetica", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Times New Roman", label: "Times New Roman", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Georgia", label: "Georgia", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
	]

	let fontWeight = ""
	let fontSubset = ""

	//Push Google Fonts into stytem fonts object
	Object.keys( googleFonts ).map( ( k, v ) => {
		fonts.push(
			{ value: k, label: k, weight: googleFonts[k].weight }
		)

		if( k === props.fontFamily.value ) {
			fontWeight = googleFonts[k].weight
			fontSubset = googleFonts[k].subset
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

	const fontSubsetObj = []

	if( typeof fontSubset == "object" ) {
		fontSubset.forEach(function(item) {
			fontSubsetObj.push(
				{ value: item, label: item }
			)
		})
	}

	const onFontfamilyChange = ( value ) => {
		const { loadGoogleFonts, fontFamily, fontWeight, fontSubset } = props
		props.setAttributes( { [ fontFamily.label ]: value.label } )
		onLoadGoogleFonts( loadGoogleFonts, value.label )
		onFontChange( fontWeight, fontSubset, value.label )
	}

	const onFontChange = ( fontWeight, fontSubset, fontFamily ) => {

		let font_flag
		let new_value

		if( typeof googleFonts[fontFamily] == "object" ) {

			const gfontsObj = googleFonts[fontFamily].weight
			const gfontSubsetObj = googleFonts[fontFamily].subset

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

				gfontSubsetObj.forEach(function(item) {

					if( fontSubset.value == item ) {
						font_flag = false
					} else {
						new_value  = item
						font_flag = true
						props.setAttributes( { [ props.fontSubset.label ]: new_value } )
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

	return (
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
				__nextHasNoMarginBottom={ true }
			/>
			<SelectControl
				label={ __( "Font Subset",'timeline-block' ) }
				value={ props.fontSubset.value }
				onChange={ ( value ) => props.setAttributes( { [ props.fontSubset.label ]: value } ) }
				options={
					fontSubsetObj
				}
				__nextHasNoMarginBottom={ true }
			/>
		</div>
	)
}

export default FontFamilyControl

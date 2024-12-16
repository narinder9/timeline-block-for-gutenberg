/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';

const {
	ButtonGroup,
	Button,
	Dashicon,
} = wp.components

// Extend component
const { Fragment } = wp.element
const { useSelect, useDispatch } = wp.data;
import map from 'lodash/map.js';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function Columnresponsive ( props ) {
	const deviceType = useSelect( ( select ) => {
		return select( 'core/editor' ).getDeviceType();
    }, [] );
	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType,
	} = useDispatch( 'core/edit-post' );
	const customSetPreviewDeviceType = ( device ) => {
		setPreviewDeviceType( device );
    };
	const devices = [
		{
			name: 'Desktop',
			title: <Dashicon icon="desktop" />,
			itemClass: 'timeline-block-desktop-tab timeline-block-responsive-tabs',
		},
		{
			name: 'Tablet',
			title: <Dashicon icon="tablet" />,
			itemClass: 'timeline-block-tablet-tab timeline-block-responsive-tabs',
		},
		{
			name: 'Mobile',
			key: 'mobile',
			title: <Dashicon icon="smartphone" />,
			itemClass: 'timeline-block-mobile-tab timeline-block-responsive-tabs',
		},
	];
	const output = {};
	output.Desktop = (
        <Fragment></Fragment>
	);
	output.Tablet = (
        <Fragment></Fragment>
	);
	output.Mobile = (
        <Fragment></Fragment>
	);
	return (
		<div className={ 'timeline-block-typography-range-options' }>
			<div className="timeline-block-size-type-field-tabs">
				<ButtonGroup className="components-tab-panel__tabs" aria-label={ __( 'Device', 'timeline-block' ) }>
					{ map( devices, ( { name, key, title, itemClass } ) => (
						<Button
							key={ key }
							className={ `components-button components-tab-panel__tabs-item ${ itemClass }${ name === deviceType ? ' active-tab' : '' }` }
							aria-pressed={ deviceType === name }
							onClick={ () => customSetPreviewDeviceType( name ) }
						>
							{ title }
						</Button>
					) ) }
				</ButtonGroup>
				<div className="timeline-block-responsive-control-inner">
				{ ( output[ deviceType ] ? output[ deviceType ] : output.Desktop ) }
				</div>
			</div>
		</div>
	);
}
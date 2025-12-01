<?php


// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_assets', 'cltb_timeline_block_editor_assets' );
function cltb_timeline_block_editor_assets() {
	if(!function_exists('get_the_ID')){
		return;
	}

	$id = get_the_ID();

	$assets_loading_meta=get_post_meta($id, 'ctlb_assets_loading', true);

	wp_localize_script(
		'cltb_cp_timeline-cgb-block-js',
		'CtlbCPTimelineBlock',
		array(
			'ajaxURL' => admin_url( '/admin-ajax.php' ),
			'assetsLoadingMeta' => $assets_loading_meta,
			'assetLoadingUpdateKey'=>wp_create_nonce('ctlb_asset_loading_update_key')
		)
	);

	if ( has_block( 'cp-timeline/content-timeline-block', $id ) || 'true' === $assets_loading_meta || is_admin() ) {
		wp_enqueue_style( 'cltb_cp_timeline-cgb-style' );
	} else {
		if ( ! is_admin() ) {
			wp_dequeue_style( 'cltb_cp_timeline-cgb-style' );
		}
	}
}

add_action( 'enqueue_block_editor_assets', 'cltb_editor_side_css' );
function cltb_editor_side_css() {
		// Common Editor style.
		wp_enqueue_style(
			'timeline-block
		-block-common-editor-css', // Handle.
			plugin_dir_url( __FILE__ ) . '../assets/common-block-editor.css', // Block editor CSS.
			array( 'wp-edit-blocks' )// Dependency to include the CSS after it.
		);
}

add_action( 'wp_head', 'cltb_timeline_block_load_post_assets' );
function cltb_timeline_block_load_post_assets() {
	global $post;
	$this_post = $post;
	if ( ! is_object( $this_post ) ) {
		return;
	}
	$this_post = apply_filters( 'timeline-block_post_for_stylesheet', $this_post );
	if ( ! is_object( $this_post ) ) {
		return;
	}

	if ( ! isset( $this_post->ID ) ) {
		return;
	}

	if ( has_blocks( $this_post->ID ) && isset( $this_post->post_content ) ) {

		$blocks      = parse_blocks( $this_post->post_content );
		$page_blocks = $blocks;

		if ( ! is_array( $page_blocks ) || empty( $page_blocks ) ) {
			return;
		}
		foreach ( $page_blocks as $i => $block ) {

			if ( is_array( $block ) ) {

				if ( '' === $block['blockName'] ) {
					continue;
				}
				$default_Fonts = array( '', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia' );
				if ( isset( $block['attrs']['headFontFamily'] ) ) {
					if ( ! in_array( $block['attrs']['headFontFamily'], $default_Fonts ) ) {
						$headFont = array();
						array_push( $headFont, $block['attrs']['headFontFamily'] );
						if ( isset( $block['attrs']['headFontWeight'] ) ) {
							array_push( $headFont, $block['attrs']['headFontWeight'] );
						}
						if ( isset( $block['attrs']['headFontSubset'] ) ) {
							array_push( $headFont, $block['attrs']['headFontSubset'] );
						}

						$head_font_url = ctlb_timeline_get_font_url( $headFont );

						echo '<link href="'.esc_url($head_font_url).'" rel="stylesheet">';
					}
				}
				if ( isset( $block['attrs']['subHeadFontFamily'] ) ) {
					if ( ! in_array( $block['attrs']['subHeadFontFamily'], $default_Fonts ) ) {
						$subheadFont = array();
						array_push( $subheadFont, $block['attrs']['subHeadFontFamily'] );
						if ( isset( $block['attrs']['subHeadFontWeight'] ) ) {
							array_push( $subheadFont, $block['attrs']['subHeadFontWeight'] );
						}
						if ( isset( $block['attrs']['subHeadFontSubset'] ) ) {
							array_push( $subheadFont, $block['attrs']['subHeadFontSubset'] );
						}

						$subhead_font_url = ctlb_timeline_get_font_url( $subheadFont );

						echo '<link href="'.esc_url($subhead_font_url).'" rel="stylesheet">';
					}
				}
				if ( isset( $block['attrs']['dateFontFamily'] ) ) {
					if ( ! in_array( $block['attrs']['dateFontFamily'], $default_Fonts ) ) {
						$dateFont = array();
						array_push( $dateFont, $block['attrs']['dateFontFamily'] );
						if ( isset( $block['attrs']['dateFontWeight'] ) ) {
							array_push( $dateFont, $block['attrs']['dateFontWeight'] );
						}
						if ( isset( $block['attrs']['dateFontSubset'] ) ) {
							array_push( $dateFont, $block['attrs']['dateFontSubset'] );
						}

						$date_font_url = ctlb_timeline_get_font_url( $dateFont );

						echo '<link href="'.esc_url($date_font_url).'" rel="stylesheet">';
					}
				}
			}
		}
	}

}

function ctlb_timeline_get_font_url( $font_set ) {
	$font_url = add_query_arg(
		array(
			'family' => rawurlencode( implode( ':', $font_set ) ),
		),
		'https://fonts.googleapis.com/css'
	);
	return $font_url;
}

function cltb_cp_timeline_cgb_block_assets() {
	wp_register_style(
		'cltb_cp_timeline-cgb-style', // Handle.
		Timeline_Block_Url . 'includes/cool-timeline-block/dist/style-index.css',
		is_admin() ? array( 'wp-editor' ) : null,
		null
	);

	wp_register_script(
		'cltb_cp_timeline-cgb-block-js', // Handle.
		Timeline_Block_Url . 'includes/cool-timeline-block/dist/block.build.js',
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		null,
		true
	);

	wp_register_style(
		'cltb_cp_timeline-cgb-block-editor-css', // Handle.
		Timeline_Block_Url . 'includes/cool-timeline-block/dist/index.css',
		array( 'wp-edit-blocks' ),
		null
	);

	if ( function_exists( 'register_block_type' ) ) {

		register_block_type(
			'cp-timeline/content-timeline-block',
			array(
				'api_version'   => 2,
				// Enqueue blocks.style.build.css on both frontend & backend.
				'style'         => 'cltb_cp_timeline-cgb-style',
				// Enqueue blocks.build.js in the editor only.
				'editor_script' => 'cltb_cp_timeline-cgb-block-js',
				// Enqueue blocks.editor.build.css in the editor only.
				'editor_style'  => 'cltb_cp_timeline-cgb-block-editor-css',
			)
		);
		register_block_type(
			'cp-timeline/content-timeline-block-child',
			array(
				'api_version' => 2,
			)
		);
	}
}

// Hook: Block assets.
add_action( 'init', 'cltb_cp_timeline_cgb_block_assets' );

add_action( 'wp_ajax_ctlb_asset_loading_update', 'cltb_asset_loading_update' );

function cltb_asset_loading_update() {
	if ( ! wp_verify_nonce( $_POST['assets_loading_key'], 'ctlb_asset_loading_update_key' ) ) {
		wp_send_json_error( 'Invalid nonce' );
	}
	
	if(!isset($_POST['post_id'])){
		wp_send_json_error( 'Post ID parameter missing' );
	}
	
	if(!isset($_POST['assets_loading_meta'])){
		wp_send_json_error( 'Assets loading meta parameter missing' );
	}
	
	$value=sanitize_text_field(wp_unslash($_POST['assets_loading_meta']));
	$post_id=sanitize_text_field(wp_unslash($_POST['post_id']));

	if($value === 'true'){
		update_post_meta( $post_id, 'ctlb_assets_loading', $value );
	}else{
		delete_post_meta( $post_id, 'ctlb_assets_loading' );
	}

	wp_send_json_success(array('status'=>'success', 'updateValue'=>$value));
}


<?php


// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


function cltb_cp_timeline_cgb_block_assets() { 
	wp_register_style(
		'cltb_cp_timeline-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), 
		is_admin() ? array( 'wp-editor' ) : null, 
		null 
	);
	
	
	wp_register_script(
		'cltb_cp_timeline-cgb-block-js', // Handle.
		plugins_url( 'dist/blocks.build.js', dirname( __FILE__ ) ), 
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), 
		null, 
		true 
	);

	
	wp_register_style(
		'cltb_cp_timeline-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), 
		array( 'wp-edit-blocks' ), 
		null 
	);
	
	
	wp_localize_script(
		'cltb_cp_timeline-cgb-block-js',
		'cgbGlobal', 
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ )
			
		]
	);

	if ( function_exists( 'register_block_type' ) ) {

	register_block_type(
		'cp-timeline/content-timeline-block', array(
			'api_version' => 2,
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'cltb_cp_timeline-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'cltb_cp_timeline-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'cltb_cp_timeline-cgb-block-editor-css'
		)
	);
	register_block_type(
		'cp-timeline/content-timeline-block-child', array(
			'api_version' => 2
		)
	);
	}
}

// Hook: Block assets.
add_action( 'init', 'cltb_cp_timeline_cgb_block_assets' );

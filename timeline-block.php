<?php

/**
 * Plugin Name:Timeline Block
 * Plugin URI:https://cooltimeline.com
 * Description:Responsive timeline block for Gutenberg editor.
 * Version:1.3
 * Author:Cool Plugins
 * Author URI:https://coolplugins.net
 * License:GPLv2 or later
 * License URI:https://www.gnu.org/licenses/gpl-2.0.html
 * Domain Path:/languages
 * Text Domain:timeline-block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'Timeline_Block_File', __FILE__ );
define( 'Timeline_Block_Url', plugin_dir_url( Timeline_Block_File ) );
define( 'Timeline_Block_Dir', plugin_dir_path( __FILE__ ) );

// define("GCTL_TIMELINE", __DIR__);
/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
if ( ! class_exists( 'CoolTimelineBlock' ) ) {
	final class CoolTimelineBlock {


		/**
		 * The unique instance of the plugin.
		 */
		private static $instance;

		/**
		 * Gets an instance of our plugin.
		 */
		public static function get_instance() {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/** Constructor */
		public function __construct() {
			 // Setup your plugin object here
			/* including required files */
			add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'timeline_block_editor_assets' ) );
			add_action( 'enqueue_block_assets', array( __CLASS__, 'timeline_block_frontend_assets' ) );
			add_action( 'plugins_loaded', array( $this, 'ctlb_include_files' ) );
			add_action( 'init', array( __CLASS__, 'create_block_cool_plugin_timeline_block_init' ) );
		}

		/*
		  Including required files
		*/
		public function ctlb_include_files() {
			require Timeline_Block_Dir . 'includes/gutenberg-block/init.php';
		}

		/**
		 * Registers the block using the metadata loaded from the `block.json` file.
		 * Behind the scenes, it registers also all assets so they can be enqueued
		 * through the block editor in the corresponding context.
		 *
		 * @see https://developer.wordpress.org/reference/functions/register_block_type/
		 */
		public static function create_block_cool_plugin_timeline_block_init() {
			register_block_type( __DIR__ . '/includes/cool-timeline-block/build/story-timeline/block.json' );
			register_block_type( __DIR__ . '/includes/cool-timeline-block/build/story-timeline-child/block.json' );
		}

		public static function timeline_block_editor_assets() {
			wp_enqueue_style( 'cp_timeline-cgb-style-css', plugin_dir_url( __FILE__ ) . 'includes/cool-timeline-block/assets/common-block-editor.css', array( 'wp-edit-blocks' ) );

			wp_enqueue_style(
				'timeline-block
            -block-swiper-css', // Handle
				Timeline_Block_Url . 'includes/cool-timeline-block/assets/swiper/swiper.css',
			);

			wp_enqueue_script(
				'timeline-block
            -block-swiper-js', // Handle.
				Timeline_Block_Url . 'includes/cool-timeline-block/assets/swiper/swiper.js',
				array(),
				null,
				true
			);

			wp_enqueue_script(
				'timeline-block
            -block-slider-js', // Handle.
				Timeline_Block_Url . 'includes/cool-timeline-block/assets/js/slider.js',
				array( 'jquery' ),
				null,
				true
			);
		}

		public static function timeline_block_frontend_assets() {
			$id = get_the_ID();

			if ( has_block( 'cp-timeline/content-timeline-block', $id ) ) {
				wp_enqueue_style(
					'timeline-block
				-block-swiper-css', // Handle.
					Timeline_Block_Url . 'includes/cool-timeline-block/assets/swiper/swiper.css',
				);

				wp_enqueue_script(
					'timeline-block
				-block-swiper-js', // Handle.
					Timeline_Block_Url . 'includes/cool-timeline-block/assets/swiper/swiper.js',
					array(),
					null,
					true
				);

				wp_enqueue_script(
					'timeline-block
				-block-slider-js', // Handle.
					Timeline_Block_Url . 'includes/cool-timeline-block/assets/js/slider.js',
					array( 'jquery' ),
					null,
					true
				);

			}
		}
	}
}

CoolTimelineBlock::get_instance();

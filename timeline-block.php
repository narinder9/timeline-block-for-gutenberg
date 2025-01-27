<?php
/**
 * Plugin Name:Timeline Block
 * Plugin URI:https://cooltimeline.com
 * Description:Responsive timeline block for Gutenberg editor.
 * Version:1.7.1
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
if ( ! defined( 'Timeline_Block_Version' ) ) {
	define( 'Timeline_Block_Version', '1.7.1' );
}

/**
 * This class is responsible for registering all block assets, making them available for enqueueing through the block editor in the appropriate context.
 * For more information on applying styles with stylesheets in the block editor, refer to the following resource:
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
if ( ! class_exists( 'CoolTimelineBlock' ) ) {
	final class CoolTimelineBlock {

		/**
		 * This property holds the unique instance of the plugin.
		 */
		private static $instance;

		/**
		 * This method retrieves an instance of our plugin.
		 * It ensures that only one instance of the plugin is created, adhering to the singleton pattern.
		 */
		public static function get_instance() {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/** Constructor */
		public function __construct() {
			// This section sets up the plugin object by hooking into the 'plugins_loaded' action to include required files.
			add_action( 'plugins_loaded', array( $this, 'ctlb_include_files' ) );

			// Load plugin textdomain
			add_action('init', array($this, 'ctlb_load_plugin_textdomain'));
		}

		/**
		 * Load plugin textdomain
		 */
		public function ctlb_load_plugin_textdomain() {
			load_plugin_textdomain('timeline-block', false, basename( dirname( __FILE__ ) ) . '/languages/');
		}

		/**
		 * This method includes all the necessary files for the plugin to function.
		 * It loads files for the Gutenberg block, the Cool Timeline Block source, and admin feedback functionality.
		 */
		public function ctlb_include_files() {
			require Timeline_Block_Dir . 'includes/gutenberg-block/init.php'; // Includes the Gutenberg block initialization file.
			require Timeline_Block_Dir . 'includes/cool-timeline-block/src/init.php'; // Includes the Cool Timeline Block source initialization file.

			if ( is_admin() ) { // Checks if the current request is for an administrative interface page.
				require_once Timeline_Block_Dir . 'admin/feedback/ctlb-users-feedback.php'; // Includes the admin feedback functionality file.
			}
		}
	}
}
CoolTimelineBlock::get_instance();

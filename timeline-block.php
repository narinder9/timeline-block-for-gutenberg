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

define('Timeline_Block_File', __FILE__);
define('Timeline_Block_Url', plugin_dir_url(Timeline_Block_File));
define('Timeline_Block_Dir', plugin_dir_path(__FILE__));

//  define("GCTL_TIMELINE", __DIR__);
/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
if (!class_exists('CoolTimelineBlock')) {
    final class CoolTimelineBlock
    {

        /**
         * The unique instance of the plugin.
         *
         */
        private static $instance;

        /**
         * Gets an instance of our plugin.
         *
         */
        public static function get_instance()
        {
            if (null === self::$instance) {
                self::$instance = new self();
            }

            return self::$instance;
        }

        /** Constructor */
        public function __construct()
        {
            //Setup your plugin object here
            /* including required files */
            add_action('plugins_loaded', array($this, 'ctlb_include_files'));
            add_action('init', [__CLASS__, 'create_block_cool_plugin_timeline_block_init']);
        }

        /*
          Including required files
        */
        public function ctlb_include_files()
        {
            require Timeline_Block_Dir .'includes/gutenberg-block/init.php';
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
    }
}

CoolTimelineBlock::get_instance();

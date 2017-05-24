<?php
/*
Plugin Name: Covers
Plugin URI: http://tidhar.dev
Description: Covers block for tidhar
Version: 0.1
Author: Michael M - WPBakery.com
Author URI: http://wpbakery.com
*/

function covers_vc_map_init() {
	$settings = array(
		'name'                    => __( 'covers', 'js_composer' ),	// shortcode name
		'base'                    => 'covers',	// shortcode base [coverim]
		'category'                => __( 'Tidhar', 'js_composer' ),		// param category tab in add elements view
		'description'             => __( 'Covers for tidhar', 'js_composer' ),		// element description in add elements view
		'show_settings_on_create' => false,	// don't show params window after adding
		//'weight'                  => - 5,		// Depends on ordering in list, Higher weight first
		//'class' => 'suka-class',
		"is_container" => true,
		"content_element" => true,
		'html_template'           => dirname( __FILE__ ) . '/templates/coverim.php',
		"js_view" => 'ViewCovers'

	);
	vc_map( $settings );

	if ( class_exists( "WPBakeryShortCodesContainer" ) ) {
		// Class Name should be WPBakeryShortCode_Your_Short_Code
		// See more in vc_composer/includes/classes/shortcodes/shortcodes.php
		class WPBakeryShortCode_covers extends WPBakeryShortCodesContainer {


		}
	} // End Class
}


add_action('vc_after_init', 'covers_vc_map_init');

function cover_item_vc_map_init() {
	$params = array(
		array(
			"type" => "dropdown",
			"heading" => __("size of column", "my-text-domain"),
			"param_name" => "el_class",
			"value" => array("1/4" => "col-md-3 ", "1/3" => "col-md-4", "1/2" => "col-md-6 ", "2/3" => "col-md-8",  "3/4" => "col-md-9 ", "11" => "col-md-12",),
			"description" => __("This is the size of column", "my-text-domain")
		),
		array(
			"type" => "dropdown",
			"heading" => __("size of column", "my-text-domain"),
			"param_name" => "el_class_height",
			"value" => array("1" => "height-100 ", "2" => "height-200", "3" => "height-300 "),
			"description" => __("This is the height size of column", "my-text-domain")
		),
		array(
			"type" => "attach_image",
			"heading" => __("background image", "my-text-domain"),
			"param_name" => "el_image",
			"description" => __("Please chose image.", "my-text-domain")
		),
		array(
			"type" => "textfield",
			"heading" => __("Title of the block", "my-text-domain"),
			"param_name" => "el_title",
			"description" => __("You can write it here", "my-text-domain")
		),
		array(
			"type" => "textfield",
			"heading" => __("Main text", "my-text-domain"),
			"param_name" => "el_text",
			"description" => __("You can write it here.", "my-text-domain")
		),
		array(
			'type' => 'vc_link',
			'heading' => __( 'URL (Link)', 'js_composer' ),
			'param_name' => 'el_url',
			'dependency' => array(
				'element' => 'link',
				'value' => array( 'custom' )
			),
			'descrsiption' => __( 'Add custom link.', 'js_composer' ),
		),
		array(
			"type" => "textfield",
			"heading" => __("Text on top of left top of the block", "my-text-domain"),
			"param_name" => "el_datetext",
			"description" => __("You can write it here.", "my-text-domain")
		),
	);
	// Note that all keys=values in mapped shortcode can be used with javascript variable vc.map, and php shortcode settings variable.
	$settings = array(
		'name'                    => __( 'Coveres object', 'js_composer' ),		// shortcode name
		'base'                    => 'cover_item',		// shortcode base [cover_item]
		'category'                => __( 'Tidhar', 'js_composer' ),		// param category tab in add elements view
		'description'             => __( 'Cover item inside all items', 'js_composer' ),		// element description in add elements view
		//'show_settings_on_create' => false,		// don't show params window after adding
		"content_element" => true,
		'html_template'           => dirname( __FILE__ ) . '/templates/cover_item.php',
		// if you extend VC within your theme then you don't need this, VC will look for shortcode template in "wp-content/themes/your_theme/vc_templates/test_element.php" automatically. In this example we are extending VC from plugin, so we rewrite template

		'admin_enqueue_js'        => preg_replace( '/\s/', '%20', plugins_url( 'assets/admin_cover_item.js', __FILE__ ) ),
		'admin_enqueue_css'       => preg_replace( '/\s/', '%20', plugins_url( 'assets/admin_covers.css', __FILE__ ) ),
//		'front_enqueue_js'        => preg_replace( '/\s/', '%20', plugins_url( 'assets/front_enqueue_js.js', __FILE__ ) ),

		'front_enqueue_css'       => preg_replace( '/\s/', '%20', plugins_url( 'assets/covers.css', __FILE__ ) ),


		'js_view'                 => 'ViewCoverItem',
		// JS View name for backend. Can be used to override or add some logic for shortcodes in backend (cloning/rendering/deleting/editing).

		'params'	=> $params,

		'custom_markup' => '
		<!--div class="vc_tta-panel-heading">
			<h4 class="vc_tta-panel-title vc_tta-controls-icon-position-left"><span class="vc_tta-title-text">{{ title }}</span><i class="vc_tta-controls-icon vc_tta-controls-icon-plus"></i></h4>		    
		</div-->
		<div class="vc_tta-panel-body">
					<img class="covers_admin_image" src="">
					<div class="infoBoxContent">
						<p class="covers_admin_title"><strong></strong></p>
						<div class="expand">
							<p class="covers_admin_text"></p>
						</div>
					</div>
					<div class=\"dateLabel\">עמוד פנימי | 16.12.16</div>
		</div>',

	);
	vc_map( $settings );

	if ( class_exists( "WPBakeryShortCode" ) ) {
		// Class Name should be WPBakeryShortCode_Your_Short_Code
		// See more in vc_composer/includes/classes/shortcodes/shortcodes.php
		class WPBakeryShortCode_cover_item extends WPBakeryShortCode {

			public function __construct( $settings ) {
				parent::__construct( $settings ); // !Important to call parent constructor to active all logic for shortcode.
				$this->jsCssScripts();
			}

			public function jsCssScripts() {
				wp_register_style( 'cover_item', plugins_url( 'assets/covers.css', __FILE__ ) );
				wp_enqueue_style( 'cover_item' );

				wp_register_script( 'cover_item_js', plugins_url( 'assets/covers.js', __FILE__ ) );
				wp_enqueue_script( 'cover_item_js' );
			}
		}
	} // End Class
}


add_action('vc_after_init', 'cover_item_vc_map_init');
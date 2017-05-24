<?php
/**
 * Created by PhpStorm.
 * User: levi.kim
 * Date: 23/05/2017
 * Time: 10:06
 */

$attributes= ( shortcode_atts( array(
	'el_class'			=> 'col-md-12',
	'el_class_height'	=> 'height-100',
	'el_url'			=> '#',
	'el_image'			=> '',
	'el_title'			=> 'el_title',
	'el_text'			=>	'el_text',
	'el_datetext'		=> 'el_datetext'
), $atts ) );

$el_class = $attributes['el_class'];
$el_class_height = $attributes['el_class_height'];
$el_url = $attributes['el_url'];
$el_image = $attributes['el_image'];
$el_title= $attributes['el_title'];
$el_text = $attributes['el_text'];
$el_datetext = $attributes['el_datetext'];




//$textfield = wpb_js_remove_wpautop($el_class, true); // fix unclosed/unwanted paragraph tags in $content

$el_image = wp_get_attachment_image_src($el_image, 'big');
$el_image = $el_image[0];
$output = "
			<div class=\"col-12 {$el_class} {$el_class_height} infoBox\">
				<a href=\" {$el_url} \">
					<img class=\"\" src=\"{$el_image}\" alt=\"2:1\">
					<div class=\"infoBoxContent\">
						<p><strong>{$el_title}</strong></p>
						<div class=\"expand\">
							<p>{$el_text}</p>
						</div>
					</div>
					<div class=\"dateLabel\">{$el_datetext}</div>
				</a>
			</div>
";

echo $output;
?>
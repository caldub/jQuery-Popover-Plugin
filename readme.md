# jQuery popover plugin

The jQuery popover plugin brings iOS style popovers to your browser.

It allows you to bring up a popover under any jQuery element, whether the clicked element or an arbitrary one.

While it includes basic styling, it is intended that you add whatever styling you prefer.

## Usage

First, load [jQuery](http://jquery.com/) (preferably from a CDN) and the jQuery popover plugin:

	<link href="jquery.popover.css" rel="stylesheet" />
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
	<script src="jquery.popover.js" type="text/javascript"></script>

Now, attach to whatever jQuery element you'd like:

	<script type="text/javascript">
	$(function() {
		$("a").popover();
	});
	</script>
	
	<a href="#content">Click me</a>
	<div id="content" style="display:none">This content will appear in the popover.</div>
		
As it is intended for use with `<a>` tags, the popover plugin uses the `href` attribute to gets its content.
	
However, this is easy to customize with the plugin's settings.

## Advanced Configuration

	<script type="text/javascript">
	$(function() {
		$("a").popover({
			trigger: 'click', // what event should trigger the popover; http://api.jquery.com/bind/#bind1
			closeHTML: '&#215;', // the text that gets displayed                
			appearUnder: element, // accepts any jQuery selector              
			baseClass: 'popover', // the string which prepends all CSS classes; make sure to change the CSS, too!
			escape: true, // enable using the escape button to close the popover
			clickOff: true, // enables closing the popover by clicking anywhere but the popover itself
			maskOpacity: 0, // the opacity of the background mask
			animationSpeed: 370, // the speed of the animation
			title: $element.text(), // the title of the popover
			content: function() { // where to get the popover's content from; can just a string, if you'd like           
				var content = $element.attr("href");
				return $(content).html();           
			},                                    
			onTrigger: function() { }, // function to run when the popover is triggered      
			onDisplay: function() { }, // function to run when the popover is displayed 
			onClose: function() { } // function to run when the popover is closed               
		})
	});
	</script>
	
## Attribution

[jQuery Plugin Boilerplate](http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/)

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

You may freely use this plugin, without restriction, in software programs, web templates and other materials intended for sale or distribution. No attribution or backlinks are strictly required, but are always appreciated!

Copyright &copy; 2011, [Karoun Kasraie](http://karoun.me)
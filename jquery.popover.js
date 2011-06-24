/**
 * It: jQuery Popover Plugin
 * On: 06/2011
 * By: Karoun Kasraie
 * At: https://github.com/karoun
 */
;(function($) {
	var count = 0; // for associating an element with its popover
	
	$.popover = function(element, options) {
		var $element = $(element), plugin = this;
		var $all, $wrap, bc, bg, $bg,
				activeClass, closeSpeed;
		
		var defaults = {
			trigger: 'click', // what event should trigger the popover; http://api.jquery.com/bind/#bind1
			closeHTML: '&#215;', // the text that gets displayed                
			appearUnder: element, // accepts any jQuery selector              
			baseClass: 'popover', // the string which prepends all CSS classes; make sure to change the CSS, too!
			escape: true, // enable using the escape button to close the popover
			clickOff: true, // enables closing the popover by clicking anywhere but the popover itself
			maskOpacity: 0, // the opacity of the background mask
			animationSpeed: 370, // the speed of the animation
			title: $element.text(), // the title of the popover
			content: function() { // where to get the popover's content from                
				var content = $element.attr("href");
				return $(content).html();           
			},                                    
			onTrigger: function() { }, // function to run when the popover is triggered      
			onDisplay: function() { }, // function to run when the popover is displayed 
			onClose: function() { } // function to run when the popover is closed               
		};
		
		plugin.settings = {};
				
		plugin.init = function() {
			plugin.settings = $.extend({}, defaults, options);
			
			bc = plugin.settings.baseClass;
			bg = '#' + bc + '-bg'; $bg = $(bg);
			activeClass = bc + '-active';
			closeSpeed = plugin.settings.animationSpeed / 2.5;
			
			buildHTML();
			
			var close = '.' + bc + '-wrap a.close';
			close += (plugin.settings.clickOff) ? ', ' + bg : '';
			
			$element.bind(plugin.settings.trigger, function(e) {
				plugin.settings.onTrigger.call(this);
				plugin.showPopover();
				e.preventDefault();
			});
			
			if (plugin.settings.escape) {
				$('body').keyup(function(e) {
					if (e.which === 27) {
						var speed = (e.shiftKey) ? closeSpeed * 7 : closeSpeed;
						plugin.hidePopover(speed);
					}
				});
			}

			$(close).click(function(e) {
				var speed = (e.shiftKey) ? closeSpeed * 7 : closeSpeed;
				plugin.hidePopover(speed);
				e.preventDefault();
			});
		};
		
		plugin.destroy = function() {
			
		};
		
		plugin.showPopover = function(speed) {
			speed = typeof(speed) != 'undefined' ? speed : plugin.settings.animationSpeed;
			
			plugin.hidePopover();
			plugin.settings.onDisplay.call(this);
			
			$bg.css('opacity', plugin.settings.maskOpacity).show();
			$element.addClass(activeClass);
			
			var $under = $(plugin.settings.appearUnder);
			
			var pos = $under.offset();	
			var width = $under.width();
			var height = $under.height();
			var pop = $wrap.width();

			$wrap.css({
				'left': (pos.left + (width / 2) - (pop / 2)) + 'px', 
				'top': (pos.top + height + 14) + 'px' 
			}).fadeIn(speed);
		};
		
		plugin.hidePopover = function(speed) {
			speed = typeof(speed) != 'undefined' ? speed : closeSpeed;
			plugin.settings.onClose.call(this);
			$bg.hide();
			$('.' + activeClass).removeClass(activeClass);
			$all.fadeOut(speed);
		};
		
		var buildHTML = function() {
			if (!$bg.length) $('body').append('<div id="' + bc + '-bg" />');
			$bg = $(bg);
			var markup  = '<div class="' + bc + '-wrap"><div class="' + bc + '">';
					markup += '<h3 class="' + bc + '-title">' + plugin.settings.title + '</h3>';
					markup += '<div class="' + bc + '-content" />';
					markup += '<a href="#" class="close">' + plugin.settings.closeHTML + '</a>';
					markup += '<br class="clear" /></div></div>';
			$('body').append(markup);
			
			$all = $('.' + bc + '-wrap');
			$wrap = $($all[count]);
			
			$wrap.find('.' + bc + '-content').html(plugin.settings.content());
		};
		
		plugin.init();
	};
	
	$.fn.popover = function(options) {
		return this.each(function() {
			if (!$(this).data('popover')) {
				var plugin = new $.popover(this, options);
				$(this).data('popover', plugin);
				count++;
			}
		});
	};
})(jQuery);
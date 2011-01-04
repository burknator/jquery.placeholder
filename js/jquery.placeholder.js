(function($) {
	$.fn.placeholder = function() {
		/**
		 * @todo Add HTML5 form elements to filter!
		 */
		var $elements = $(this).filter('[type=text]');
		
		var elAmount = $elements.length;
		for(var i = 0; i < elAmount; i++) {
			var $element = $($elements.get(i));
			
			$.placeholder.placeHolder($element);
			
			$element.bind({
				'blur': $.placeholder.eventBlur,
				'focus': $.placeholder.eventFocus
			});
		}
	};
	
	$.placeholder = {
		placeHolder: function($element) {
			var $label = $element.parents('form').find('label[for=' + $element.attr('name') + '].placeholder');
			
			if($label.length == 1) {
				//
				// Position label ontop of input element
				//
				
				// Get the position of the input element
				var position = $element.offset();
				
				/**
				 * @todo padding-top and -left have to be added to the position of the label
				 */
				var top = position.top // + $element.css('padding-top');
				var left = position.left // + $element.css('padding-left');
				
				/**
				 * @todo Bad, css adjustments are always the same, so this should only happen once.
				 */
				$label.css({
					'position': 'absolute',
					'top': top,
					'left': left,
					'display': 'block',
					'z-index': parseInt($element.css('z-index')) + 1,
					'cursor': 'text'
				}).click(function() {
					$('[name=' + $(this).attr('for') + ']').click().focus();
				});
			}
		},
		
		eventBlur: function(e) {
			// Find label and make it visible
			// this == element
		},
		
		eventFocus: function(e) {
			// Find label and make it invisible
			// this == element
			
			$.placeholder.getLabel(this).css('display', 'none');
		},
		
		getLabel: function($element) {
			return $element
					.parents('form')
						.find('label[for=' + $element.attr('name') + '].placeholder')
		}
	}
})(jQuery);

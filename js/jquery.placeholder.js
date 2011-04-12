(function($) {
    $.fn.placeholder = function() {
        /**
         * @todo Add HTML5 form elements to filter!
         */
        var $elements = $(this).filter('[type=text]:not([placeholder])');
		
        var elAmount = $elements.length;
        for(var i = 0; i < elAmount; i++) {
            var $element = $($elements.get(i));
			
            $.placeholder.placeHolder($element);
			
            $element.bind({
                'focusout': $.placeholder.eventFocusOut,
                'focusin': $.placeholder.eventFocusIn
            });
        }
    };
	
    $.placeholder = {
        placeHolder: function($element) {
            var $label = $('label[for=' + $element.attr('name') + '].placeholder').wrap('<div class="label-container"/>').parent('.label-container');


            if($label.length == 1) {
                //
                // Position label ontop of input element
                //
				
                // Get the position of the input element
                var position = $element.position();
				console.log(position);
                /**
                 * @todo padding-top and -left have to be added to the position of the label
                 */
                var top = position.top - $element.height() // + $element.css('padding-top');
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
                    'cursor': 'text',
                    'height': $element.height() + 'px',
                    'width': $element.width() + 'px'
                }).click(function() {
                    $('[name=' + $(this).attr('for') + ']').focus();
                });

                $.each(['padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'], function( i, name ) {
                    if($element.css(name) != '') {
                        $label.css(name, $element.css(name));
                    }
                });
            }
        },
		
        eventFocusOut: function(e) {
            // Find label and make it visible
            // this == element

            $.placeholder.getLabelContainer($(this)).css('display', 'block');
        },
		
        eventFocusIn: function(e) {
            // Find label and make it invisible
            // this == element
            
            $.placeholder.getLabelContainer($(this)).css('display', 'none');
        },
		
        getLabel: function($element) {
            return $('label[for=' + $element.attr('name') + '].placeholder');
        },

        getLabelContainer: function($element) {
            return $.placeholder.getLabel($element).parent('.label-container');
        }
    }
})(jQuery);

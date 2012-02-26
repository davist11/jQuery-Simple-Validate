/*
 * Simple jQuery Form Validation Plugin
 * http://github.com/davist11/jQuery-Simple-Validate
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.2
 *
 * Example usage:
 * $('form.required-form').simpleValidate({
 *   errorClass: 'error',
 *   errorText: '{label} is a required field.',
 *   emailErrorText: 'Please enter a valid {label}',
 *   errorElement: 'strong',
 *   removeLabelChar: '*',
 *   inputErrorClass: '',
 *   completeCallback: '',
 *   ajaxRequest: false
 * });
 */
;(function($) {
	$.fn.simpleValidate = function(options) {
		var opts = $.extend({}, $.fn.simpleValidate.defaults, options);

		return this.each(function() {
			var $this = $(this),
					o = $.meta ? $.extend({}, opts, $this.data()) : opts,
					errorMsgType = o.errorText.search(/{label}/);
			
			//When the form is submitted
			$this.bind('submit', function(e) {
				var hasError = false;
				
				//Hide any errors that are already showing
				$this.find(o.errorElement + '.' + o.errorClass).remove();
				$this.find(':input.' + o.inputErrorClass).removeClass(o.inputErrorClass);
				
				//Get all the required inputs
				$this.find(':input.required').each(function() {
					var $input = $(this),
							fieldValue = $.trim($input.val()),
							labelText = $input.siblings('label').text().replace(o.removeLabelChar, ''),
							errorMsg = '';
					
					//Check if it's empty or an invalid email
					if(fieldValue === '') {
					  errorMsg = (errorMsgType > -1 ) ? errorMsg = o.errorText.replace('{label}',labelText) : errorMsg = o.errorText;
						hasError = true;
					} else if($input.hasClass('email')) {
					  if(!(/^([_a-z0-9-]+)(\.[_a-z0-9-]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(fieldValue.toLowerCase()))) {
					    errorMsg = (errorMsgType > -1 ) ? errorMsg = o.emailErrorText.replace('{label}',labelText) : errorMsg = o.emailErrorText;
					    hasError = true;
					  }
					}
					
					//If there is an error, display it
					if(errorMsg !== '') {
					  $input.addClass(o.inputErrorClass).after('<'+o.errorElement+' class="'+o.errorClass+'">' + errorMsg + '</'+o.errorElement+'>');
					}
				});
				
				if(hasError) { //Don't submit the form if there are errors
					e.preventDefault();
				} else if(o.completeCallback !== '') { //If there is a callback
					o.completeCallback($this);
					if(o.ajaxRequest) { //If AJAX request
						e.preventDefault();
					}
				}
			});
		});
	};

	// default options
	$.fn.simpleValidate.defaults = {
		errorClass: 'error',
		errorText: '{label} is a required field.',
		emailErrorText: 'Please enter a valid {label}',
		errorElement: 'strong',
		removeLabelChar: '*',
		inputErrorClass: '',
		completeCallback: '',
		ajaxRequest: false
	};
})(jQuery);
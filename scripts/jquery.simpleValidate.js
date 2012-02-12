/*
 * Simple jQuery Form Validation Plugin
 * https://github.com/mtsandeep/jQuery-Simple-Validate
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
				
				$this.find(':checkbox.required').each(function() {
					var $input = $(this),
						fieldValue = $input.is(':checked'),
						labelText = $input.siblings('label').text().replace(o.removeLabelChar, ''),
						errorMsg = '';
					if(fieldValue===false) {
						errorMsg = (errorMsgType > -1 ) ? errorMsg = o.checkboxErrorText.replace('{label}',labelText) : errorMsg = o.checkboxErrorText;
						hasError = true;
					}
					//If there is an error, display it
					showError(errorMsg,$input);
				});
				
				$this.find(':input.number').each(function() {
					var $input = $(this),
						fieldValue = $.trim($input.val()),
						labelText = $input.siblings('label').text().replace(o.removeLabelChar, ''),
						errorMsg = '';
					if(isNaN(fieldValue)) {
					  errorMsg = (errorMsgType > -1 ) ? o.numberErrorText.replace('{label}',labelText) : o.numberErrorText;
					  hasError = true;
					}
					//If there is an error, display it
					showError(errorMsg,$input);
				});
				
				$this.find(':input.email').each(function() {
					var $input = $(this),
						fieldValue = $.trim($input.val()),
						labelText = $input.siblings('label').text().replace(o.removeLabelChar, ''),
						errorMsg = '';
						if(fieldValue){
							if(!(/^([_a-z0-9-]+)(\.[_a-z0-9-]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(fieldValue))) {
								errorMsg = (errorMsgType > -1 ) ? o.emailErrorText.replace('{label}',labelText) : o.emailErrorText;
								hasError = true;
							}
						}
					
					//If there is an error, display it
					showError(errorMsg,$input);
				});
				
				//Get all the required inputs
				$this.find(':input.required').each(function() {
					var $input = $(this),
							fieldValue = $.trim($input.val()),
							labelText = $input.siblings('label').text().replace(o.removeLabelChar, ''),
							errorMsg = '';
					
					//Check if it's empty or an invalid email
					if(fieldValue === '') {
					  errorMsg = (errorMsgType > -1 ) ? o.errorText.replace('{label}',labelText) : o.errorText;
						hasError = true;
					} else if($input.hasClass('confirm-password')) {
						var $password = $this.find('.password').val();
						if($password!=fieldValue){
							errorMsg = o.passwordErrorText;
							hasError = true;
						}
					} 
					//If there is an error, display it
					showError(errorMsg,$input);
				});
				
				function showError(errorMsg,$input){
					if(errorMsg !== '') {
					  $input.addClass(o.inputErrorClass).after('<'+o.errorElement+' class="'+o.errorClass+'">' + errorMsg + '</'+o.errorElement+'>');
					  $this.addClass('hasError');
					}
				}
				
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
		numberErrorText: '{label} needs to be a valid number',
		checkboxErrorText: 'Please check this',
		passwordErrorText: 'Passwords doesn\'t match',
		errorElement: 'em',
		removeLabelChar: '*',
		inputErrorClass: '',
		completeCallback: '',
		ajaxRequest: false
	};
})(jQuery);
/*
 * Simple jQuery Form Validation Plugin
 * http://github.com/davist11/jQuery-Simple-Validate
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.3
 *
 * Example usage:
 * $('form.required-form').simpleValidate({
 *	 errorClass: 'error',
 *	 errorText: '{label} is a required field.',
 *	 emailErrorText: 'Please enter a valid {label}',
 *	 errorElement: 'strong',
 *	 removeLabelChar: '*',
 *	 inputErrorClass: '',
 *	 completeCallback: '',
 *	 ajaxRequest: false
 * });
 */
;(function($, window, document, undefined){

	// our plugin constructor
	var SimpleValidate = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$requiredInputs = this.$elem.find(':input.required');
	};

	// the plugin prototype
	SimpleValidate.prototype = {
		defaults: {
			errorClass: 'error',
			errorText: '{label} is a required field.',
			emailErrorText: 'Please enter a valid {label}',
			errorElement: 'strong',
			removeLabelChar: '*',
			inputErrorClass: 'input-error',
			completeCallback: '',
			ajaxRequest: false
		},

		init: function() {
			var self = this;

			// Introduce defaults that can be extended either
			// globally or using an object literal.
			self.config = $.extend({}, self.defaults, self.options, self.metadata);
			
			// What type of error message is it
			self.errorMsgType = self.config.errorText.search(/{label}/);
			self.emailErrorMsgType = self.config.emailErrorText.search(/{label}/);
			
			self.$elem.on('submit.simpleValidate', $.proxy(self.handleSubmit, self));

			return this;
		},
		
		checkField: function(index) {
			var self = this;
			var $field = self.$requiredInputs.eq(index);
			var fieldValue = $.trim($field.val());
			var labelText = $field.siblings('label').text().replace(self.config.removeLabelChar, '');
			var errorMsg = '';
			
			//Check if it's empty or an invalid email and format the error message
			if(fieldValue === '') {
				errorMsg = self.formatErrorMsg(self.config.errorText, labelText, self.errorMsgType);
				self.hasError = true;
			} else if($field.hasClass('email')) {
				if(!(/^([_a-z0-9-]+)(\.[_a-z0-9-]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(fieldValue.toLowerCase()))) {
					errorMsg = self.formatErrorMsg(self.config.emailErrorText, labelText, self.emailErrorMsgType);
					self.hasError = true;
				}
			}
			
			//If there is an error, display it
			if(errorMsg !== '') {
			  $field.addClass(self.config.inputErrorClass).after('<' + self.config.errorElement + ' class="' + self.config.errorClass + '">' + errorMsg + '</' + self.config.errorElement + '>');
			}
		},
		
		formatErrorMsg: function(errorText, labelText, errorMsgType) {
			return (errorMsgType > -1 ) ? errorText.replace('{label}', labelText) : errorText;
		},
		
		handleSubmit: function(e) {
			var self = this;
			
			// We are just starting, so there are no errors yet
			this.hasError = false;
			
			// Reset existing displayed errors
			self.$elem.find(self.config.errorElement + '.' + self.config.errorClass).remove();
			self.$elem.find(':input.' + self.config.inputErrorClass).removeClass(self.config.inputErrorClass);
			
			// Check each field
			self.$requiredInputs.each($.proxy(self.checkField, self));
			
			// Don't submit the form if there are errors
			if(self.hasError) { 
				e.preventDefault();
			} else if(self.config.completeCallback !== '') { // If there is a callback
				self.config.completeCallback(self.$elem);
				
				// If AJAX request
				if(self.config.ajaxRequest) {
					e.preventDefault();
				}
			}
		}
	};

	SimpleValidate.defaults = SimpleValidate.prototype.defaults;

	$.fn.simpleValidate = function(options) {
		return this.each(function() {
			new SimpleValidate(this, options).init();
		});
	};

})( jQuery, window , document );
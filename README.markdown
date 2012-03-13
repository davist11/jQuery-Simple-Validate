This is a light-weight form validation plugin. All it does is check if a field is empty, or if an email field is a properly formatted email address.

To mark a field as required, just add a class of **required** to the field. To make sure the email is a valid email address, also add a class of **email** to the field. Then, just call the plugin on the form.

### Defaults:
<pre>$('form.required-form').simpleValidate({  
  errorClass: 'error', //Class for the error message text  
  errorText: '{label} is a required field.', //Structure for the error message text, {label} will be replaced with the associated label text  
  emailErrorText: 'Please enter a valid {label}', //Structure for the email error message text, {label} will be replaced with the associated label text  
  errorElement: 'strong', //Element to use for the error message text  
  removeLabelChar: '*', //If there is an extra character in the label to denote a required field, strip it out  
  inputErrorClass: '', //Class to add to an input when it is marked as having an error  
  completeCallback: '', //Function to call once the form is error-free  
  ajaxRequest: false //If you don't want to use the default form action and want to submit it via AJAX  
});</pre>
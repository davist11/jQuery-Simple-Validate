This is a light-weight form validation plugin, just 2.1kb minified (under 800 bytes gzipped).     
It can validate required field, email, number only field, password and password confirmation matching.  


**IN VERSION 0.2**   
To mark a field as valid, just add a class of **required** to the field.    
To make sure the email is a valid email address, also add a class of **email** to the field.   
To make field accept only number, add a class of **number** to the field.  
To make password and password confirmation, add a class of **password** to the password field and **confirm-password** to the confirm password field, error displayed if both doesn't match.     
Now you can also make checkbox required by adding required class to it, helpful for compulsory agreement accept checkboxes   
Then, just call the plugin on the form.

### Defaults:
<pre>$('form.required-form').simpleValidate({  
  errorClass: 'error', //Class for the error message text  
  errorText: '{label} is a required field.', //Structure for the error message text, {label} will be replaced with the associated label text  
  emailErrorText: 'Please enter a valid {label}', //Structure for the email error message text, {label} will be replaced with the associated label text  
  numberErrorText: 'Please enter a valid number', //Structure for the number only error message text   
  checkboxErrorText: 'Please check this', //Structure for the checkbox required error message text    
  passwordErrorText: 'Passwords doesn\'t match', //Structure for the password confirmation error message text     
  errorElement: 'strong', //Element to use for the error message text  
  removeLabelChar: '*', //If there is an extra character in the label to denote a required field, strip it out  
  inputErrorClass: '', //Class to add to an input when it is marked as having an error  
  completeCallback: '', //Function to call once the form is error-free  
  ajaxRequest: false //If you don't want to use the default form action and want to submit it via AJAX  
});</pre>
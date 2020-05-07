export default function(passwordBox) {
	var form = passwordBox.form;
	var inputs = form.getElementsByTagName('input');

	var filteredInputs = [];

	//Firstly, if there is one text box and one password box
	//we can reasonably infer that the only text box is the account name
	for (var i = 0; i < inputs.length; i++) {
		var type = inputs[i].type;

		if (!filteredInputs[type]) filteredInputs[type] = [];
		
		filteredInputs[type].push(inputs[i]);
	}

	if (filteredInputs['text'] && filteredInputs['text'].length == 1 && filteredInputs['password'].length == 1) {
		return filteredInputs.text[0];
	}	

	//Otherwise, look for the text box immediately before the password box
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i] == passwordBox) {
			var j = i;
			while (inputs[j] && inputs[j].type !== 'text') {
				j--;
			}

			// and check its name contains "email", "username" or "loginname"
			if (inputs[j].name.toLowerCase().indexOf('email') > -1 || inputs[j].name.toLowerCase().indexOf('username') > -1 || inputs[j].name.toLowerCase().indexOf('loginname') > -1) {
				return inputs[j];
			}
		}
	}


	// We could just find the `email` box but this will break on sites that ask for
	// email during the signup process but require a username to log in
	// As this is needed to hash the password, the user will be asked if this can't be found
	return false;
}
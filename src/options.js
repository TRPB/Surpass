import hashPassword from './hash.js';
import getDomainName from './getDomainName.js';
import sha256 from './sha256.js';

document.addEventListener('DOMContentLoaded', function() {
	var options = {

	};

	var saveOptions = function() {
		browser.storage.sync.set(options);
	}

	var url;
	browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
	    let tab = tabs[0]; // Safe to assume there will only be one result
	    url = getDomainName(tab.url);

	    document.querySelector('#gendomain').value = url;

	}, console.error);



	//localStorage['key'] = '';
	var key = browser.storage.sync.get(['key', 'accountName', 'accountDomain']).then(function(optionsStorage) {
		options = optionsStorage;

		document.getElementById('accountName').checked = options.accountName;
		document.getElementById('domain').value = options.accountDomain;

		if (!options.key) {
			document.querySelector('.key').style.display = 'block';
			document.querySelector('.main').style.display = 'none';
		}
		else {
			document.querySelector('.key').style.display = 'none';
			document.querySelector('.main').style.display = 'block';
		}
	});


	document.querySelector('#accountName').addEventListener('click', function() {
		if (this.checked) {
			options.accountName = true;
		}
		else {
			options.accountName = false;
			options.accountDomain = document.querySelector('#domain').value;
		}
		saveOptions();
	});

	document.querySelector('#domain').addEventListener('blur', function() {
		options.accountDomain = document.querySelector('#domain').value;
		saveOptions();
	});

	document.querySelector('#savebutton').addEventListener('click', function() {
		alert('key saved');
		options.key = sha256('surp' + document.querySelector('#enteredkey').value);
		saveOptions();
		document.querySelector('.key').style.display = 'none';
		document.querySelector('.main').style.display = 'block';
	});

	document.querySelector('#generate').addEventListener('click', function() {
		var pass = hashPassword(document.querySelector('#genpass').value, 16, key, url);
		document.querySelector('#generated').value = pass;
	});
	
});

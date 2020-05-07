import getDomainName from './getDomainName.js';

import whitelist from './longPasswordWhitelist.js';

import PasswordBox from './PasswordBox.js';

function getPasswordLength(domain) {
	if (whitelist.indexOf(domain) > -1) return 32;
	else return 16;
}

function fillEmailBoxes(domain, accountDomain) {
	document.querySelectorAll('input[type=text]').forEach(input => {

		if (input.value != '') return;

		if (input.name.toLowerCase().indexOf('email') > -1) {
			input.value = domain + '@' + accountDomain;
		}
	});
}


function run(options) {
	const domain = getDomainName(window.location.href);

	var passwordLength = getPasswordLength(domain);

	if (options.accountName) {
		fillEmailBoxes(domain, options.accountDomain);
	}

	document.querySelectorAll('input[type="password"]').forEach(input => {
		var inputBox = new PasswordBox(input, passwordLength, options, domain);
	});

}

export default function() {
	browser.storage.sync.get(['key', 'accountName', 'accountDomain']).then(options => run(options));
};
import getUsernameBox from './getUsernameBox.js';
import hashPassword from './hash.js';

export default class {
	
	constructor(input, passwordLength, options, domain) {
		this.input = input;
		this.enabled = true;
		this.passwordLength = passwordLength;
		this.options = options;

		this.setStyle();
		this.registerEvents();
	}

	setStyle() {
		this.input.style.backgroundImage = 'url(' + browser.extension.getURL('icon-19.png') + ')';
		this.input.style.backgroundPosition = 'center right';
		this.input.style.backgroundRepeat = 'no-repeat';
	}


	registerEvents() {
		//Generate pass on `blur`
		//This is better than `submit` because it triggers password strengh checks
		this.input.addEventListener('blur', () => {
			if (this.enabled) this.generatePass();
		});

		this.input.addEventListener('keydown', event => {
			if (this.enabled) {
				if (event.keyCode == 13) {
					this.generatePass();
				}
			}
		});

		this.input.addEventListener('click', event => {
			//event.offsetX is set to 0 here in FF for some reason
			//calculate it
			var offsetX = event.pageX - this.input.offsetLeft;

			var width = this.input.offsetWidth;

			if (offsetX > width-22) {
				if (this.enabled) {
					this.enabled = false;
					this.input.style.backgroundImage = 'url(' + browser.extension.getURL('icon-disabled.png') + ')';
				}
				else {
					this.enabled = true;
					this.input.style.backgroundImage = 'url(' + browser.extension.getURL('icon-19.png') + ')';
				}
				
				return false;
			}

		});
	}


	generatePass() {
		if (this.input.value != '') {

			var userNameBox = getUsernameBox(this.input);

			var accountName;

			if (!userNameBox) {
				accountName = window.prompt('Surpass was unable to accurately work out your account name for this password (this often happens in change password dialogs where you\'re already logged in or signup forms).' + "\n\n" + 
								'Please enter your email/username for this acccount.' + "\n\n\n" +
								'(Sorry, this ugly prompt is the only way to guarantee the form is not submitted before the password is generated)' + "\n\n"
								);
			}
			else {
				accountName = userNameBox.value;
			}

			this.input.value = hashPassword(this.input.value, this.passwordLength, this.options.key, accountName + this.domain);	
		}
	}

}
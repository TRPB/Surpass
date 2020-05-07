import sha256 from './sha256.js';

export default function(password, length, key1, key2, noSymbols) {
	var allowedChars = [];

	for (var i = 48; i < 58; i++) {
		allowedChars.push(String.fromCharCode(i));
	}

	for (var i = 65; i < 91; i++) {
		allowedChars.push(String.fromCharCode(i));
	}

	for (var i = 97; i < 123; i++) {
		allowedChars.push(String.fromCharCode(i));
	}

	var symbols = ['=', '%', '#', ';', '@', '$', '!', '.', '_', '-'];

	if (!noSymbols) {
		for (var i in symbols) allowedChars.push(symbols[i]);
	}


	var val = sha256(key1 + password + key2);

	var chars = val.match(/.{2}/g);

	var str = '';
	for (var i = 0; i < length; i++) {
		var num = parseInt(chars[i], 16);
		str += allowedChars[num % allowedChars.length];
	}

	if (!noSymbols) {
		//If it doesn't contain symbols, hash the hash again to include them
		//This actually lowers the possible number of combinations significantly
		//But some password checks require a symbol.
		var hasSymbol = false;
		for (var i in symbols) {
			if (str.indexOf(symbols[i]) > -1) {
				hasSymbol = true;
				break;
			}
		}

		if (!hasSymbol) str = hashPassword(str, length, key1, key2, noSymbols);
	}
	return str;
}




/*
	https://bugzilla.mozilla.org/show_bug.cgi?id=1536094
	Firefox does not support modules in content scripts

	This is a really hacky workaround. It only supports very basic 
	module functionality.

	1. It only suppoorts export default
	2. It only supports basic imports in the format import x from 'y.js';
	   No other import format is supported.
*/

function ffimport(url) {
	url =  browser.extension.getURL(url)
	return new Promise(resolve => {
		var xhr = new XMLHttpRequest();

		xhr.addEventListener('load', () => {
			var js = xhr.responseText;
			var __exportFFHack;
			js = js.replace('export default', 'return ');


			js = js.replace(/import (.+?) from ([^;]+)\;/g, 'var $1 = await ffimport($2);');

			(async () => {
				 eval('__exportFFHack = (async () => { ' + js + '})();');
				 resolve(__exportFFHack);		
			})();
		});

		xhr.open('GET', url);
		xhr.send();
	});
}



(async () => {
	const src = browser.extension.getURL('contentMain.js');

	// (sort of) support FF and Chrome
	if (navigator.appCodeName && navigator.appCodeName == 'Mozilla') {
		var contentMain = await ffimport(src);	
	}
	else {
		var contentMain = await ffimport(src);
	}	

	contentMain();
})();


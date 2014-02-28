var sender;


function saveSettings() {
	
}

$().ready(function() {
	
	var domain = window.location.hostname;
	
	domain = domain.replace('www.', '');
	

	
	var passwordLength = 12;
	
	var userKey;
	
	chrome.extension.sendMessage({message: "getKey", "domain": domain}, function(response) {
		userKey = response;
	});

	
	
	//alert(domain);
	
	
	var cleanup = [];
	
	$('input[type="password"]').each(function() {


		var offset = $(this).position();
		var pos2 = $(this).parent().position();
		
		var mLeft = offset.left - pos2.left;
	//	chrome.pageAction.show(null);
		$(this).css('display', 'none');
		
		
		var tab = '';
		
		var replacement = document.createElement('input');
		replacement.type = 'password';
		
		replacement.className = this.className;

		
		
		var pass = this;
		
		var label = document.createElement('div');
		
		//alert(chrome.extension.getURL('popdown.html'));


		
		//$(label).append('SurPass');
		$(label).css('padding', '2px');
		$(label).css('color', '#fff');
		$(label).css('font-size', '10px');
		$(label).css('font-family', 'sans-serif');
	//	$(label).css('background-color', '#fff7bf')
		//$(label).css('background-color', 'rgba(0,0,0,0.60)');
		//$(label).css('border', '2px solid rgba(128,128,128,0.50)');
		$(label).css('position', 'absolute');
		$(label).addClass('surpass');
		$(label).css('z-index', '1999');
		//$(label).css('box-shadow', '2px 2px 4px #666');
		//$(label).css('border-radius', '0px 0px 4px 4px');
		//$(label).css('cursor', 'default');
		//$(label).css('font-family', 'verdana, helvetica, sans-serif');
		$(label).click(expandOptions);
	
		$(label).css('margin-left', mLeft);
	//	$(label).css('-webkit-transform', 'rotate(-90deg)')
		
		$(label).insertBefore(this);
		
		var clickOut = function() {
			$(label).find('.form').slideUp();
		};
		
		chrome.extension.sendMessage({message: "showIcon", "domain": domain}, function(response) {
			
			$(label).html(response.html);
			//$(label).append(response.html);
			var settings = response.options;
			
			var page = window.location.href;
			
			if (settings.disabledFor[page + ':' + pass.name]) {
				$(pass).css('display', '');
				$(replacement).css('display', 'none');
				
				disabled = true;
			}
			else {
				$(label).find('input[name="enabled"]').prop('checked', 'true');
				
				disabled = false;
			}
			
			$(label).find('input:radio[value="' + settings.securityLevel + '"]').prop('checked', 'true');
						
			$(label).find('.sitename').append(window.location.hostname);
			
			$(label).mouseup(function() {
				return false;
			});
			
			
			$(replacement).blur(function() {
				if (settings.securityLevel == 1 )	var str = hashPassword(this.value, 16, userKey, domain);
				else if (settings.securityLevel == 2) var str = hashPassword(this.value, 16, userKey, domain, true);
				else if (settings.securityLevel == 3) var str = hashPassword(this.value, 12, userKey, domain, true);
				pass.value = str;
				console.log(str);
			});
			
			
			
			$(label).find('input[name="savesurpasssettings"]').click(function() {
					var message = {message: 'saveSettings'};
				message.domain = domain;
				message.boxId = window.location.href + ':' + pass.name;
				message.securityLevel = $(label).find('input[name="level"]:checked').val();

				settings.securityLevel = message.securityLevel;
				
				if ($(label).find('input[name="enabled"]:checked').length == 0) {
					$(pass).css('display', '');
					$(replacement).css('display', 'none');
					message.enabled = false;
				}
				else {
					$(pass).css('display', 'none');
					$(replacement).css('display', '');
					message.enabled = true;
				}
				
				$(replacement).blur();
				
				chrome.extension.sendMessage(message, function(response) {
					//alert(1);
					//console.log(111);
				});
				
				
							
				
				$(label).find('.form').slideToggle();
			});
			
			$(document.body).mouseup(clickOut);
			
			if (userKey == null) {
				$(label).find('.label').css('border-color', 'red');
			}
			
			$(label).find('.label').click(function() {
				//alert($(label).length);
				if (userKey == null) {
					$(label).find('.nokeyset').css('display', 'block');
					
					$(label).find('.nokeyset a').attr('href', chrome.extension.getURL("options.html"));
				}
				else $(label).find('.nokeyset').css('display', 'none');
				
				
				
				
				$(label).find('.form').slideToggle();
				//$('.surpass .form').css('display', 'block');

			});
		});
		
		$(replacement).insertBefore(this);
		
		$(label).css('margin-top', $(replacement).outerHeight());
		//$(label).css('width', $(replacement).outerHeight());
	//	$(label).css('margin-left', 0);
		
		
		cleanup.push(replacement);
		cleanup.push(label);
	});
	
	
	$('form').submit(function() {
		
		$('input[type="password"]').each(function() {
			$(this).css('display', '');
		});
			
		for (var replace in cleanup) {
			$(cleanup[replace]).remove();
		}		
		
	});
	
	
	
	
});


function hashPassword(password, length, key1, key2, noSymbols) {
	
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
	
	
	var val = $.sha256(key1 + password + key2);
	var chars = val.match(/.{2}/g);
	
//	console.log(chars);
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

function expandOptions() {
	
	
}
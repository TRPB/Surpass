var pophtml;


$.ajax({url:"popdown.html", success:function(result){
	pophtml = result;
 }});


    chrome.extension.onMessage.addListener(    		
        function(request, sender, sendResponse) {
        	//sendResponse('test');
        	//console.log('test');
        	
        	//localStorage.removeItem(request.domain);
        	console.log(localStorage);
        	
        	
        	
        	if (request.message == 'showIcon') {
        		request.domain = $.sha256(request.domain);
        		if (!localStorage[request.domain]) {	     		
	        		var settings = {
	        				enabled: true,
	        				'securityLevel': 1,
	        				'disabledFor': {}
	        		};
	        		localStorage[request.domain] = JSON.stringify(settings); 

        		}
        		else settings = JSON.parse(localStorage[request.domain]);
        		
        		chrome.pageAction.show(sender.tab.id);
        		
        		sendResponse({html: pophtml, options: settings }  );

        	}
        	else if (request.message == 'saveSettings') {
        		
          		var domain = $.sha256(request.domain);

          		var settings = JSON.parse(localStorage[domain]);

        		//console.log(settings);
        		settings.securityLevel = request.securityLevel;
        		
        		var boxId = $.sha256(request.boxId);
        		
        		if (request.enabled) delete settings.disabledFor[boxId];
        		else settings.disabledFor[boxId] = true;
        		//settings.disabledFor[request.boxId] = !request.enabled;
        		
        		localStorage[domain] = JSON.stringify(settings);
        		
        	}
        	else if (request.message == 'getKey') {
        		sendResponse(localStorage.getItem('key'));       		
        	}
        	
   
        	
        }
    );





function saveKey() {
	alert('key saved');
	localStorage.setItem('key', $.sha256('surp' + $('#enteredkey').val()));
	$('.key').slideUp();
	$('.main').slideDown();
}


$().ready(function() {
	//localStorage['key'] = '';
	//alert(localStorage['key']);

	//localStorage['key'] = '';
	var key = localStorage.getItem('key');
	//alert(key);
	if (!key) {
		$('.key').css('display', 'block');
		$('.main').css('display', 'none');
	}
	else {
	
		$('.key').css('display', 'none');
		$('.main').css('display', 'block');
	}
		
	
	$('#savebutton').click(function() {
		saveKey();
	});

});
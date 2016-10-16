

$(document).ready(function() {
	var $body = $('body');
	var $wrapperTemplate = $('#testTable');

	var bigTableDataObject = {};
	console.log('creating data start')
	for (var i = 0; i < 9999; i++) {
		bigTableDataObject[i] = {
			"fname": "Bob",
			"lname": "Dolle",
			"age": i
		}
	}
	console.log('creating data done')


	var tableTemplate1 = new $Table({template: $wrapperTemplate, consumeTemplate: false})
		.appendTo($body)
		.build(bigTableDataObject);
});
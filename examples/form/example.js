function submitRequest(data){
	return $.post('backend.html', data)
}

var form;
var feedbackForm;
var singleValueForm;
$(document).on('ready', function(){
	feedbackForm = new Form({
		validator : Form.validators.formValidation,
		template : $('#feedbackForm'),
		submitRequest : submitRequest
	});
	singleValueForm = new Form({
		validator : Form.validators.formValidation,
		template : $('#singleValueForm'),
		serializeMode : FormSerializer.serializeMode.toValue,
		submitRequest : submitRequest
	})
	.on('done', function(){
		console.log(singleValueForm._serializedData);
	});
});
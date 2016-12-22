function submitRequest(data){
	return $.post('backend.html', data)
}

var form;
var feedbackForm;
var singleValueForm;
var populateForm;
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
	populateForm = new Form({
		validator : Form.validators.formValidation,
		template : $('#populateForm'),
		submitRequest : submitRequest
	})
	.populateForm({
		name : "Jimmy Three Shoes",
		age : 33,
		vegetarian : 1,
		height : 2,
		gender : 0
	})
});
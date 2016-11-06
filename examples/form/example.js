function submitRequest(data){
	return $.post('backend.html', data)
}

var form;
$(document).on('ready', function(){



	form = new Form({
		validator : Form.validators.formValidation,
		template : $('#feedbackForm'),
		submitRequest : submitRequest
	});
});
function submitRequest(data){
	return $.post('backend.html', data)
}

function backendCall(){
	var dfd = $.Deferred();
	
	setTimeout(function(){
		dfd.resolve({
			name : "Jimmy Three Shoes",
			age : 33,
			vegetarian : 1,
			height : 2,
			gender : 0
		});
	},2000);
	
	return dfd.promise();
}

var basicForm;
var feedbackForm;
var singleValueForm;
var populateForm;
var buildForm;
$(document).on('ready', function(){
	basicForm = new Form({
		validator : Form.validators.formValidation,
		serializeMode : FormSerializer.serializeMode.toObject,
		template : $('#basicForm'),
		excluded : [':hidden'],
		submitRequest : submitRequest
	})
		.on('beforeSubmit', function(e, form){
			console.log(form._serializedData);
		});
	feedbackForm = new Form({
		validator : Form.validators.formValidation,
		serializeMode : FormSerializer.serializeMode.toObject,
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
		getRequest : backendCall,
		validator : Form.validators.formValidation,
		template : $('#populateForm'),
		submitRequest : submitRequest
	})
	populateForm.initializeWithGet();

	buildForm = new Form({
		validator : Form.validators.formValidation,
		template : $('#buildForm'),
		submitRequest : submitRequest
	})
	.build({
		0 : {
			label : 'TEST',
			input : {
				tag : 'input',
				name: 'asd',
				type: 'text'
			}
		}
	})
});
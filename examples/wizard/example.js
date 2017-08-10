var wizard;

function backendCall(){
	var dfd = $.Deferred();
	
	setTimeout(function(){
		dfd.resolve({
			age : 44,
			name : 'bob',
			gender : 2
		});
	},2000);
	
	return dfd.promise();
}


$(document).on('ready', function(){
	var $testWizard = $('#testWizard');
	wizard = new BootstrapWizard({
		getRequest : backendCall,
		validator : Wizard.validators.formValidation,
		template : $testWizard,
		useTemplate : true
	});
	wizard.initializeWithGet();

	$('.nav.nav-tabs').responsiveTabs();
});

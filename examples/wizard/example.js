var wizard;
$(document).on('ready', function(){
	var $testWizard = $('#testWizard');
	wizard = new BootstrapWizard({
		validator : Wizard.validators.formValidation,
		template : $testWizard,
		useTemplate : true
	});
	$testWizard.find('[name="gender"]').val('1');

	$('.nav.nav-tabs').responsiveTabs();
});

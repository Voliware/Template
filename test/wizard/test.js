"use strict";

var expect = chai.expect;


describe("Wizard", function() {
	describe("constructor", function () {
		//defaults
		it("should set a default struct wrapper setting", function () {
			var w = new Wizard();
			expect(w.settings.struct.$wrapper).to.equal('.wizard');
		});

		// options
		it("should set the struct header setting if provided", function(){
			var w = new Wizard({struct : {$header : 'header'}});
			expect(w.settings.struct.$header).to.equal('header');
		});
		it("should set the struct body setting if provided", function(){
			var w = new Wizard({struct : {$body : 'body'}});
			expect(w.settings.struct.$body).to.equal('body');
		});
		it("should set the struct footer setting if provided", function(){
			var w = new Wizard({struct : {$footer : 'footer'}});
			expect(w.settings.struct.$footer).to.equal('footer');
		});
		it("should set the struct footer setting if provided", function(){
			var w = new Wizard({struct : {$cancel : 'cancel'}});
			expect(w.settings.struct.$cancel).to.equal('cancel');
		});
		it("should set the struct submit setting if provided", function(){
			var w = new Wizard({struct : {$submit : 'submit'}});
			expect(w.settings.struct.$submit).to.equal('submit');
		});
	});

	describe("serialize", function() {
		it("should serialize a wizard", function() {
			var $testWizard = $('#testWizard');
			var w = new Wizard({
				validator : Wizard.validators.formValidation,
				template : $testWizard,
				useTemplate : true
			});
			$testWizard.find('[name="name"]').val('bob');
			$testWizard.find('[name="age"]').val('55');
			$testWizard.find('[name="gender"]').val('1');
			w.serializer();
			expect(w._serializedData).to.equal('name=bob&age=55&gender=1');
		});
	});
});
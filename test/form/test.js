"use strict";

var expect = chai.expect;

$(document).on('ready', function(){
	/*var $body = $('body');
	var $testForm = $('#testForm');
	var form = new Form({
		validator : Form.validators.formValidation,
		template : $testForm
	}).appendTo($body);*/

	var form = new Form({
		validator : Form.validators.formValidation,
		template : $('#feedbackForm'),
		useTemplate : true,
		feedback : true
	});

});


describe("Form", function() {
	describe("constructor", function () {
		it("should set a default submitUrl setting", function () {
			var f = new Form();
			expect(f.settings.submitUrl).to.equal("");
		});
		it("should set a default struct wrapper setting", function () {
			var f = new Form();
			expect(f.settings.struct.$wrapper).to.equal('form');
		});
		it("should set a default struct header setting", function () {
			var f = new Form();
			expect(f.settings.struct.$header).to.equal('.form-header');
		});
		it("should set a default struct body setting", function () {
			var f = new Form();
			expect(f.settings.struct.$body).to.equal('.form-body');
		});
		it("should set a default struct footer setting", function () {
			var f = new Form();
			expect(f.settings.struct.$footer).to.equal('.form-footer');
		});
		it("should set a default struct cancel setting", function () {
			var f = new Form();
			expect(f.settings.struct.$cancel).to.equal('.form-cancel');
		});
		it("should set a default struct submit setting", function () {
			var f = new Form();
			expect(f.settings.struct.$submit).to.equal('button[type="submit"]');
		});
		it("should set the submitUrl setting if provided", function(){
			var f = new Form({submitUrl : 'submitUrl'});
			expect(f.settings.submitUrl).to.equal('submitUrl');
		});
		it("should set the template setting if provided", function(){
			var f = new Form({template : 'myTemplate'});
			expect(f.settings.template).to.equal('myTemplate');
		});
		it("should set the consumeTemplate setting if provided", function(){
			var f = new Form({consumeTemplate : false});
			expect(f.settings.consumeTemplate).to.equal(false);
		});
		it("should set the struct wrapper setting if provided", function(){
			var f = new Form({struct : {wrapper : 'myForm'}});
			expect(f.settings.struct.wrapper).to.equal('myForm');
		});
		it("should set the struct header setting if provided", function(){
			var f = new Form({struct : {header : 'header'}});
			expect(f.settings.struct.header).to.equal('header');
		});
		it("should set the struct body setting if provided", function(){
			var f = new Form({struct : {body : 'body'}});
			expect(f.settings.struct.body).to.equal('body');
		});
		it("should set the struct footer setting if provided", function(){
			var f = new Form({struct : {footer : 'footer'}});
			expect(f.settings.struct.footer).to.equal('footer');
		});
		it("should set the struct footer setting if provided", function(){
			var f = new Form({struct : {cancel : 'cancel'}});
			expect(f.settings.struct.cancel).to.equal('cancel');
		});
		it("should set the struct submit setting if provided", function(){
			var f = new Form({struct : {submit : 'submit'}});
			expect(f.settings.struct.submit).to.equal('submit');
		});
	});

	describe("serialize", function() {
		it("should serialize a form", function() {
			var $testForm = $('#testForm');
			var f = new Form({
				validator : Form.validators.formValidation,
				template : $testForm,
				useTemplate : true
			});
			$testForm.find('[name="name"]').val('bob');
			$testForm.find('[name="age"]').val('55');
			f.serializer();
			expect(f._serializedData.toOrderedString()).to.equal('name=bob&age=55');
		});
	});

});


describe("FormSerializer", function() {
});
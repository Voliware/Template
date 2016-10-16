/*!
 * form
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates, serializes, and submits forms
 * @extends Template
 */
class Form extends Template {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {boolean} [options.feedback=true] - whether to show feedback during submissions
	 * @param {string} [options.submitUrl] - the submitUrl or path to submit the form to
	 * @param {object} [options.validator] - validator setttings
	 * @param {string} [options.validator.api] - the validator api to use
	 * @param {object} [options.validator.options] - the validator options
	 * @param {object} [options.struct] - the template struct to build the form from, if using a template
	 * @param {string} [options.struct.$wrapper='form'] - the form element
	 * @param {string} [options.struct.$header='.form-header'] - the header selector
	 * @param {string} [options.struct.$body='.form-body'] - the body selector
	 * @param {string} [options.struct.$footer='.form-footer'] - the footer selector
	 * @param {string} [options.struct.$cancel='.form-cancel'] - the cancel button selector
	 * @param {string} [options.struct.$submit='button[type="submit"]'] - the submit button selector
	 * @returns {Form}
	 */
	constructor(options){
		var defaults = {
			feedback: true,
			submitUrl: "",
			// jquery elements for each table components
			struct: {
				$wrapper: 'form',
				$header: '.form-header',
				$body: '.form-body',
				$footer: '.form-footer',
				$cancel: '.form-cancel',
				$submit: 'button[type="submit"]'
			},
			validator: null
		};
		super($Util.opts(defaults, options));
		var self = this;

		// store serialized data
		this._serializedData = {};

		// alias
		// this alias just happens to be integral
		// to Wizard, which inherits Form, but
		// overrides $wrapper and thus loses a <form> ref
		this.$form = this.$wrapper;

		// components
		this.formSerializer = new FormSerializer();
		this.validator = null;
		this.feedback = null;

		// default submit handler
		this.$wrapper.on('submit', function(e){
			e.preventDefault();
			self.serializer()
				._submit();
		});

		// set up validator
		if(this.settings.validator)
			this._validatorFactory();

		// set up feedback
		if(this.settings.feedback)
			this._setupFeedback();

		return this;
	}

	/**
	 * Default form template
	 * @returns {Form}
	 * @private
	 */
	_useDefaultTemplate(){
		var template =
			'<form class="form">' +
				'<div class="form-header"></div>' +
				'<div class="form-body"></div>' +
				'<div class="form-footer">' +
					'<button type="submit" class="form-submit">Submit</button>' +
					'<button type="button" class="form-cancel">Cancel</button>' +
				'</div>' +
			'</form>';

		this.settings.template = $(template);
		this.settings.useTemplate = true;
		this._useTemplate();

		return this;
	}

	/**
	 * Attaches a validator to the form
	 * @returns {Form}
	 * @private
	 */
	_validatorFactory(){
		var v = this.settings.validator;

		switch(v.api){
			case 'formValidation':
				Form.validators.formValidation.setup(this, v.options);
				break;
		}
		return this;
	}

	/**
	 * Setup the feedback
	 * @returns {Form}
	 * @private
	 */
	_setupFeedback(){
		this.feedback = new Feedback();
		this.feedback.$wrapper.prependTo(this.$body);
		return this;
	}

	/**
	 * Submits the form
	 * @returns {jQuery}
	 * @private
	 */
	_submit(){
		var self = this;
		var f = this.feedback;

		this.serializer();

		this.trigger('beforeSubmit');
		if(f) f.setFeedback('processing', 'Processing...');

		return this._doSubmit()
			.done(function(){
				self._onSuccess();
			})
			.fail(function(){
				self._onSuccess();
			})
			.always(function(){
				self._onAlways();
			});
	}

	/**
	 * Actual submit function
	 * @returns {jQuery}
	 * @private
	 */
	_doSubmit(){
		return $.post(this.submitUrl, this._serializedData)
	}

	/**
	 * Form submission success handler
	 * @returns {Form}
	 * @private
	 */
	_onSuccess(){
		var f = this.feedback;
		this.trigger('submitSuccess');
		if(f) f.setFeedback('success', ' Operation was successful');
		return this;
	}

	/**
	 * Form submission fail handler
	 * @returns {Form}
	 * @private
	 */
	_onFail(){
		var f = this.feedback;
		this.trigger('submitFail');
		if(f) f.setFeedback('danger', 'Operation has failed');
		return this;
	}

	/**
	 * Form submission always handler
	 * @returns {Form}
	 * @private
	 */
	_onAlways(){
		this.trigger('submitComplete');
		return this;
	}

	/**
	 * Populate form fields
	 * @param {object} data - collection of properties whos
	 * key match an input or select name, and
	 * whos value is appropriate for that field
	 * @returns {Form}
	 */
	populate(data){
		this.$body.populateChildren(data);
		return this;
	}

	/**
	 * Serialize the form
	 * @returns {Form}
	 */
	serializer(){
		this._serializedData = this.formSerializer.serialize(this.$wrapper);
		return this;
	}
}

Form.validators = {

	/**
	 * formValidation api
	 */
	formValidation : {
		api : 'formValidation',
		options : {
			framework: 'bootstrap',
			excluded: [':disabled', ':hidden', ':not(:visible)'],
			icon: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			}
		},
		
		/**
		 * formValidation setup
		 * @param {Form} form
		 * @param {object} options
		 */
		setup : function(form, options){
			form.$wrapper.off('submit');
			form.$wrapper.formValidation(options)
				.on('success.form.fv', function(e) {
					e.preventDefault();
					form.serializer()
						._submit();
				});
			form.validator = form.$wrapper.data('formValidation');
		}
	}
};
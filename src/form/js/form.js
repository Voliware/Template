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
	 * @param {function} [options.submitRequest=null] - if set, ignores submitUrl and uses this function to submit data
	 * @param {number} [options.serializeMode=0] - the mode in which to serialize data
	 * @param {number} [options.checkboxMode=0] - the mode in which to serialize checkboxes
	 * @param {object} [options.validator] - validator setttings
	 * @param {string} [options.validator.api] - the validator api to use
	 * @param {object} [options.validator.options] - the validator options
	 * @param {object} [options.struct] - the template struct to build the form from, if using a template
	 * @param {string} [options.struct.$wrapper='form'] - the form element
	 * @param {string} [options.struct.$header='.form-header'] - the header selector
	 * @param {string} [options.struct.$body='.form-body'] - the body selector
	 * @param {string} [options.struct.$footer='.form-footer'] - the footer selector
	 * @param {string} [options.struct.$cancel='.form-cancel'] - the cancel button selector
	 * @param {string} [options.struct.$reset='.form-reset'] - the reset button selector
	 * @param {string} [options.struct.$submit='button[type="submit"]'] - the submit button selector
	 * @returns {Form}
	 */
	constructor(options){
		var defaults = {
			feedback: true,
			useTemplate : true,
			submitUrl: "",
			submitRequest : null,
			serializeMode : FormSerializer.serializeMode.toString,
			checkboxMode : FormSerializer.checkboxMode.number,
			// jquery elements for each table components
			struct: {
				$wrapper: 'form',
				$header: '.form-header',
				$body: '.form-body',
				$footer: '.form-footer',
				$cancel: '.form-cancel',
				$reset: '.form-reset',
				$submit: 'button[type="submit"]'
			},
			validator: null
		};
		super($Util.opts(defaults, options));
		var self = this;

		// store serialized data
		this._serializedData = {};
		// cache populated data for reset button
		this._populatedData = {};

		// alias
		// this alias just happens to be integral
		// to Wizard, which inherits Form, but
		// overrides $wrapper and thus loses a <form> ref
		this.$form = this.$wrapper;

		// components
		this.formSerializer = new FormSerializer({
			serializeMode : this.settings.serializeMode,
			checkboxMode : this.settings.checkboxMode
		});
		this.validator = null;
		this.feedback = null;

		// handlers
		// default submit handler
		this.$wrapper.on('submit', function(e){
			e.preventDefault();
			self.serializer()
				._submit();
		});

		// reset
		this.$reset.click(function(){
			self._reset();
		});

		// set up validator
		if(this.settings.validator)
			this._setupValidator();

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
					'<button type="button" class="form-reset">Reset</button>' +
					'<button type="button" class="form-cancel">Cancel</button>' +
				'</div>' +
			'</form>';
		
		this._useTemplate($(template));

		return this;
	}

	/**
	 * Attaches a validator to the form
	 * @returns {Form}
	 * @private
	 */
	_setupValidator(){
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
	 * Reset the form, using populated data
	 * or setting to default values
	 * @returns {Form}
	 * @private
	 */
	_reset(){
		if(!$.isEmptyObject(this._populatedData))
			this.populateForm(this._populatedData);
		else
			this.$wrapper[0].reset();

		// todo: implement reset for alternative validators
		if(this.validator){
			this.validator.resetForm();
		}

		return this;
	}

	/**
	 * Submits the form
	 * @returns {jQuery}
	 * @private
	 */
	_submit(){
		var self = this;

		this.trigger('beforeSubmit');
		
		if(this.feedback)
			this.feedback.setFeedback('processing', 'Processing...');

		return this._doSubmit()
			.done(function(data){
				self._onDone(data);
			})
			.fail(function(){
				self._onFail();
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
		var s = this.settings;

		if(s.submitRequest)
			return s.submitRequest(this._serializedData);
		else
			return $.post(s.submitUrl, this._serializedData);
	}

	/**
	 * Form submission success handler
	 * @param {object} data
	 * @returns {Form}
	 * @private
	 */
	_onDone(data){
		this.trigger('done', data);
		if(this.feedback)
			this.feedback.setFeedback('success', ' Operation was successful');
		return this;
	}

	/**
	 * Form submission fail handler
	 * @returns {Form}
	 * @private
	 */
	_onFail(){
		this.trigger('fail');
		if(this.feedback)
			this.feedback.setFeedback('danger', 'Operation has failed');
		return this;
	}

	/**
	 * Form submission always handler
	 * @returns {Form}
	 * @private
	 */
	_onAlways(){
		this.trigger('always');
		return this;
	}

	/**
	 * Cache incoming form data
	 * @param {object} data
	 * @returns {Form}
	 * @private
	 */
	_cacheFormData(data){
		this._populatedData = $.extend(true, {}, data);
		return this;
	}

	/**
	 * Process incoming form data
	 * @param {object} data
	 * @returns {*}
	 * @private
	 */
	_processFormData(data){
		return data;
	}

	/**
	 * Populate form fields
	 * @param {object} data - collection of properties whos
	 * key match an input or select name, and
	 * whos value is appropriate for that field
	 * @returns {Form}
	 */
	populateForm(data){
		this._cacheFormData(data);
		this._processFormData(data);
		this.$wrapper.populateChildren(data);
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
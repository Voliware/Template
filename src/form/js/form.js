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
		this._cachedData = {};

		// alias
		// this exists solely for Wizard !!
		var $form = this.$wrapper.find('form');
		this.$form = $form.length > 0
			? $form
			: this.$wrapper;

		// components
		this.formSerializer = new FormSerializer({
			serializeMode : this.settings.serializeMode,
			checkboxMode : this.settings.checkboxMode
		});
		this.validator = null;
		this.feedback = null;

		// handlers
		// default submit handler
		this.$form.on('submit', function(e){
			e.preventDefault();
			self.serializeForm()
				._submit();
		});

		// cancel
		this.$cancel.click(function(){
			self.resetForm();
		});

		// reset
		this.$reset.click(function(){
			self.resetForm();
		});

		// set up validator
		if(this.settings.validator)
			this._setupValidator();

		// set up feedback
		if(this.settings.feedback)
			this._setupFeedback();

		return this;
	}

	// setup

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
				Form.validators.formValidation.setup(this, this.$form, v.options);
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
		this.feedback.prependTo(this.$form);
		return this;
	}

	/**
	 * Prepare the form with a loading message
	 * @returns {Form}
	 * @private
	 */
	_prepare(){
		this.toggleForm(false);
		this.feedback.show();
		this.feedback.setFeedback('processing', 'Getting data...');
		return this;
	}

	// ready

	/**
	 * Set the form to ready by hiding
	 * feedback and showing the form components
	 * @returns {Form}
	 * @private
	 */
	_ready(){
		this.feedback.slideUp();
		this.slideToggleForm(true);
		return this;
	}

	// submit

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
				self._done(data);
			})
			.fail(function(err){
				self._fail(err);
			})
			.always(function(){
				self._always();
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

	// submit handlers

	/**
	 * Form submission success handler
	 * @param {object} data
	 * @returns {Form}
	 * @private
	 */
	_done(data){
		this.trigger('done', data);
		if(this.feedback)
			this.feedback.setFeedback('success', ' Operation was successful');
		return this;
	}

	/**
	 * Form submission fail handler
	 * @param {object} err
	 * @returns {Form}
	 * @private
	 */
	_fail(err){
		this.trigger('fail', err);
		if(this.feedback)
			this.feedback.setFeedback('danger', 'Operation has failed');
		return this;
	}

	/**
	 * Form submission always handler
	 * @returns {Form}
	 * @private
	 */
	_always(){
		this.trigger('always');
		this.toggleButtons(true);
		return this;
	}

	// data

	/**
	 * Get form data from the backend
	 * @returns {jQuery}
	 * @private
	 */
	_getFormData(){
		return $.Deferred().resolve().promise();
	}

	/**
	 * Cache incoming form data
	 * @param {object} data
	 * @returns {Form}
	 * @private
	 */
	_cacheFormData(data){
		this._cachedData = $.extend(true, {}, data);
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

	// public

	/**
	 * Toggle the button states
	 * @param {boolean} state
	 * @returns {Form}
	 */
	toggleButtons(state){
		this.$cancel.prop('disabled', !state);
		this.$reset.prop('disabled', !state);
		this.$submit.prop('disabled', !state).toggleClass('disabled', !state);
		return this;
	}

	/**
	 * Toggle the form body
	 * @param {boolean} state
	 * @returns {Form}
	 */
	toggleForm(state){
		this.$body.toggle(state);
		this.$footer.toggle(state);
		return this;
	}

	/**
	 * Slide toggle the form body
	 * @param {boolean} state
	 * @returns {Form}
	 */
	slideToggleForm(state){
		this.$body.slideToggleState(state);
		this.$footer.slideToggleState(state);
		return this;
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
		this.$form.populateChildren(data);
		return this;
	}

	/**
	 * Public function to serialize the form,
	 * as jQuery uses serialize already
	 * @returns {Form}
	 */
	serializeForm(){
		this._serializedData = this.formSerializer.serialize(this.$form);
		return this;
	}

	/**
	 * Reset the form, using populated data
	 * or setting to default values
	 * @returns {Form}
	 */
	resetForm(){
		if(!$.isEmptyObject(this._cachedData))
			this.populateForm(this._cachedData);
		else
			this.$form[0].reset();

		if(this.feedback)
			this.feedback.slideUp();

		// todo: implement for alternative validators
		if(this.validator){
			switch(this.settings.validator.api) {
				case 'formValidation':
					this.validator.resetForm();
					break;
			}
		}

		return this;
	}

	/**
	 * Validate the form
	 * @returns {boolean}
	 */
	validate(){
		var isValid = false;
		if(this.validator){
			// todo: implement for alternative validators
			switch(this.settings.validator.api){
				case 'formValidation':
					this.validator.resetForm();
					this.validator.validateContainer(this.$form);
					isValid = this.validator.isValidContainer(this.$form);
					break;
			}
		}
		return isValid;
	}

	// initializers

	/**
	 * Remove all data from the form and reset it
	 * @returns {Form}
	 */
	clean(){
		this._cachedData = {};
		this.resetForm();
		this.toggleForm(true);
		return this;
	}

	/**
	 * Initialize as a clean form with
	 * default values from the DOM
	 * @returns {Form}
	 */
	initialize(){
		this.clean();
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
		 * @param {jQuery} $form
		 * @param {object} options
		 */
		setup : function(form, $form, options){
			$form.off('submit');
			$form.formValidation(options)
				.on('success.form.fv', function(e) {
					e.preventDefault();
					form.toggleButtons(false);
					form.serializeForm()
						._submit();
				});
			form.validator = $form.data('formValidation');
		}
	}
};
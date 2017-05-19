/*!
 * bootstrapModal
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Combines a form and a bootstrap modal
 * @extends BootstrapModal
 */
class BootstrapModalForm extends BootstrapModal {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {BootstrapModalForm}
	 */
	constructor(options){
		super(options);

		// properties
		this.form = null;

		return this;
	}

	/**
	 * Create and initialize the form
	 * @private
	 */
	_createForm(){
		throw new Error("BootstrapModalForm._createForm: must be implemented in child class");
	}

	/**
	 * Attach handlers to the form
	 * @returns {BootstrapModalForm}
	 * @private
	 */
	_attachFormHandlers(){
		var self = this;
		this.form
			.on('beforeSubmit', function(){
				self.form.slideToggleForm(false);
			})
			.on('done', function(){
				setTimeout(function(){
					self.modal('hide');
				}, 1500)
			})
			.on('fail', function(){
				self.form.slideToggleForm(true);
				self.form.toggleButtons(true);
			});
		return this;
	}

	/**
	 * A function to call after the form is created
	 * @returns {BootstrapModalForm}
	 * @private
	 */
	_onCreateForm(){
		this._attachFormHandlers()
			.modal('show');
		return this;
	}

	/**
	 * Initialize
	 * @returns {*}
	 */
	initialize(){
		return this._createForm()._onCreateForm();
	}
}
/*!
 * bootstrapForm
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * A form with bootstrap feedback
 * @extends Form
 */
class BootstrapForm extends Form {

	/**
	 * Constructor
	 * @param {object} options
	 * @returns {BootstrapForm}
	 */
	constructor(options){
		var defaults = {
			formGroupManager : BootstrapFormGroupManager,
		};
		super($Util.opts(defaults, options, 'replace'));
		return this;
	}

	/**
	 * Setup the feedback
	 * @returns {Form}
	 * @private
	 */
	_setupFeedback(){
		this.feedback = new BootstrapFeedback({
			closeButton : this.settings.feedbackCloseable
		});
		if(!this.$feedback.length){
			this.$feedback = $('<div class="form-feedback"></div>');
			this.$form.prepend(this.$feedback);
		}
		this.$feedback.html(this.feedback.$wrapper);
		return this;
	}
}
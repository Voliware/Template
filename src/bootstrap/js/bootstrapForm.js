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
		super(options);

		return this;
	}

	/**
	 * Setup the feedback
	 * @returns {BootstrapForm}
	 * @private
	 */
	_setupFeedback(){
		this.feedback = new BootstrapFeedback();
		this.feedback.prependTo(this.$form);
		return this;
	}
}
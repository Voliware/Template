/*!
 * bootstrapWizard
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * A wizard with bootstrap feedback
 * @extends Wizard
 */
class BootstrapWizard extends Wizard {

	/**
	 * Constructor
	 * @param {object} options
	 * @returns {BootstrapWizard}
	 */
	constructor(options){
		super(options);

		return this;
	}

	/**
	 * Setup the feedback
	 * @returns {BootstrapWizard}
	 * @private
	 */
	_setupFeedback(){
		this.feedback = new BootstrapFeedback();
		this.feedback.prependTo(this.$form);
		return this;
	}


}
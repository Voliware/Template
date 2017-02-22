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
	 * @returns {Form}
	 * @private
	 */
	_setupFeedback(){
		this.feedback = new BootstrapFeedback();
		if(!this.$feedback.length){
			this.$feedback = $('<div class="form-feedback"></div>');
			this.$wrapper.prepend(this.$feedback);
		}
		this.$feedback.html(this.feedback.$wrapper);
		return this;
	}
}
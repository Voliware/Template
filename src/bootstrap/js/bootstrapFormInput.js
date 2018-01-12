/*!
 * bootstrapFormInput
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Bootstrap form input
 * @extends FormInput
 */
class BootstrapFormInput extends FormInput {

	/**
	 * Constructor
	 * @param {object} [data]
	 * @param {object} [options]
	 * @returns {BootstrapFormInput}
	 */
	constructor(data, options){
		super(data, options);
		return this;
	}

	/**
	 * Default template
	 * @private
	 */
	_useDefaultTemplate(){
		var $template = $(`<${this.tag} class="form-input form-control"/>`);
		this._useTemplate($template);
		return this;
	}
}
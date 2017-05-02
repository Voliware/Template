/*!
 * bootstrapFormSelect
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Bootstrap form select
 * @extends FormSelect
 */
class BootstrapFormSelect extends FormSelect {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {BootstrapFormSelect}
	 */
	constructor(options){
		super(options);
		return this;
	}

	/**
	 * Default template
	 * @private
	 */
	_useDefaultTemplate(){
		var $template = $('<select class="form-input form-control"></select>');
		this._useTemplate($template);
		return this;
	}
}
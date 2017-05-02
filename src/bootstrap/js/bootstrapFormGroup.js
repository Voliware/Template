/*!
 * bootstrapFormGroup
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Bootstrap form group
 * @extends FormGroup
 */
class BootstrapFormGroup extends FormGroup {

	/**
	 * Constructor
	 * @param {object} options
	 * @returns {FormGroup}
	 */
	constructor(options){
		var defaults = {
			formInput: BootstrapFormInput,
			formSelect: BootstrapFormSelect
		};
		super($Util.opts(defaults, options));

		return this;
	}

	/**
	 * Default template
	 * @private
	 */
	_useDefaultTemplate(){
		var template =
			'<div class="form-group row">' +
				'<label class="col-sm-4 control-label"></label>' +
				'<div class="col-sm-8 form-input-wrapper">' +
				'</div>' +
			'</div>';

		this._useTemplate(template);
	}
}
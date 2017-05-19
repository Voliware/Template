/*!
 * formGroupManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Form group manager
 * @extends TemplateManager
 */
class FormGroupManager extends TemplateManager {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {FormGroupManager}
	 */
	constructor(options){
		var defaults = {
			identifier : 'label',
			template : FormGroup
		};
		super($Util.opts(defaults, options));
		return this;
	}

	/**
	 * Populate the template
	 * @param {jQuery|Template} formGroup
	 * @param {*} data
	 * @returns {TemplateManager}
	 * @private
	 */
	_populateTemplate(formGroup, data){
		formGroup
			.createInput(data.input)
			.setLabel(data.label);
		return this;
	}
}
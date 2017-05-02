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
	 * Create a template object that this manager manages
	 * @param {string} id - id of the object to create and then manage
	 * @param {object} [data={}] - data to populate a jquery template with or construct a Template with
	 * @returns {*|null|Template}
	 * @private
	 */
	_create(id, data = {}){
		var formGroup = new this.settings.template()
			.createInput(data.input)
			.setLabel(data.label);
		return this._add(formGroup, id);
	}

	/**
	 * Populate the template
	 * @param {jQuery|Template} formGroup
	 * @param {*} data
	 * @returns {TemplateManager}
	 * @private
	 */
	_populateTemplate(formGroup, data){
		formGroup.createInput(data.input).setLabel(data.label);
		return this;
	}
}
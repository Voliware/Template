/*!
 * formGroup
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Form group
 * @extends Template
 */
class FormGroup extends Template {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {FormGroup}
	 */
	constructor(options){
		var defaults = {
			formInput : FormInput,
			formSelect : FormSelect,
			struct : {
				$wrapper : '.form-group',
				$label : 'label',
				$inputWrapper : '.form-input-wrapper',
				$input : 'input'
			}
		};
		super($Util.opts(defaults, options));

		this.input = null;

		return this;
	}

	/**
	 * Default template
	 * @private
	 */
	_useDefaultTemplate(){
		var template =
			'<div class="form-group">' +
				'<label></label>' +
				'<div class="form-input-wrapper">' +
				'</div>' +
			'</div>';

		this._useTemplate(template);
		return this;
	}

	/**
	 * Create an input or select from data
	 * @param {object} data
	 * @returns {FormGroup}
	 */
	createInput(data){
		switch(data.tag){
			case "input":
				this.input = new this.settings.formInput();
				break;
			case "select":
				this.input = new this.settings.formSelect();
				break;
			case "textarea":
				this.input = new this.settings.formInput({}, {tag:'textarea'});
				break;
		}
		this.input.set(data);
		this.setInput(this.input);
		if(this.input.type === 'hidden'){
			this.$wrapper.hide();
		}
		if(this.input.tag === 'select'){
			this.input.addToSelect(data.selectOptions);
		}
		return this;
	}

	/**
	 * Set the input into the input wrapper
	 * @param {FormInput|FormSelect|jQuery} $input
	 * @returns {FormGroup}
	 */
	setInput($input){
		this.$input = $input instanceof Template ? $input.$wrapper : $input;
		this.$inputWrapper.html(this.$input);
		return this;
	}

	/**
	 * Set the label
	 * @param {jQuery|string} label
	 * @returns {FormGroup}
	 */
	setLabel(label){
		this.$label.html(label);
		return this;
	}
}
/*!
 * formSelect
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Form select
 * @extends FormInput
 */
class FormSelect extends FormInput {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {FormInput}
	 */
	constructor(options){
		super(options);

		// properties
		this.tag = "select";
		this.type = undefined;

		return this;
	}

	/**
	 * Set attributes
	 * @returns {FormInput}
	 * @private
	 */
	_setAttrs(){
		this.$wrapper.attr({
			name : this.name
		});
		return this;
	}

	/**
	 * Add options to the select
	 * @param {*} arguments - Either an object of key/value pairs, where the key is the
	 * option value and the value is the string within the tags,
	 * or a key and value as two parameters to add one option
	 * @returns {FormSelect}
	 */
	addToSelect(){
		this.$wrapper.addToSelect(...arguments);
		return this;
	}

	/**
	 * Select an option
	 * @param {string} val
	 * @param {boolean} [trigger=true] - whether to fire change event
	 * @returns {FormSelect}
	 */
	selectOption(val, trigger = true){
		this.$wrapper.val(val);
		if(trigger) {
			this.$wrapper.trigger('change');
		}
		return this;
	}
}
/*!
 * formInput
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Form input
 * @extends Template
 */
class FormInput extends Template {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {FormInput}
	 */
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : '.form-input'
			}
		};
		super($Util.opts(defaults, options));

		// properties
		this.type = "text";
		this.tag = "input";
		this.disabled = false;
		this.required = false;
		this.name = "input";
		this.maxlength = undefined;
		this.max = undefined;
		this.min = undefined;
		this.step = undefined;
		this.val = null;

		return this;
	}

	/**
	 * Set properties from data
	 * @param {object} data
	 * @returns {FormInput}
	 */
	set(data){
		Object.set(this, data);
		return this;
	}

	/**
	 * Default template
	 * @private
	 */
	_useDefaultTemplate(){
		var $template = $('<input class="form-input"/>');
		this._useTemplate($template);
		return this;
	}

	/**
	 * Use template
	 * @param {jQuery} $template
	 * @returns {FormInput}
	 * @private
	 */
	_useTemplate($template){
		super._useTemplate($template);
		this._setAttrs()
			._setProps()
			._setVal();
		return this;
	}

	/**
	 * Set attributes
	 * @returns {FormInput}
	 * @private
	 */
	_setAttrs(){
		this.$wrapper.attr({
			maxlength : this.maxlength,
			max : this.max,
			min : this.min,
			name : this.name,
			step : this.step,
			type : this.type
		});
		return this;
	}

	/**
	 * Set props
	 * @returns {FormInput}
	 * @private
	 */
	_setProps(){
		this.$wrapper.prop('required', this.required);
		this.$wrapper.prop('disabled', this.disabled);
		return this;
	}

	/**
	 * Set the value
	 * @returns {FormInput}
	 * @private
	 */
	_setVal(){
		if(this.val !== null){
			this.$wrapper.val(this.val);
		}
		return this;
	}
}
/*!
 * col
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * A table column with inline editing support.
 * Used to build complex rows.
 * @extends Template
 */
class Col extends Template {

	/**
	 * Constructor
	 * @param {object} options
	 * @returns {Col}
	 */
	constructor(options){
		var defaults = {
			inlineEdit : true,
			// options found in FormInput
			fieldOptions : {
				name : "input",
				type : 'text',
				tag : 'input'
			},
			struct : {
				$wrapper : 'td'
			}
		};
		super($Util.opts(defaults, options));
		var self = this;

		// properties
		this.value = 0;

		// states
		this.isInEditMode = false;

		// handlers
		if(this.settings.inlineEdit && !self.isInEditMode) {
			this.$wrapper.click(function () {
				self.toggleInlineEdit(true);
			});
		}

		return this;
	}

	/**
	 * Default template
	 * @returns {Template}
	 * @private
	 */
	_useDefaultTemplate(){
		var template = '<td><span data-name="'+ this.settings.fieldOptions.name +'"></span></td>';
		return this._useTemplate(template);
	}

	/**
	 * Set field options
	 * @param {object} options
	 * @param {string} options.name
	 * @param {string} [options.type]
	 * @param {string} [options.tag]
	 * @returns {Col}
	 */
	setFieldOptions(options){
		this.settings.fieldOptions.name = options.name;
		if(isDefined(options.type)){
			this.settings.fieldOptions.type = options.type;
		}
		if(isDefined(options.tag)){
			this.settings.fieldOptions.tag = options.tag;
		}

		this._useDefaultTemplate();
		return this;
	}

	/**
	 * Toggle inline editing state
	 * @param {boolean} state
	 * @returns {Col}
	 */
	toggleInlineEdit(state){
		this.isInEditMode = state;
		if(state){
			this.$wrapper.children().wrap('<div class="childWrap" style="display:none;"></div>');
			this.createInlineField();
		}
		else {
			this.$wrapper.find(this.settings.fieldOptions.tag).remove();
			this.$wrapper.find('.childWrap').children().unwrap();
		}
		return this;
	}

	/**
	 * Create an input or select for inline editing
	 * @returns {Col}
	 */
	createInlineField(){
		var self = this;
		var field;
		switch(this.settings.fieldOptions.tag){
			case 'select':
				field = new FormSelect(this.settings.fieldOptions);
				break;
			case 'input':
			default:
				field = new FormInput(this.settings.fieldOptions);
				break;
		}
		this.$wrapper.append(field.$wrapper);

		field.focus();
		field.val(this.value);
		field.blur(function(){
			if(self.isInEditMode){
				self.trigger('edit', $(this).val());
				self.toggleInlineEdit(false);
			}
		});

		return this;
	}
}
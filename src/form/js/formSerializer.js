/*!
 * formSerializer
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Serializes a form
 */
class FormSerializer {

	/**
	 * Construtor
	 * @param {object} [options]
	 * @param {number} [options.checkboxMode=0] - the mode in which to serialize checkboxes
	 * @param {number} [options.mode=0] - the mode in which to serialize data
	 * mode in which to serialize checkboxes
	 * @returns {FormSerializer}
	 */
	constructor(options){
		var defaults = {
			checkboxMode : FormSerializer.checkboxMode.number,
			serializeMode : FormSerializer.serializeMode.toString
		};
		this.settings = $Util.opts(defaults, options);

		return this;
	}

	/**
	 * Get either the [name]
	 * or [data-name] attr of an element
	 * @param {jQuery} $el
	 * @returns {string}
	 * @private
	 */
	_getElName($el){
		if(typeof $el.attr('name') !== "undefined")
			return $el.attr('name');
		if(typeof $el.data('name') !== "undefined")
			return $el.data('name');

		console.error("FormSerializer._getElName: field has no name or data-name attribute");
		return '';
	}

	/**
	 * Convert a checkbox
	 * @param {jQuery} $checkbox
	 * @param {number} mode
	 * @returns {boolean|number|string}
	 * @private
	 */
	_convertCheckbox($checkbox, mode){
		var checked = $checkbox.is(':checked');
		switch(mode){
			case FormSerializer.checkboxMode.boolean:
				return checked;
				break;
			case FormSerializer.checkboxMode.number:
				return checked ? 1 : 0;
				break;
			case FormSerializer.checkboxMode.string:
				return checked ? '1' : '0';
				break;
			case FormSerializer.checkboxMode.onOff:
				return checked ? 'on' : 'off';
				break;
		}
	}

	/**
	 * Serialize a form
	 * @param {jQuery} $form
	 * @returns {object|string}
	 */
	serialize($form){
		var self = this;
		var formData = new FormSerializerData();
		var data = {};

		$form.find('input, select').each(function(i, e){
			var $el = $(e);
			var name = "";
			var order = -1;
			var type = "";
			var tag = "";
			var val = "";

			if($el.data('serialize') === false)
				return true;

			// get the tag (input or select)
			tag = $el[0].nodeName.toLowerCase();

			// find the name
			name = self._getElName($el);
			if(typeof name === 'undefined')
				return true;

			// see if it needs to be serialized in some order
			if(typeof $el.data('order') !== "undefined")
				order = $el.data('order');

			// handle <input>s
			if(tag === 'input'){
				type = $el.attr('type');
				if(typeof type === 'undefined')
					return console.error("FormSerializer.serialize: input" + name + " must have a type");

				switch(type){
					case 'checkbox':
						val = self._convertCheckbox($el, this.settings.checkboxMode);
						break;
					case 'file':
						var files = $el.get(0).files;
						if (files.length === 0) {
							return true;
						}
						val = files[0];
						break;
					default:
						val = $el.val();
						break;
				}
			}
			// handle <select>s
			else if (tag === 'select'){
				val = $el.val();
			}
			else{
				console.error('FormSerializer.serialize: only inputs and selects can be serialized');
			}

			data[name] = {
				val : val,
				order : order
			};
		});

		formData.set(data);

		switch(this.settings.serializeMode){
			default:
			case FormSerializer.serializeMode.toString:
				return formData.toString();
				break;
			case FormSerializer.serializeMode.toOrderedString:
				return formData.toOrderedString();
				break;
			case FormSerializer.serializeMode.toObject:
				return formData.toObject();
				break;
		}
	}
}

/**
 * Mode in which to convert checkboxes
 */
FormSerializer.checkboxMode = {
	boolean : 0,
	number : 1,
	string : 2,
	onOff : 3
};

/**
 * Mode in which to serialize data
 */
FormSerializer.serializeMode = {
	toString : 0,
	toOrderedString : 1,
	toObject : 2
};
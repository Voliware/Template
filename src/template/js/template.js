/*!
 * template
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * A re-useable DOM generator that can
 * create new jQuery objects using the
 * 'new' keyword. All jQuery functions
 * are applied to this object's $wrapper property
 */
class Template {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {jQuery} [options.template=null] - if passed, this
	 * jquery object will be deconstructed into a template
	 * @param {boolean} [options.consumeTemplate=false] - whether to remove the
	 * template from the dom, if it exists there
	 * @param {boolean} [options.useTemplate=false] - whether to use the template
	 * itself as this object, bound to $wrapper
	 * @param {object} [options.struct]
	 * @param {object} [options.struct.$wrapper] - any css class that indicates
	 * what the $wrapper element should be for the template
	 * @returns {Template}
	 */
	constructor(options){
		var defaults = {
			template : null,
			consumeTemplate : false,
			useTemplate : false,
			// jquery elements for components
			struct : {
				$wrapper : ''
			}
		};
		this.settings = $Util.opts(defaults, options);

		this._template();

		// properties related to template population
		this._cachedData = {};
		this._processedData = {};

		return this;
	}

	/**
	 * Uses the provided template to create
	 * the DOM structure, or if no template
	 * was passed, calls _useDefaultTemplate
	 * @returns {Template}
	 * @private
	 */
	_template(){
		if(this.settings.template)
			this._useTemplate();
		else
			this._useDefaultTemplate();

		this.$wrapper.removeClass('template');

		// attach all jquery functions to Template
		$Util.jQuerify(this);

		return this;
	}

	/**
	 * Deconstructs the template into object
	 * properties based on this.settings.struct
	 * @param {jQuery|string} [$template=null] - a string or jquery object to use as the template.
	 * If null, will use what is set in this.settings.template
	 * @returns {Template}
	 * @private
	 */
	_useTemplate($template = null){
		$template = $template || this.settings.template;
		// conver string to jquery
		if(isString($template)) {
			$template = $($template);
		}
		else if ($template instanceof $){
			// remove the templates id attr
			if(!this.settings.useTemplate)
				$template = $template.clone().removeAttr('id');
			// remove the template from the DOM
			if(this.settings.consumeTemplate)
				$template.remove();
		}
		else if($template instanceof $ === false){
			throw new ReferenceError("Template._useTemplate: first argument must be a string or jquery");
		}

		// search for the HTML components
		// then add them to this object
		// eg this.$image
		var self = this;
		for(var i in this.settings.struct){
			var struct = this.settings.struct[i];
			self[i] = $template.find(struct);
		}
		this.$wrapper = $($template.get(0));

		return this;
	}

	/**
	 * Optionally provide a default
	 * way to construct the DOM object
	 * @returns {Template}
	 * @private
	 */
	_useDefaultTemplate() {
		return this;
	}

	// data

	/**
	 * Cache data into a new object.
	 * @param {object} data
	 * @returns {Template}
	 * @private
	 */
	_cacheData(data){
		this._cachedData = $.extend(true, {}, data);
		return this;
	}

	/**
	 * Process data into a new object.
	 * @param {object} data
	 * @returns {Template}
	 * @private
	 */
	_processData(data){
		this._processedData = $.extend(true, {}, data);
		return this;
	}

	/**
	 * Override popualteChildren to first cache and process data.
	 * Use the processed data to populate the Template.
	 * @param {object} data
	 * @returns {Template}
	 */
	populateChildren(data){
		this._cacheData(data);
		this._processData(data);
		this.$wrapper.populateChildren(this._processedData);
		return this;
	}
}
/*!
 * bootstrapTabManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Manages bootstrap tabs
 * @extends TemplateManager
 */
class BootstrapTabManager extends TemplateManager {

	/**
	 * Constructor
	 * @param {object} options
	 * @param {object} [options.template=BootstrapTab]
	 * @param {jQuery} [options.$wrapper=$('<div class="tab-content"></div>')] - manager wrapper
	 * @returns {BootstrapTabManager}
	 */
	constructor(options) {
		var defaults = {
			$wrapper : $('<div class="tab-content"></div>'),
			template : BootstrapTab
		};
		super($Util.opts(defaults, options));
		// alias
		this.tabs = this.objects;
		return this;
	}

	/**
	 * Get the first tab in the wrapper
	 * @returns {jQuery}
	 */
	getFirst(){
		return $(this.$wrapper.find('.tab-pane').get(0));
	}

	// manager overrides

	/**
	 * Create and add a new tab
	 * and give it an id attribute
	 * @param {number|string} id
	 * @returns {BootstrapTab}
	 * @private
	 */
	_create(id) {
		var tab = new this.template();
		tab.attr('id', id);
		return this._add(tab, id);
	}

	/**
	 * Update a tab and its id attribute
	 * @param {jQuery|BootstrapTab} tab
	 * @param {number|string} [id]
	 * @returns {*}
	 * @private
	 */
	_update(tab, id) {
		if(id)
			tab.attr('id', id);
		this.trigger('update', tab);
		return this;
	}
}
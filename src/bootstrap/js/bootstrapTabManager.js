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
	 * Create and add a new Tab
	 * @param {string} id - id of the object to create and then manage
	 * @param {object} data
	 * @param {number|string} data.id
	 * @param {jQuery|string} [data.html]
	 * @returns {BootstrapNav}
	 * @private
	 */
	_create(id, data){
		if(!isDefined(data) || !isDefined(data.id))
			throw new ReferenceError("BootstrapTabManager.create: an 'id' property is required to create a Tab");
		else
			return super._create(id, data);
	}

	/**
	 * Get the first tab in the wrapper
	 * @returns {jQuery}
	 */
	getFirst(){
		return $(this.$wrapper.find('.tab-pane').get(0));
	}
}
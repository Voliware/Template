/*!
 * bootstrapNavManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Manages bootstrap navs
 * @extends TemplateManager
 */
class BootstrapNavManager extends TemplateManager {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.template=BootstrapNav]
	 * @param {jQuery} [options.$wrapper=$('<div class="nav nav-tabs"></div>')] - manager wrapper
	 * @returns {BootstrapNavManager}
	 */
	constructor(options) {
		var defaults = {
			$wrapper : $('<ul class="nav nav-tabs"></ul>'),
			template : BootstrapNav
		};
		super($Util.opts(defaults, options));
		// alias
		this.navs = this.objects;
		return this;
	}

	/**
	 * Create and add a new Nav
	 * @param {string} id - id of the object to create and then manage
	 * @param {object} data
	 * @param {object} data.href - href for the nav
	 * @param {object} [data.html] - html for the nav
	 * @returns {BootstrapNav}
	 * @private
	 */
	_create(id, data){
		if(!isDefined(data) || !isDefined(data.href))
			throw new ReferenceError("BootstrapNavManager.create: an 'href' property is required to create a Nav");
		else
			return super._create(id, data);
	}

	/**
	 * Get the first nav
	 * @returns {jQuery}
	 */
	getFirst(){
		return $(this.$wrapper.find('a').get(0));
	}
}
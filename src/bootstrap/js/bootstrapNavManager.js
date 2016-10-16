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
	 * Get the first nav
	 * @returns {jQuery}
	 */
	getFirst(){
		return $(this.$wrapper.find('a').get(0));
	}

	// manager overrides

	/**
	 * Create and add a new Nav
	 * @param {object} dom
	 * @param {object} dom.href - href for the nav
	 * @param {object} [dom.html] - html for the nav
	 * @returns {BootstrapNav}
	 * @private
	 */
	_create(dom) {
		if(isUndefined(dom) || isUndefined(dom.href))
			throw new ReferenceError("BootstrapNavManager.create: an 'href' property is required to create a Nav");
		var nav =  new this.template({
			dom : dom
		});
		return this._add(nav, dom.href);
	}

	/**
	 * Update the nav
	 * @param {BootstrapNav} nav
	 * @param {object} dom
	 * @param {object} dom.href - href for the nav
	 * @param {object} [dom.html] - html for the nav
	 * @returns {*}
	 * @private
	 */
	_update(nav, dom) {
		nav._setup(dom);
		return super._update(nav, dom.href);
	}
}
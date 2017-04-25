/*!
 * bootstrapNav
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates a bootstrap nav
 * @extends Template
 */
class BootstrapNav extends Template {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$wrapper=".tab-pane"]
	 * @param {string} [options.struct.$link="a"]
	 * @returns {BootstrapNav}
	 */
	constructor(options) {
		var defaults = {
			struct : {
				$wrapper : 'li',
				$link : 'a'
			}
		};
		super($Util.opts(defaults, options));

		return this;
	}

	/**
	 * Build default BootstrapNav
	 * @returns {BootstrapNav}
	 * @private
	 */
	_useDefaultTemplate(){
		var template =
			'<li class="nav-item">' +
				'<a class="nav-link" data-toggle="tab" href="#"></a>' +
			'</li>';

		this._useTemplate($(template));

		return this;
	}

	/**
	 * Populate the href and html
	 * @param {object} data
	 * @param {number|string} data.href
	 * @param {jQuery|string} [data.html]
	 * @returns {BootstrapNav}
	 */
	populateChildren(data){
		this.$link.attr('href', '#' + data.href);
		if(data.html)
			this.$link.html(data.html);
		return this;
	}

	/**
	 * Set the tab to active by
	 * running click() event on it
	 * @returns {BootstrapNav}
	 */
	setActive(){
		this.$link.click();
		return this;
	}
}
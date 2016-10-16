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
	 * @param {object} [options.dom]
	 * @param {string} [options.dom.href]
	 * @param {jQuery|string} [options.dom.html]
	 * @returns {BootstrapNav}
	 */
	constructor(options) {
		var defaults = {
			struct : {
				$wrapper : 'li',
				$link : 'a'
			},
			dom : {
				href : "",
				html : ""
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
			'<li>' +
				'<a data-toggle="tab" href="#"></a>' +
			'</li>';

		this.settings.template = $(template);
		this.settings.useTemplate = true;
		this._useTemplate(template);

		return this;
	}

	/**
	 * Setup the BootstrapNav dom if there
	 * are any settings for it
	 */
	_setup(){
		var d = this.settings.dom;
		if(d.href)
			this.setHref(d.href);
		if(d.html)
			this.setHtml(d.html);
		return this;
	}

	/**
	 * Set the href of the nav $link
	 * @param {number|string} href
	 * @returns {BootstrapNav}
	 */
	setHref(href){
		this.$link.attr('href', '#' + href);
		return this;
	}

	/**
	 * Set the html of the nav $link
	 * @param html
	 * @returns {BootstrapNav}
	 */
	setHtml(html){
		this.$link.html(html);
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
/*!
 * bootstrapTab
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates a bootstrap tab
 * @extends Template
 */
class BootstrapTab extends Template {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$wrapper=".tab-pane"] - the tab class
	 * @param {object} [options.dom]
	 * @returns {BootstrapTab}
	 */
	constructor(options) {
		var defaults = {
			struct : {
				$wrapper : '.tab-pane'
			},
			dom : {
				id : ''
			}
		};
		super($Util.opts(defaults, options));
		return this;
	}

	/**
	 * Default template
	 * @returns {BootstrapTab}
	 * @private
	 */
	_useDefaultTemplate(){
		this.$wrapper = $('<div class="tab-pane fade"></div>');
		return this;
	}

	/**
	 * Add an id and html to the tab
	 * @returns {BootstrapTab}
	 * @private
	 */
	_setup(){
		var d = this.settings.dom;
		if(d.id)
			this.attr('id', d.id);
		if(d.html)
			this.html(d.html);
		return this;
	}
}
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
	 * @returns {BootstrapTab}
	 */
	constructor(options) {
		var defaults = {
			struct : {
				$wrapper : '.tab-pane'
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
	 * Populate the id and html
	 * @param {object} data
	 * @param {number|string} data.id
	 * @param {jQuery|string} [data.html]
	 * @returns {BootstrapTab}
	 */
	populateChildren(data){
		this.attr('id', data.id);
		if(data.html)
			this.html(data.html);
		return this;
	}
}
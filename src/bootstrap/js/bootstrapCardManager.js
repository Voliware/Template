/*!
 * bootstrapCardManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Manages cards
 * @extends TemplateManager
 */
class BootstrapCardManager extends TemplateManager {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.template=card]
	 * @param {jQuery} [options.$wrapper='$(<div class="card-group"></div>}'] - manager wrapper
	 * @returns {BootstrapCardManager}
	 */
	constructor(options) {
		var defaults = {
			$wrapper : $('<div class="card-group"></div>'),
			template : BootstrapCard
		};
		super($Util.opts(defaults, options));

		// alias
		this.cards = this.objects;

		return this;
	}
}
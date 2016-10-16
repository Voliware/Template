/*!
 * bootstrapPanelManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Manages panels
 * @extends TemplateManager
 */
class BootstrapPanelManager extends TemplateManager {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.template=Panel]
	 * @param {jQuery} [options.$wrapper='$(<div class="panel-group"></div>}'] - manager wrapper
	 * @returns {BootstrapPanelManager}
	 */
	constructor(options) {
		var defaults = {
			$wrapper : $('<div class="panel-group"></div>'),
			template : BootstrapPanel
		};
		super($Util.opts(defaults, options));

		// alias
		this.panels = this.objects;

		return this;
	}
}
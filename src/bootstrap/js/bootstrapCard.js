/*!
 * bootstrapCard
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Template for bootstrap cards
 * @extends BootstrapPanel
 */
class BootstrapCard extends BootstrapPanel {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {boolean} [options.closeable=false] - whether to attach a close button to the card
	 * @param {boolean} [options.collapsible=false] - whether to attach a collapse button to the card
	 * @param {object} [options.struct] - card structure for templates
	 * @param {string} [options.struct.$wrapper='.card'] - the card selector
	 * @param {string} [options.struct.$header='.card-header'] - the card header selector
	 * @param {string} [options.struct.$headerText='.card-header-text'] - the card header text selector
	 * @param {string} [options.struct.$close='.card-close'] - the card close selector
	 * @param {string} [options.struct.$collapse='.card-collapse'] - the card collapse selector
	 * @param {string} [options.struct.$content='.card-content'] - the card collapse selector
	 * @param {string} [options.struct.$block='.card-block'] - the card block selector
	 * @param {string} [options.struct.$title='.card-title'] - the card title selector
	 * @param {string} [options.struct.$text='.card-text'] - the card text selector
	 * @param {string} [options.struct.$footer='.card-footer'] - the card footer selector
	 * @returns {BootstrapCard}
	 */
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : '.card',
				$header : '.card-header',
				$headerText : '.card-header-text',
				$close : '.card-close',
				$collapse : '.card-collapse',
				$content : '.card-content',
				$block : '.card-block',
				$title : '.card-title',
				$text : '.card-text',
				$footer : '.card-footer'
			}
		};
		super($Util.opts(defaults, options));

		return this;
	}

	/**
	 * Creates a default template
	 * @returns {BootstrapCard}
	 * @private
	 */
	_useDefaultTemplate(){
		var template =
			'<div class="card">' +
				'<h3 class="card-header clearfix">' +
					'<span class="card-header-text"></span>' +
					'<a href="#" class="close card-close" aria-label="close">&times;</a>' +
					'<a href="#" class="card-collapse" aria-label="collapse"></a>' +
				'</h3>' +
				'<div class="card-content collapse in">' +
					'<div class="card-block">' +
						'<h4 class="card-title"></h4>' +
						'<p class="card-text"></p>' +
					'</div>' +
				'</div>' +
				'<div class="card-footer"></div>' +
			'</div>';

		this._useTemplate($(template));

		if(!this.settings.closeable)
			this.$close.remove();
		if(!this.settings.collapsible)
			this.$collapse.remove();

		return this;
	}

	/**
	 * Collapse the card
	 * @returns {BootstrapCard}
	 * @private
	 */
	_collapse(){
		this.isCollapsed  = !this.isCollapsed;
		this.$content.collapse("toggle");
		//this.$collapse.toggleClass('glyphicon-chevron-up glyphicon-chevron-down');
		return this;
	}
}
/*!
 * bootstrapPanel
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Template for bootstrap panels
 * @extends Template
 */
class BootstrapPanel extends Template {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {boolean} [options.closeable=false] - whether to attach a close button to the panel
	 * @param {boolean} [options.collapsible=false] - whether to attach a collapse button to the panel
	 * @param {object} [options.struct] - panel structure for templates
	 * @param {string} [options.struct.$wrapper='.panel'] - the panel selector
	 * @param {string} [options.struct.$header='.panel-header'] - the panel header selector
	 * @param {string} [options.struct.$title='.panel-title'] - the panel title selector
	 * @param {string} [options.struct.$collapse='.panel-collapse'] - the panel collapse selector
	 * @param {string} [options.struct.$close='.panel-close'] - the panel close selector
	 * @param {string} [options.struct.$body='.panel-body'] - the panel body selector
	 * @param {string} [options.struct.$footer='.panel-footer'] - the panel footer selector
	 * @returns {BootstrapPanel}
	 */
	constructor(options){
		var defaults = {
			closeable : false,
			collapsible : false,
			struct : {
				$wrapper : '.panel',
				$header : '.panel-heading',
				$title : '.panel-title',
				$collapse : '.panel-collapse',
				$close : '.panel-close',
				$body : '.panel-body',
				$content : '.panel-content',
				$footer : '.panel-footer'
			}
		};
		super($Util.opts(defaults, options));

		var self = this;

		// properties
		this.isCollapsed = false;
		this.isClosed = false;

		// handlers
		if(this.settings.closeable) {
			this.$close.click(function (e) {
				e.stopPropagation();
				self._onClose();
				self.trigger('close');
			});
		}
		if(this.settings.collapsible) {
			this.$header.click(function () {
				self._collapse();
				self.trigger('collapse');
			});
		}

		return this;
	}

	/**
	 * Creates a default template
	 * @returns {BootstrapPanel}
	 * @private
	 */
	_useDefaultTemplate(){
		var template =
			'<div class="panel panel-default">' +
				'<div class="panel-heading clearfix">' +
					'<h4 class="panel-title"></h4>' +
					'<a href="#" class="close panel-close" aria-label="close">&times;</a>' +
					'<a href="#" class="panel-collapse glyphicon glyphicon-chevron-up" aria-label="collapse"></a>' +
				'</div>' +
				'<div class="panel-content collapse in">' +
					'<div class="panel-body"></div>' +
				'</div>' +
				'<div class="panel-footer"></div>' +
			'</div>';

		this.settings.template = $(template);
		this.settings.useTemplate = true;
		this._useTemplate(template);

		if(!this.settings.closeable)
			this.$close.remove();
		if(!this.settings.collapsible)
			this.$collapse.remove();

		return this;
	}

	/**
	 * Collapse the panel
	 * @returns {BootstrapPanel}
	 * @private
	 */
	_collapse(){
		this.isCollapsed  = !this.isCollapsed;
		this.$content.collapse("toggle");
		this.$collapse.toggleClass('glyphicon-chevron-up glyphicon-chevron-down');
		return this;
	}

	/**
	 * On close handler
	 * @returns {BootstrapPanel}
	 * @private
	 */
	_onClose(){
		this.isClosed  = !this.isClosed;
		this.slideUp();
		return this;
	}
}
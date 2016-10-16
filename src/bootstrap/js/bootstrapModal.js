/*!
 * bootstrapModal
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Template for a bootstrap modal
 * @extends Progress
 */
class BootstrapModal extends Template {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$wrapper='.modal'] - the main modal selector
	 * @param {string} [options.struct.$dialog='.modal-dialog'] - the dialog selector
	 * @param {string} [options.struct.$content='.modal-content'] - the content selector
	 * @param {string} [options.struct.$header='.modal-header'] - the header selector
	 * @param {string} [options.struct.$title='.modal-title'] - the title selector
	 * @param {string} [options.struct.$body='.modal-body'] - the body selector
	 * @param {string} [options.struct.$footer='.modal-footer'] - the footer selector
	 * @param {string} [options.struct.$close='button.close'] - the close button selector
	 * @returns {BootstrapModal}
	 */
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : '.modal',
				$dialog : '.modal-dialog',
				$content : '.modal-content',
				$header : '.modal-header',
				$title : '.modal-title',
				$body : '.modal-body',
				$footer : '.modal-footer',
				$close : 'button.close'
			}
		};
		super($Util.opts(defaults, options));

		return this;
	}

	/**
	 * Create a default template
	 * @returns {BootstrapModal}
	 * @private
	 */
	_useDefaultTemplate(){
		var template =
			'<div class="modal fade">' +
				'<div class="modal-dialog" role="document">' +
					'<div class="modal-content">' +
						'<div class="modal-header">' +
							'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
								'<span aria-hidden="true">&times;</span>' +
							'</button>' +
							'<h4 class="modal-title"></h4>' +
						'</div>' +
						'<div class="modal-body"></div>' +
						'<div class="modal-footer"></div>' +
					'</div>' +
				'</div>'+
			'</div>';

		this.settings.template = $(template);
		this.settings.useTemplate = true;
		this._useTemplate();

		$('body').append(this.$wrapper);

		return this;
	}
}
/*!
 * bootstrapProgress
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Template for bootstrap progress bar
 * @extends Template
 */
class BootstrapProgress extends Template {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {boolean} [options.showPercent=true] - whether to show percent value
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$wrapper='.progress'] - the wrapper element
	 * @param {string} [options.struct.$progress='.progress'] - the bootstrap progress element
	 * @param {string} [options.struct.$bar='.progress-bar'] - the bootstrap progress bar
	 * @param {string} [options.struct.$percent='.progress-percent'] - the progress bar percent
	 * @returns {BootstrapProgress}
	 */
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : '.progress-wrapper',
				$progress : '.progress',
				$bar : '.progress-bar',
				$percent : '.progress-percent'
			},
			showPercent : true
		};
		super($Util.opts(defaults, options));

		this.percent = 0;

		return this;
	}

	/**
	 * Create a default template
	 * @returns {BootstrapProgress}
	 * @private
	 */
	_useDefaultTemplate(){
		var template = 
			'<div class="progress-wrapper">' +
				'<div class="progress">' +
					'<div class="progress-bar"></div>' +
					'<div class="progress-percent"></div>' +
				'</div>' +
			'</div>';
		
		this._useTemplate($(template));

		if(!this.settings.showPercent)
			this.$percent.remove();

		return this;
	}

	/**
	 * Set the percent text
	 * @param {number} percent
	 * @returns {BootstrapProgress}
	 * @private
	 */
	_setPercent(percent){
		this.percent = Math.floor(percent);
		this.$percent.html(percent + "%");
		this.$percent.toggleClass('progress-percent-white', percent > 50);
		return this;
	}

	/**
	 * Set the progress of the bar
	 * @param {number} percent
	 * @returns {BootstrapProgress}
	 */
	setProgress(percent){
		percent = Math.floor(percent);
		this.$bar.css('width', percent + "%");
		this.$bar.toggleClass('progress-bar-success', percent === 100);
		if(this.settings.showPercent)
			this._setPercent(percent);
		return this;
	}
}
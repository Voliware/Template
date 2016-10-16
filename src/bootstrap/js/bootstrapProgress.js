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
	 * @param {string} [options.struct.$wrapper='.progress-wrapper'] - the wrapper element
	 * @param {string} [options.struct.$container='.progress'] - the progress container
	 * @param {string} [options.struct.$progress='.progress-bar'] - the progress bar
	 * @param {string} [options.struct.$percent='.progress-percent'] - the progress percent
	 * @returns {BootstrapProgress}
	 */
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : '.progress-wrapper',
				$container : '.progress',
				$progress : '.progress-bar',
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


		this.settings.template = $(template);
		this.settings.useTemplate = true;
		this._useTemplate(template);

		if(!this.settings.showPercent)
			this.$percent.remove();


		return this;
	}

	/**
	 * Center the percent text
	 * @returns {BootstrapProgress}
	 * @private
	 */
	_centerPercent(){
		// 20 px is approx the text sie of "0%"
		var w = this.$percent.width() || 20;
		this.$percent.css('margin-left', w / 2 * -1 + "px");
		return this;
	}

	/**
	 * Set the percent text
	 * @param {number} percent
	 * @returns {BootstrapProgress}
	 * @private
	 */
	_setPercent(percent){
		this.percent = percent;
		this.$percent.html(percent + "%");
		this.$percent.toggleClass('progress-percent-white', percent > 50);
		this._centerPercent();
		return this;
	}

	/**
	 * Set the progress of the bar
	 * @param {number} percent
	 * @returns {BootstrapProgress}
	 */
	setProgress(percent){
		this.$progress.css('width', percent + "%");
		this.$progress.toggleClass('progress-bar-success', percent === 100);
		if(this.settings.showPercent)
			this._setPercent(percent);
		return this;
	}
}
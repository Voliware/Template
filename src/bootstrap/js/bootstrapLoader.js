/*!
 * bootstrapLoader
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Page loader that has a set
 * of steps to move through
 * @extends BootstrapProgress
 */
class BootstrapLoader extends BootstrapProgress {

	/**
	 * Constructor
	 * @param {object} options
	 * @param {object[]} options.steps - an array of steps. A step is a simple
	 * object with a 'text' and 'err' property that are simple strings
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$text='.loader-text'] - the text selector
	 * @returns {BootstrapLoader}
	 */
	constructor(options){
		var defaults = {
			struct : {
				$text : '.loader-text'
			},
			steps : []
		};
		super($Util.opts(defaults, options));

		// properties
		this.stepCount = this.settings.steps.length;
		this.step = 0;

		if(!this.settings.showPercent)
			this.$text.css('top','-5px');

		return this;
	}

	/**
	 * Create a default template
	 * @returns {BootstrapLoader}
	 * @private
	 */
	_useDefaultTemplate(){
		super._useDefaultTemplate();
		this.$text = $('<div class="loader-text"></div>');

		this.$wrapper
			.prepend(this.$text)
			.addClass('loader');
		return this;
	}

	/**
	 * Get a step object from
	 * its index in the steps array
	 * @param {number} id
	 * @returns {error|object}
	 * @private
	 */
	_getStep(id){
		if(this.settings.steps.length > 0 && this.settings.steps[id])
			return this.settings.steps[id];
		else
			throw new RangeError("BootstrapLoader.getStep: step not found in steps array");
	}

	/**
	 * Get the percent of the loader
	 * based on the step index
	 * @param {number} id
	 * @returns {number}
	 */
	getPercent(id){
		return (id + 1) / this.stepCount * 100;
	}

	/**
	 * Set the progress of the loader
	 * @param {number} percent
	 * @returns {BootstrapLoader}
	 */
	setProgress(percent){
		super.setProgress(percent);
		this.$text.toggleClass('success', percent === 100);
		return this;
	}

	/**
	 * Set the text of the loader
	 * @param {string} text
	 * @returns {BootstrapLoader}
	 */
	setText(text){
		this.$text.html(text);
		return this;
	}

	/**
	 * Move the loader to a step
	 * @param {number} id - step index
	 * @returns {BootstrapLoader}
	 */
	setStep(id){
		this.step = id;
		var step = this._getStep(id);
		var percent = this.getPercent(id);
		this.setText(step.text);
		this.setProgress(percent);
		return this;
	}

	/**
	 * Move the loader to an error
	 * Or set the current step to error state
	 * @param {number|string} [arguments] - optional arguments
	 * number - pass a step id to grab the error from
	 * string - pass a string error
	 * void - sets the error to the current step's error
	 * @returns {BootstrapLoader}
	 */
	setErr(){
		var arg = arguments ? arguments[0] : null;
		var step;

		// arg is a step id
		if(isNumber(arg)){
			step = this._getStep(arg);
			this.setText(step.err);
		}

		// arg is a string
		if(isString(arg))
			this.setText(arg);

		// no arg
		if(isNull(arg)){
			step = this._getStep(this.step);
			this.setText(step.err);
		}

		this.$text.addClass('err');
		this.$bar.addClass('progress-bar-danger');
		return this;
	}

	/**
	 * Move to the first step
	 * @returns {BootstrapLoader}
	 */
	goStart(){
		this.setStep(0);
		return this;
	}

	/**
	 * Move to the next step
	 * @returns {BootstrapLoader}
	 */
	goNext(){
		var id = this.step + 1;
		this.setStep(id);
		return this;
	}

	/**
	 * Move to the previous step
	 * @returns {BootstrapLoader}
	 */
	goPrev(){
		var id = this.step - 1;
		if(id > 0)
			this.setStep(id);
		return this;
	}

	/**
	 * Move to the last step
	 * @returns {BootstrapLoader}
	 */
	goEnd(){
		var id = this.stepCount - 1;
		this.setStep(id);
		return this;
	}
}
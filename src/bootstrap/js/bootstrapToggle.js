/*!
 * bootstrapToggle
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates a bootstrap toggle
 * @extends Template
 */
class BootstrapToggle extends Template {

	/**
	 * Constructor.
	 * The input has to be put inside a container element
	 * for it to be able to move around after initialization
	 * @param {object} [options]
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$container=".toggle"] - an element to contain the toggle
	 * @param {string} [options.struct.$wrapper="$wrapper"] - the <input> element
	 * @param {object} [options.toggleOptions] - bootstrapToggle options
	 * @param {string} [options.name] - name of the <input>
	 * @returns {BootstrapToggle}
	 */
	constructor(options){
		if(!isDefined($.fn.bootstrapToggle))
			throw new Error("BootstrapToggle.constructor: the bootstrap toggle file must be included before bootstrap.");

		var defaults = {
			struct : {
				$container : '.toggle',
				$wrapper : 'input'
			},
			toggleOptions : {},
			name : ''
		};
		super($Util.opts(defaults, options));

		// redirect jquery dom events to container
		this.after = this._after;
		this.append = this._append;
		this.appendTo = this._appendTo;
		this.before = this._before;
		this.prepend = this._prepend;
		this.prependTo = this._prependTo;

		return this;
	}

	/**
	 * Build a bootstrap toggle
	 * @returns {BootstrapToggle}
	 * @private
	 */
	_useDefaultTemplate(){
		this.$wrapper = $('<input type="checkbox" name="'+this.settings.name+'"/>"')
			.appendTo('body')
			.bootstrapToggle(this.settings.toggleOptions);

		// bootstrap toggle has created some new DOM
		// with the <input> inside an element. Grab that
		this.$container = this.$wrapper.parent();

		return this;
	}

	// jquery redirects
	_after(){
		this.$container.after(...arguments);
		return this;
	}
	_append(){
		this.$container.append(...arguments);
		return this;
	}
	_appendTo(){
		this.$container.appendTo(...arguments);
		return this;
	}
	_before(){
		this.$container.before(...arguments);
		return this;
	}
	_prepend(){
		this.$container.prepend(...arguments);
		return this;
	}
	_prependTo(){
		this.$container.prependTo(...arguments);
		return this;
	}
}


/*!
 * bootstrapFeedback
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Feedback template styled with bootstrap
 * @extends Feedback
 */
class BootstrapFeedback extends Feedback {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {BootstrapFeedback}
	 */
	constructor(options){
		super(options);
		var self = this;

		this.$close.click(function(){
			self.slideUp();
		});

		return this;
	}

	/**
	 * Use the default template and
	 * add an alert class to the feedback
	 * @returns {BootstrapFeedback}
	 * @private
	 */
	_useDefaultTemplate(){
		super._useDefaultTemplate();

		// redo the close button
		var $close = $('<a href="#" class="close" aria-label="close">&times;</a>');
		this.$close.replaceWith($close);
		this.$close = $close;

		this.$wrapper.addClass('alert');

		return this;
	}

	/**
	 * Set the class using of the feedback
	 * Automatically removes other "alert-" classes
	 * and prepends "alert-" to the new class
	 * @param {string} cls - the alert- bootstrap class to set
	 * @returns {BootstrapFeedback}
	 */
	_setClass(cls){
		this.removeClass (function (index, css) {
			return (css.match (/(^|\s)alert-\S+/g) || []).join(' ');
		});
		if('alert-'.indexOf(cls) === -1)
			cls = 'alert-' + cls;
		this.addClass(cls);
		return this;
	}

	/**
	 * Set the feedback elegantly
	 * @param {string} cls - wrapper class to set
	 * @param {jQuery|string} text - text to show
	 * @param {jQuery|string} [icon] - icon to show.
	 * If not passed, uses a default glyphicon
	 * @returns {Feedback}
	 */
	_animateFeedback(cls, text, icon){
		var $icon = icon ? icon : '<span class="glyphicon ' + BootstrapFeedback.icon[cls] + '"></span>';
		this._setClass(cls);
		this.$text.fadeOut(function(){
			$(this).html(text).fadeIn();
		});
		this.$icon.fadeOut(function(){
			$(this).html($icon).fadeIn();
		});

		return this;
	}

	/**
	 * Set the feedback and show the wrapper if it is hidden
	 * @param {string} cls - wrapper class to set
	 * @param {jQuery|string} text - text to show
	 * @param {jQuery|string} [icon] - icon to show
	 * @returns {Feedback}
	 */
	setFeedback(cls, text, icon){
		if(this.is(':hidden')){
			var $icon = icon ? icon : '<span class="glyphicon ' + BootstrapFeedback.icon[cls] + '"></span>';
			this._setClass(cls);
			this.$text.html(text);
			if(icon){
				this.$icon.html($icon);
			}
			this.slideDown();
		}
		else {
			this._animateFeedback(cls, text, icon);
		}

		return this;
	}
}

BootstrapFeedback.icon = {
	danger : 'glyphicon-remove-sign',
	success : 'glyphicon-ok-sign',
	warning : 'glyphicon-exclamation-sign',
	info : 'glyphicon-info-sign',
	processing : 'glyphicon-refresh glyphicon-refresh-spin'
};
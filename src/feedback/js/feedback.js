/*!
 * feedback
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Feedback template
 * @extends Template
 */
class Feedback extends Template {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$wrapper='.feedback']
	 * @param {string} [options.struct.$text='.feedback-text']
	 * @param {string} [options.struct.$icon='.feedback-icon']
	 * @param {string} [options.struct.$close='button[name="close"]']
	 * @returns {Feedback}
	 */
	constructor(options){
		var defaults = {
			closeButton : true,
			struct : {
				$wrapper : '.feedback',
				$text : '.feedback-text',
				$icon : '.feedback-icon',
				$close : 'button[name="close"]'
			}
		};
		super($Util.opts(defaults, options));
		var self = this;

		if(this.settings.closeButton){
			this.$close.click(function(){
				self.slideUp();
			});
		}

		return this;
	}

	/**
	 * Default feedback template
	 * @returns {Feedback}
	 * @private
	 */
	_useDefaultTemplate(){
		var template =
			'<div class="feedback">' +
				'<span class="feedback-icon"></span>' +
				'<span class="feedback-text"></span>';

		if(this.settings.closeButton){
			template += '<button name="close" type="button">X</button>';
		}

		template += '</div>';

		this._useTemplate($(template));

		this.$wrapper.hide();
		return this;
	}

	/**
	 * Set the class of the feedback.
	 * Automatically removes other "feedback-" classes
	 * and prepends "feedback-" to the new class
	 * @param {string} cls - the feedback- class to set
	 * @returns {Feedback}
	 */
	_setClass(cls){
		this.removeClass (function (index, css) {
			return (css.match (/(^|\s)feedback-\S+/g) || []).join(' ');
		});
		if('feedback-'.indexOf(cls) === -1)
			cls = 'feedback-' + cls;
		this.addClass(cls);
		return this;
	}

	/**
	 * Set the feedback with animation
	 * @param {string} cls - wrapper class to set
	 * @param {jQuery|string} text - text to show
	 * @param {jQuery|string} [icon] - icon to show
	 * @returns {Feedback}
	 */
	_animateFeedback(cls, text, icon){
		this._setClass(cls);
		this.$text.fadeOut(function(){
			$(this).html(text).fadeIn();
		});
		if(icon){
			this.$icon.fadeOut(function(){
				$(this).html(icon).fadeIn();
			});
		}
		return this;
	}

	/**
	 * Set the feedback and show the wrapper if
	 * it is hidden, or animate it if it is changing
	 * @param {string} cls - wrapper class to set
	 * @param {jQuery|string} text - text to show
	 * @param {jQuery|string} [icon] - icon to show
	 * @returns {Feedback}
	 */
	setFeedback(cls, text, icon){
		if(this.is(':hidden')){
			this._setClass(cls);
			this.$text.html(text);
			if(icon){
				this.$icon.html(icon);
			}
			this.slideDown();
		}
		else {
			this._animateFeedback(cls, text, icon);
		}

		return this;
	}
}
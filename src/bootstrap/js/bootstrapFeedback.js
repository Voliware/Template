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

		if(this.settings.closeButton){
			this.$close.click(function(){
				self.slideUp();
			});
		}

		return this;
	}

	/**
	 * Use the default template and
	 * add an alert class to the feedback
	 * @returns {BootstrapFeedback}
	 * @private
	 */
	_useDefaultTemplate(){
		var template = '';
		var feedbackWrapper = '';
		var feedbackContainer = '';
		var closeContainer = '';
		var noCloseContainer = '';

		if(BOOTSTRAP_VERSION === 4){
			feedbackWrapper = '<div class="feedback alert row v4">';
			feedbackContainer = '<div class="offset-1 col-10">';
			closeContainer = '<div class="col-1">';
			noCloseContainer = '<div class="col-12">';
		}
		else {
			feedbackWrapper = '<div class="feedback alert clearfix">';
			feedbackContainer = '<div class="col-xs-offset-1 col-xs-10">';
			closeContainer = '<div class="col-xs-1">';
			noCloseContainer = '<div class="col-xs-12">';
		}
		
		if(this.settings.closeButton){
			template =
				feedbackWrapper +
					feedbackContainer +
						'<div class="feedback-icon"></div>' +
						'<div class="feedback-text"></div>' +
					'</div>' +
					closeContainer +
						'<button type="button" name="close" class="close">&times;</button>' +
					'</div>' +
				'</div>';
		}
		else {
			template =
				'<div class="feedback alert clearfix">' +
					noCloseContainer +
						'<div class="feedback-icon"></div>' +
						'<div class="feedback-text"></div>' +
					'</div>' +
				'</div>';
		}

		this._useTemplate($(template));
		this.$wrapper.hide();
		return this;
	}

	/**
	 * Create a default icon based on feedback class
	 * @param {string} cls - the alert- bootstrap class to set
	 * @returns {string}
	 * @private
	 */
	_createDefaultIcon(cls){
                // special case for processing spinner
                if(cls === 'processing'){
                    return BootstrapFeedback.icon.processing;
                }
		return '<span class="glyphicon ' + BootstrapFeedback.icon[cls] + '"></span>';
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
	 * Set the feedback icon
	 * @param {*} $icon
	 * @returns {BootstrapFeedback}
	 * @private
	 */
	_setIcon($icon){
		this.$icon.html($icon);
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
		var $icon = icon ? icon : this._createDefaultIcon(cls);
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
			var $icon = icon ? icon : this._createDefaultIcon(cls);
			this._setClass(cls);
			this.$text.html(text);
			this.$icon.html($icon);
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
	processing : '<div class="cssload-container"><div class="cssload-speeding-wheel"></div></div>'
};
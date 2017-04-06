'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*!
 * feedback
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Feedback template
 * @extends Template
 */
var Feedback = function (_Template) {
	_inherits(Feedback, _Template);

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
	function Feedback(options) {
		var _ret;

		_classCallCheck(this, Feedback);

		var defaults = {
			closeButton: true,
			struct: {
				$wrapper: '.feedback',
				$text: '.feedback-text',
				$icon: '.feedback-icon',
				$close: 'button[name="close"]'
			}
		};

		var _this = _possibleConstructorReturn(this, (Feedback.__proto__ || Object.getPrototypeOf(Feedback)).call(this, $Util.opts(defaults, options)));

		var self = _this;

		if (_this.settings.closeButton) {
			_this.$close.click(function () {
				self.slideUp();
			});
		}

		return _ret = _this, _possibleConstructorReturn(_this, _ret);
	}

	/**
  * Default feedback template
  * @returns {Feedback}
  * @private
  */


	_createClass(Feedback, [{
		key: '_useDefaultTemplate',
		value: function _useDefaultTemplate() {
			var template = '<div class="feedback">' + '<span class="feedback-icon"></span>' + '<span class="feedback-text"></span>';

			if (this.settings.closeButton) {
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

	}, {
		key: '_setClass',
		value: function _setClass(cls) {
			this.removeClass(function (index, css) {
				return (css.match(/(^|\s)feedback-\S+/g) || []).join(' ');
			});
			if ('feedback-'.indexOf(cls) === -1) cls = 'feedback-' + cls;
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

	}, {
		key: '_animateFeedback',
		value: function _animateFeedback(cls, text, icon) {
			this._setClass(cls);
			this.$text.fadeOut(function () {
				$(this).html(text).fadeIn();
			});
			if (icon) {
				this.$icon.fadeOut(function () {
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

	}, {
		key: 'setFeedback',
		value: function setFeedback(cls, text, icon) {
			if (this.is(':hidden')) {
				this._setClass(cls);
				this.$text.html(text);
				if (icon) {
					this.$icon.html(icon);
				}
				this.slideDown();
			} else {
				this._animateFeedback(cls, text, icon);
			}

			return this;
		}
	}]);

	return Feedback;
}(Template);
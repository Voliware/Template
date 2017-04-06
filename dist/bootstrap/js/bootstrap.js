'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*!
 * bootstrap
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

(function ($) {

	/**
  * Turns an input group's addon into a
  * button that reveals a help dialog.
  * Place '<div class="input-help"></div>'
  * AFTER a '<div class="input-group"></div>'
  */
	$.fn.inputHelp = function () {
		return this.each(function () {
			var $this = $(this);
			var $group = $this.prev('.input-group');
			$group.find('.input-group-addon-help').click(function () {
				$this.slideToggle();
			});
		});
	};

	/**
  * Makes tabs responsive in responsive mode
  * http://jsbin.com/befiqofemu
  */
	$.fn.responsiveTabs = function () {

		return this.each(function () {
			var $this = $(this);

			$this.addClass('responsive-tabs');
			$this.append($('<span class="glyphicon glyphicon-triangle-bottom"></span>'));
			$this.append($('<span class="glyphicon glyphicon-triangle-top"></span>'));

			$this.on('click', 'li.active > a, span.glyphicon', function () {
				this.toggleClass('open');
			}.bind($this));

			$this.on('click', 'li:not(.active) > a', function () {
				this.removeClass('open');
			}.bind($this));
		});
	};
})(jQuery);
/*!
 * bootstrapControlTable
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Control table with bootstrap buttons
 * @extends ControlTable
 */

var BootstrapControlTable = function (_ControlTable) {
	_inherits(BootstrapControlTable, _ControlTable);

	/**
  * Constructor
  * @param {object} [options]
  * @returns {BootstrapControlTable}
  */
	function BootstrapControlTable(options) {
		var _ret;

		_classCallCheck(this, BootstrapControlTable);

		var _this = _possibleConstructorReturn(this, (BootstrapControlTable.__proto__ || Object.getPrototypeOf(BootstrapControlTable)).call(this, options));

		return _ret = _this, _possibleConstructorReturn(_this, _ret);
	}

	/**
  * Create a delete button
  * @param {object} data
  * @returns {jQuery}
  * @private
  */


	_createClass(BootstrapControlTable, [{
		key: '_createDeleteButton',
		value: function _createDeleteButton(data) {
			var $btn = _get(BootstrapControlTable.prototype.__proto__ || Object.getPrototypeOf(BootstrapControlTable.prototype), '_createDeleteButton', this).call(this, data);
			$btn.addClass('btn btn-default');
			$btn.html('<span class="glyphicon glyphicon-trash"></span>');
			return $btn;
		}

		/**
   * Create an update button
   * @param {object} data
   * @returns {jQuery}
   * @private
   */

	}, {
		key: '_createUpdateButton',
		value: function _createUpdateButton(data) {
			var $btn = _get(BootstrapControlTable.prototype.__proto__ || Object.getPrototypeOf(BootstrapControlTable.prototype), '_createUpdateButton', this).call(this, data);
			$btn.addClass('btn btn-default');
			$btn.html('<span class="glyphicon glyphicon-edit"></span>');
			return $btn;
		}

		/**
   * Create a view button
   * @param {object} data
   * @returns {jQuery}
   * @private
   */

	}, {
		key: '_createViewButton',
		value: function _createViewButton(data) {
			var $btn = _get(BootstrapControlTable.prototype.__proto__ || Object.getPrototypeOf(BootstrapControlTable.prototype), '_createViewButton', this).call(this, data);
			$btn.addClass('btn btn-default');
			$btn.html('<span class="glyphicon glyphicon-info-sign"></span>');
			return $btn;
		}
	}]);

	return BootstrapControlTable;
}(ControlTable);
/*!
 * bootstrapFeedback
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Feedback template styled with bootstrap
 * @extends Feedback
 */


var BootstrapFeedback = function (_Feedback) {
	_inherits(BootstrapFeedback, _Feedback);

	/**
  * Constructor
  * @param {object} [options]
  * @returns {BootstrapFeedback}
  */
	function BootstrapFeedback(options) {
		var _ret2;

		_classCallCheck(this, BootstrapFeedback);

		var _this2 = _possibleConstructorReturn(this, (BootstrapFeedback.__proto__ || Object.getPrototypeOf(BootstrapFeedback)).call(this, options));

		var self = _this2;

		if (_this2.settings.closeButton) {
			_this2.$close.click(function () {
				self.slideUp();
			});
		}

		return _ret2 = _this2, _possibleConstructorReturn(_this2, _ret2);
	}

	/**
  * Use the default template and
  * add an alert class to the feedback
  * @returns {BootstrapFeedback}
  * @private
  */


	_createClass(BootstrapFeedback, [{
		key: '_useDefaultTemplate',
		value: function _useDefaultTemplate() {
			var template = '';
			if (this.settings.closeButton) {
				template = '<div class="feedback alert clearfix">' + '<div class="col-xs-10">' + '<div class="feedback-icon"></div>' + '<div class="feedback-text"></div>' + '</div>' + '<div class="col-xs-2">' + '<button type="button" name="close" class="close">&times;</button>' + '</div>' + '</div>';
			} else {
				template = '<div class="feedback alert clearfix">' + '<div class="col-xs-12">' + '<div class="feedback-icon"></div>' + '<div class="feedback-text"></div>' + '</div>' + '</div>';
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

	}, {
		key: '_createDefaultIcon',
		value: function _createDefaultIcon(cls) {
			return '<span class="glyphicon ' + BootstrapFeedback.icon[cls] + '"></span>';
		}

		/**
   * Set the class using of the feedback
   * Automatically removes other "alert-" classes
   * and prepends "alert-" to the new class
   * @param {string} cls - the alert- bootstrap class to set
   * @returns {BootstrapFeedback}
   */

	}, {
		key: '_setClass',
		value: function _setClass(cls) {
			this.removeClass(function (index, css) {
				return (css.match(/(^|\s)alert-\S+/g) || []).join(' ');
			});
			if ('alert-'.indexOf(cls) === -1) cls = 'alert-' + cls;
			this.addClass(cls);
			return this;
		}

		/**
   * Set the feedback icon
   * @param {*} $icon
   * @returns {BootstrapFeedback}
   * @private
   */

	}, {
		key: '_setIcon',
		value: function _setIcon($icon) {
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

	}, {
		key: '_animateFeedback',
		value: function _animateFeedback(cls, text, icon) {
			var $icon = icon ? icon : this._createDefaultIcon(cls);
			this._setClass(cls);
			this.$text.fadeOut(function () {
				$(this).html(text).fadeIn();
			});
			this.$icon.fadeOut(function () {
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

	}, {
		key: 'setFeedback',
		value: function setFeedback(cls, text, icon) {
			if (this.is(':hidden')) {
				var $icon = icon ? icon : this._createDefaultIcon(cls);
				this._setClass(cls);
				this.$text.html(text);
				this.$icon.html($icon);
				this.slideDown();
			} else {
				this._animateFeedback(cls, text, icon);
			}

			return this;
		}
	}]);

	return BootstrapFeedback;
}(Feedback);

BootstrapFeedback.icon = {
	danger: 'glyphicon-remove-sign',
	success: 'glyphicon-ok-sign',
	warning: 'glyphicon-exclamation-sign',
	info: 'glyphicon-info-sign',
	processing: 'glyphicon-refresh glyphicon-refresh-spin'
};
/*!
 * bootstrapForm
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * A form with bootstrap feedback
 * @extends Form
 */

var BootstrapForm = function (_Form) {
	_inherits(BootstrapForm, _Form);

	/**
  * Constructor
  * @param {object} options
  * @returns {BootstrapForm}
  */
	function BootstrapForm(options) {
		var _ret3;

		_classCallCheck(this, BootstrapForm);

		var _this3 = _possibleConstructorReturn(this, (BootstrapForm.__proto__ || Object.getPrototypeOf(BootstrapForm)).call(this, options));

		return _ret3 = _this3, _possibleConstructorReturn(_this3, _ret3);
	}

	/**
  * Setup the feedback
  * @returns {Form}
  * @private
  */


	_createClass(BootstrapForm, [{
		key: '_setupFeedback',
		value: function _setupFeedback() {
			this.feedback = new BootstrapFeedback();
			if (!this.$feedback.length) {
				this.$feedback = $('<div class="form-feedback"></div>');
				this.$form.prepend(this.$feedback);
			}
			this.$feedback.html(this.feedback.$wrapper);
			return this;
		}
	}]);

	return BootstrapForm;
}(Form);
/*!
 * bootstrapModal
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Template for a bootstrap modal
 * @extends Template
 */


var BootstrapModal = function (_Template) {
	_inherits(BootstrapModal, _Template);

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
	function BootstrapModal(options) {
		var _ret4;

		_classCallCheck(this, BootstrapModal);

		var defaults = {
			struct: {
				$wrapper: '.modal',
				$dialog: '.modal-dialog',
				$content: '.modal-content',
				$header: '.modal-header',
				$title: '.modal-title',
				$body: '.modal-body',
				$footer: '.modal-footer',
				$close: 'button.close'
			}
		};

		var _this4 = _possibleConstructorReturn(this, (BootstrapModal.__proto__ || Object.getPrototypeOf(BootstrapModal)).call(this, $Util.opts(defaults, options)));

		return _ret4 = _this4, _possibleConstructorReturn(_this4, _ret4);
	}

	/**
  * Create a default template
  * @returns {BootstrapModal}
  * @private
  */


	_createClass(BootstrapModal, [{
		key: '_useDefaultTemplate',
		value: function _useDefaultTemplate() {
			var template = '<div class="modal fade">' + '<div class="modal-dialog" role="document">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' + '<span aria-hidden="true">&times;</span>' + '</button>' + '<h4 class="modal-title"></h4>' + '</div>' + '<div class="modal-body"></div>' + '<div class="modal-footer"></div>' + '</div>' + '</div>' + '</div>';

			this._useTemplate($(template));

			$('body').append(this.$wrapper);

			return this;
		}
	}]);

	return BootstrapModal;
}(Template);
/*!
 * bootstrapNav
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates a bootstrap nav
 * @extends Template
 */


var BootstrapNav = function (_Template2) {
	_inherits(BootstrapNav, _Template2);

	/**
  * Constructor
  * @param {object} [options]
  * @param {object} [options.struct]
  * @param {string} [options.struct.$wrapper=".tab-pane"]
  * @param {string} [options.struct.$link="a"]
  * @returns {BootstrapNav}
  */
	function BootstrapNav(options) {
		var _ret5;

		_classCallCheck(this, BootstrapNav);

		var defaults = {
			struct: {
				$wrapper: 'li',
				$link: 'a'
			}
		};

		var _this5 = _possibleConstructorReturn(this, (BootstrapNav.__proto__ || Object.getPrototypeOf(BootstrapNav)).call(this, $Util.opts(defaults, options)));

		return _ret5 = _this5, _possibleConstructorReturn(_this5, _ret5);
	}

	/**
  * Build default BootstrapNav
  * @returns {BootstrapNav}
  * @private
  */


	_createClass(BootstrapNav, [{
		key: '_useDefaultTemplate',
		value: function _useDefaultTemplate() {
			var template = '<li>' + '<a data-toggle="tab" href="#"></a>' + '</li>';

			this._useTemplate($(template));

			return this;
		}

		/**
   * Populate the href and html
   * @param {object} data
   * @param {number|string} data.href
   * @param {jQuery|string} [data.html]
   * @returns {BootstrapNav}
   */

	}, {
		key: 'populateChildren',
		value: function populateChildren(data) {
			this.$link.attr('href', '#' + data.href);
			if (data.html) this.$link.html(data.html);
			return this;
		}

		/**
   * Set the tab to active by
   * running click() event on it
   * @returns {BootstrapNav}
   */

	}, {
		key: 'setActive',
		value: function setActive() {
			this.$link.click();
			return this;
		}
	}]);

	return BootstrapNav;
}(Template);
/*!
 * bootstrapNavManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Manages bootstrap navs
 * @extends TemplateManager
 */


var BootstrapNavManager = function (_TemplateManager) {
	_inherits(BootstrapNavManager, _TemplateManager);

	/**
  * Constructor
  * @param {object} [options]
  * @param {object} [options.template=BootstrapNav]
  * @param {jQuery} [options.$wrapper=$('<div class="nav nav-tabs"></div>')] - manager wrapper
  * @returns {BootstrapNavManager}
  */
	function BootstrapNavManager(options) {
		var _ret6;

		_classCallCheck(this, BootstrapNavManager);

		var defaults = {
			$wrapper: $('<ul class="nav nav-tabs"></ul>'),
			template: BootstrapNav
		};

		// alias
		var _this6 = _possibleConstructorReturn(this, (BootstrapNavManager.__proto__ || Object.getPrototypeOf(BootstrapNavManager)).call(this, $Util.opts(defaults, options)));

		_this6.navs = _this6.objects;
		return _ret6 = _this6, _possibleConstructorReturn(_this6, _ret6);
	}

	/**
  * Create and add a new Nav
  * @param {string} id - id of the object to create and then manage
  * @param {object} data
  * @param {object} data.href - href for the nav
  * @param {object} [data.html] - html for the nav
  * @returns {BootstrapNav}
  * @private
  */


	_createClass(BootstrapNavManager, [{
		key: '_create',
		value: function _create(id, data) {
			if (!isDefined(data) || !isDefined(data.href)) throw new ReferenceError("BootstrapNavManager.create: an 'href' property is required to create a Nav");else return _get(BootstrapNavManager.prototype.__proto__ || Object.getPrototypeOf(BootstrapNavManager.prototype), '_create', this).call(this, id, data);
		}

		/**
   * Get the first nav
   * @returns {jQuery}
   */

	}, {
		key: 'getFirst',
		value: function getFirst() {
			return $(this.$wrapper.find('a').get(0));
		}
	}]);

	return BootstrapNavManager;
}(TemplateManager);
/*!
 * bootstrapPanel
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Template for bootstrap panels
 * @extends Template
 */


var BootstrapPanel = function (_Template3) {
	_inherits(BootstrapPanel, _Template3);

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
	function BootstrapPanel(options) {
		var _ret7;

		_classCallCheck(this, BootstrapPanel);

		var defaults = {
			closeable: false,
			collapsible: false,
			struct: {
				$wrapper: '.panel',
				$header: '.panel-heading',
				$title: '.panel-title',
				$collapse: '.panel-collapse',
				$close: '.panel-close',
				$body: '.panel-body',
				$content: '.panel-content',
				$footer: '.panel-footer'
			}
		};

		var _this7 = _possibleConstructorReturn(this, (BootstrapPanel.__proto__ || Object.getPrototypeOf(BootstrapPanel)).call(this, $Util.opts(defaults, options)));

		var self = _this7;

		// properties
		_this7.isCollapsed = false;
		_this7.isClosed = false;

		// handlers
		if (_this7.settings.closeable) {
			_this7.$close.click(function (e) {
				e.stopPropagation();
				self._onClose();
				self.trigger('close');
			});
		}
		if (_this7.settings.collapsible) {
			_this7.$header.click(function () {
				self._collapse();
				self.trigger('collapse');
			});
		}

		return _ret7 = _this7, _possibleConstructorReturn(_this7, _ret7);
	}

	/**
  * Creates a default template
  * @returns {BootstrapPanel}
  * @private
  */


	_createClass(BootstrapPanel, [{
		key: '_useDefaultTemplate',
		value: function _useDefaultTemplate() {
			var template = '<div class="panel panel-default">' + '<div class="panel-heading clearfix">' + '<h4 class="panel-title"></h4>' + '<a href="#" class="close panel-close" aria-label="close">&times;</a>' + '<a href="#" class="panel-collapse glyphicon glyphicon-chevron-up" aria-label="collapse"></a>' + '</div>' + '<div class="panel-content collapse in">' + '<div class="panel-body"></div>' + '</div>' + '<div class="panel-footer"></div>' + '</div>';

			this._useTemplate($(template));

			if (!this.settings.closeable) this.$close.remove();
			if (!this.settings.collapsible) this.$collapse.remove();

			return this;
		}

		/**
   * Collapse the panel
   * @returns {BootstrapPanel}
   * @private
   */

	}, {
		key: '_collapse',
		value: function _collapse() {
			this.isCollapsed = !this.isCollapsed;
			this.$content.collapse("toggle");
			this.$collapse.toggleClass('glyphicon-chevron-up glyphicon-chevron-down');
			return this;
		}

		/**
   * On close handler
   * @returns {BootstrapPanel}
   * @private
   */

	}, {
		key: '_onClose',
		value: function _onClose() {
			this.isClosed = !this.isClosed;
			this.slideUp();
			return this;
		}
	}]);

	return BootstrapPanel;
}(Template);
/*!
 * bootstrapPanelManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Manages panels
 * @extends TemplateManager
 */


var BootstrapPanelManager = function (_TemplateManager2) {
	_inherits(BootstrapPanelManager, _TemplateManager2);

	/**
  * Constructor
  * @param {object} [options]
  * @param {object} [options.template=Panel]
  * @param {jQuery} [options.$wrapper='$(<div class="panel-group"></div>}'] - manager wrapper
  * @returns {BootstrapPanelManager}
  */
	function BootstrapPanelManager(options) {
		var _ret8;

		_classCallCheck(this, BootstrapPanelManager);

		var defaults = {
			$wrapper: $('<div class="panel-group"></div>'),
			template: BootstrapPanel
		};

		// alias
		var _this8 = _possibleConstructorReturn(this, (BootstrapPanelManager.__proto__ || Object.getPrototypeOf(BootstrapPanelManager)).call(this, $Util.opts(defaults, options)));

		_this8.panels = _this8.objects;

		return _ret8 = _this8, _possibleConstructorReturn(_this8, _ret8);
	}

	return BootstrapPanelManager;
}(TemplateManager);
/*!
 * bootstrapProgress
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Template for bootstrap progress bar
 * @extends Template
 */


var BootstrapProgress = function (_Template4) {
	_inherits(BootstrapProgress, _Template4);

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
	function BootstrapProgress(options) {
		var _ret9;

		_classCallCheck(this, BootstrapProgress);

		var defaults = {
			struct: {
				$wrapper: '.progress-wrapper',
				$progress: '.progress',
				$bar: '.progress-bar',
				$percent: '.progress-percent'
			},
			showPercent: true
		};

		var _this9 = _possibleConstructorReturn(this, (BootstrapProgress.__proto__ || Object.getPrototypeOf(BootstrapProgress)).call(this, $Util.opts(defaults, options)));

		_this9.percent = 0;

		return _ret9 = _this9, _possibleConstructorReturn(_this9, _ret9);
	}

	/**
  * Create a default template
  * @returns {BootstrapProgress}
  * @private
  */


	_createClass(BootstrapProgress, [{
		key: '_useDefaultTemplate',
		value: function _useDefaultTemplate() {
			var template = '<div class="progress-wrapper">' + '<div class="progress">' + '<div class="progress-bar"></div>' + '<div class="progress-percent"></div>' + '</div>' + '</div>';

			this._useTemplate($(template));

			if (!this.settings.showPercent) this.$percent.remove();

			return this;
		}

		/**
   * Set the percent text
   * @param {number} percent
   * @returns {BootstrapProgress}
   * @private
   */

	}, {
		key: '_setPercent',
		value: function _setPercent(percent) {
			this.percent = Math.floor(percent);
			this.$percent.html(percent + "%");
			this.$percent.toggleClass('progress-percent-white', percent > 50);
			this._centerPercent();
			return this;
		}

		/**
   * Center the percent text
   * @returns {BootstrapProgress}
   * @private
   */

	}, {
		key: '_centerPercent',
		value: function _centerPercent() {
			// 20 px is approx the text sie of "0%"
			var w = this.$percent.width() || 20;
			this.$percent.css('margin-left', w / 2 * -1 + "px");
			return this;
		}

		/**
   * Set the progress of the bar
   * @param {number} percent
   * @returns {BootstrapProgress}
   */

	}, {
		key: 'setProgress',
		value: function setProgress(percent) {
			percent = Math.floor(percent);
			this.$bar.css('width', percent + "%");
			this.$bar.toggleClass('progress-bar-success', percent === 100);
			if (this.settings.showPercent) this._setPercent(percent);
			return this;
		}
	}]);

	return BootstrapProgress;
}(Template);
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


var BootstrapLoader = function (_BootstrapProgress) {
	_inherits(BootstrapLoader, _BootstrapProgress);

	/**
  * Constructor
  * @param {object} options
  * @param {object[]} options.steps - an array of steps. A step is a simple
  * object with a 'text' and 'err' property that are simple strings
  * @param {object} [options.struct]
  * @param {string} [options.struct.$wrapper='.loader'] - the loader wrapper
  * @param {string} [options.struct.$progressWrapper='.progress'] - the progress wrapper
  * @param {string} [options.struct.$container='.loader-container'] - the progress bar container
  * @param {string} [options.struct.$text='.loader-text'] - the loader text
  * @returns {BootstrapLoader}
  */
	function BootstrapLoader(options) {
		var _ret10;

		_classCallCheck(this, BootstrapLoader);

		var defaults = {
			struct: {
				$wrapper: '.loader',
				$container: '.loader-container',
				$text: '.loader-text'
			},
			steps: []
		};

		// properties
		var _this10 = _possibleConstructorReturn(this, (BootstrapLoader.__proto__ || Object.getPrototypeOf(BootstrapLoader)).call(this, $Util.opts(defaults, options)));

		_this10.stepCount = _this10.settings.steps.length;
		_this10.step = 0;

		return _ret10 = _this10, _possibleConstructorReturn(_this10, _ret10);
	}

	/**
  * Create a default template
  * @returns {BootstrapLoader}
  * @private
  */


	_createClass(BootstrapLoader, [{
		key: '_useDefaultTemplate',
		value: function _useDefaultTemplate() {
			var template = '<div class="loader" id="pageLoader">' + '<div class="loader-container">' + '<div class="loader-text"></div>' + '<div class="progress">' + '<div class="progress-bar"></div>' + '<div class="progress-percent"></div>' + '</div>' + '</div>' + '</div>';

			this._useTemplate($(template));

			return this;
		}

		/**
   * Get a step object from
   * its index in the steps array
   * @param {number} id
   * @returns {error|object}
   * @private
   */

	}, {
		key: '_getStep',
		value: function _getStep(id) {
			if (this.settings.steps.length > 0 && this.settings.steps[id]) return this.settings.steps[id];else throw new RangeError("BootstrapLoader.getStep: step not found in steps array");
		}

		/**
   * Get the percent of the loader
   * based on the step index
   * @param {number} id
   * @returns {number}
   */

	}, {
		key: 'getPercent',
		value: function getPercent(id) {
			return (id + 1) / this.stepCount * 100;
		}

		/**
   * Set the progress of the loader
   * @param {number} percent
   * @returns {BootstrapLoader}
   */

	}, {
		key: 'setProgress',
		value: function setProgress(percent) {
			_get(BootstrapLoader.prototype.__proto__ || Object.getPrototypeOf(BootstrapLoader.prototype), 'setProgress', this).call(this, percent);
			this.$text.toggleClass('success', percent === 100);
			return this;
		}

		/**
   * Set the text of the loader
   * @param {string} text
   * @returns {BootstrapLoader}
   */

	}, {
		key: 'setText',
		value: function setText(text) {
			this.$text.html(text);
			return this;
		}

		/**
   * Move the loader to a step
   * @param {number} id - step index
   * @returns {BootstrapLoader}
   */

	}, {
		key: 'setStep',
		value: function setStep(id) {
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

	}, {
		key: 'setErr',
		value: function setErr() {
			var arg = arguments ? arguments[0] : null;
			var step;

			// arg is a step id
			if (isNumber(arg)) {
				step = this._getStep(arg);
				this.setText(step.err);
			}

			// arg is a string
			if (isString(arg)) this.setText(arg);

			// no arg
			if (isNull(arg)) {
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

	}, {
		key: 'goStart',
		value: function goStart() {
			this.setStep(0);
			return this;
		}

		/**
   * Move to the next step
   * @returns {BootstrapLoader}
   */

	}, {
		key: 'goNext',
		value: function goNext() {
			var id = this.step + 1;
			this.setStep(id);
			return this;
		}

		/**
   * Move to the previous step
   * @returns {BootstrapLoader}
   */

	}, {
		key: 'goPrev',
		value: function goPrev() {
			var id = this.step - 1;
			if (id > 0) this.setStep(id);
			return this;
		}

		/**
   * Move to the last step
   * @returns {BootstrapLoader}
   */

	}, {
		key: 'goEnd',
		value: function goEnd() {
			var id = this.stepCount - 1;
			this.setStep(id);
			return this;
		}
	}]);

	return BootstrapLoader;
}(BootstrapProgress);
/*!
 * bootstrapTab
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates a bootstrap tab
 * @extends Template
 */


var BootstrapTab = function (_Template5) {
	_inherits(BootstrapTab, _Template5);

	/**
  * Constructor
  * @param {object} [options]
  * @param {object} [options.struct]
  * @param {string} [options.struct.$wrapper=".tab-pane"] - the tab class
  * @returns {BootstrapTab}
  */
	function BootstrapTab(options) {
		var _ret11;

		_classCallCheck(this, BootstrapTab);

		var defaults = {
			struct: {
				$wrapper: '.tab-pane'
			}
		};

		var _this11 = _possibleConstructorReturn(this, (BootstrapTab.__proto__ || Object.getPrototypeOf(BootstrapTab)).call(this, $Util.opts(defaults, options)));

		return _ret11 = _this11, _possibleConstructorReturn(_this11, _ret11);
	}

	/**
  * Default template
  * @returns {BootstrapTab}
  * @private
  */


	_createClass(BootstrapTab, [{
		key: '_useDefaultTemplate',
		value: function _useDefaultTemplate() {
			this.$wrapper = $('<div class="tab-pane fade"></div>');
			return this;
		}

		/**
   * Populate the id and html
   * @param {object} data
   * @param {number|string} data.id
   * @param {jQuery|string} [data.html]
   * @returns {BootstrapTab}
   */

	}, {
		key: 'populateChildren',
		value: function populateChildren(data) {
			this.attr('id', data.id);
			if (data.html) this.html(data.html);
			return this;
		}
	}]);

	return BootstrapTab;
}(Template);
/*!
 * bootstrapTabManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Manages bootstrap tabs
 * @extends TemplateManager
 */


var BootstrapTabManager = function (_TemplateManager3) {
	_inherits(BootstrapTabManager, _TemplateManager3);

	/**
  * Constructor
  * @param {object} options
  * @param {object} [options.template=BootstrapTab]
  * @param {jQuery} [options.$wrapper=$('<div class="tab-content"></div>')] - manager wrapper
  * @returns {BootstrapTabManager}
  */
	function BootstrapTabManager(options) {
		var _ret12;

		_classCallCheck(this, BootstrapTabManager);

		var defaults = {
			$wrapper: $('<div class="tab-content"></div>'),
			template: BootstrapTab
		};

		// alias
		var _this12 = _possibleConstructorReturn(this, (BootstrapTabManager.__proto__ || Object.getPrototypeOf(BootstrapTabManager)).call(this, $Util.opts(defaults, options)));

		_this12.tabs = _this12.objects;
		return _ret12 = _this12, _possibleConstructorReturn(_this12, _ret12);
	}

	/**
  * Create and add a new Tab
  * @param {string} id - id of the object to create and then manage
  * @param {object} data
  * @param {number|string} data.id
  * @param {jQuery|string} [data.html]
  * @returns {BootstrapNav}
  * @private
  */


	_createClass(BootstrapTabManager, [{
		key: '_create',
		value: function _create(id, data) {
			if (!isDefined(data) || !isDefined(data.id)) throw new ReferenceError("BootstrapTabManager.create: an 'id' property is required to create a Tab");else return _get(BootstrapTabManager.prototype.__proto__ || Object.getPrototypeOf(BootstrapTabManager.prototype), '_create', this).call(this, id, data);
		}

		/**
   * Get the first tab in the wrapper
   * @returns {jQuery}
   */

	}, {
		key: 'getFirst',
		value: function getFirst() {
			return $(this.$wrapper.find('.tab-pane').get(0));
		}
	}]);

	return BootstrapTabManager;
}(TemplateManager);
/*!
 * bootstrapToggle
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates a bootstrap toggle
 * @extends Template
 */


var BootstrapToggle = function (_Template6) {
	_inherits(BootstrapToggle, _Template6);

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
	function BootstrapToggle(options) {
		var _ret13;

		_classCallCheck(this, BootstrapToggle);

		if (!isDefined($.fn.bootstrapToggle)) throw new Error("BootstrapToggle.constructor: the bootstrap toggle file must be included before bootstrap.");

		var defaults = {
			struct: {
				$container: '.toggle',
				$wrapper: 'input'
			},
			toggleOptions: {},
			name: ''
		};

		// redirect jquery dom events to container
		var _this13 = _possibleConstructorReturn(this, (BootstrapToggle.__proto__ || Object.getPrototypeOf(BootstrapToggle)).call(this, $Util.opts(defaults, options)));

		_this13.after = _this13._after;
		_this13.append = _this13._append;
		_this13.appendTo = _this13._appendTo;
		_this13.before = _this13._before;
		_this13.prepend = _this13._prepend;
		_this13.prependTo = _this13._prependTo;

		return _ret13 = _this13, _possibleConstructorReturn(_this13, _ret13);
	}

	/**
  * Build a bootstrap toggle
  * @returns {BootstrapToggle}
  * @private
  */


	_createClass(BootstrapToggle, [{
		key: '_useDefaultTemplate',
		value: function _useDefaultTemplate() {
			this.$wrapper = $('<input type="checkbox" name="' + this.settings.name + '"/>"').appendTo('body').bootstrapToggle(this.settings.toggleOptions);

			// bootstrap toggle has created some new DOM
			// with the <input> inside an element. Grab that
			this.$container = this.$wrapper.parent();

			return this;
		}

		// jquery redirects

	}, {
		key: '_after',
		value: function _after() {
			var _$container;

			(_$container = this.$container).after.apply(_$container, arguments);
			return this;
		}
	}, {
		key: '_append',
		value: function _append() {
			var _$container2;

			(_$container2 = this.$container).append.apply(_$container2, arguments);
			return this;
		}
	}, {
		key: '_appendTo',
		value: function _appendTo() {
			var _$container3;

			(_$container3 = this.$container).appendTo.apply(_$container3, arguments);
			return this;
		}
	}, {
		key: '_before',
		value: function _before() {
			var _$container4;

			(_$container4 = this.$container).before.apply(_$container4, arguments);
			return this;
		}
	}, {
		key: '_prepend',
		value: function _prepend() {
			var _$container5;

			(_$container5 = this.$container).prepend.apply(_$container5, arguments);
			return this;
		}
	}, {
		key: '_prependTo',
		value: function _prependTo() {
			var _$container6;

			(_$container6 = this.$container).prependTo.apply(_$container6, arguments);
			return this;
		}
	}]);

	return BootstrapToggle;
}(Template);

/*!
 * bootstrapWizard
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * A wizard with bootstrap feedback
 * @extends Wizard
 */


var BootstrapWizard = function (_Wizard) {
	_inherits(BootstrapWizard, _Wizard);

	/**
  * Constructor
  * @param {object} options
  * @returns {BootstrapWizard}
  */
	function BootstrapWizard(options) {
		var _ret14;

		_classCallCheck(this, BootstrapWizard);

		var _this14 = _possibleConstructorReturn(this, (BootstrapWizard.__proto__ || Object.getPrototypeOf(BootstrapWizard)).call(this, options));

		return _ret14 = _this14, _possibleConstructorReturn(_this14, _ret14);
	}

	/**
  * Setup the feedback
  * @returns {Form}
  * @private
  */


	_createClass(BootstrapWizard, [{
		key: '_setupFeedback',
		value: function _setupFeedback() {
			this.feedback = new BootstrapFeedback();
			if (!this.$feedback.length) {
				this.$feedback = $('<div class="form-feedback"></div>');
				this.$wrapper.prepend(this.$feedback);
			}
			this.$feedback.html(this.feedback.$wrapper);
			return this;
		}
	}]);

	return BootstrapWizard;
}(Wizard);
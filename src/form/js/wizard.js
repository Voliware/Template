/*!
 * wizard
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates, serializes, submits,
 * and controls a form wizard
 * @extends Form
 */
class Wizard extends Form {

	/**
	 * Constructor
	 * @param  {object} [options]
	 * @param  {object} [options.struct]
	 * @param  {string} [options.struct.$wrapper='.wizard'] - wizard wrapper
	 * @param  {string} [options.struct.$navs='ul.nav > li'] - navigation list
	 * @param  {string} [options.struct.$tabs='.tab-pane'] - tab container
	 * @param  {string} [options.struct.$next='li.next'] - next button
	 * @param  {string} [options.struct.$pager='ul.pager'] - pager container
	 * @param  {string} [options.struct.$previous='li.previous'] - previous button
	 * @returns {Wizard}
	 */
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : '.wizard',
				$navs : 'ul.nav > li',
				$tabs : '.tab-pane',
				$next : 'li.next',
				$pager : 'ul.pager',
				$previous : 'li.previous'
			}
		};
		super($Util.opts(defaults, options));

		this.stepCount = this.$tabs.length;
		this.step = 0;

		// show or hide pagination and form buttons
		this.toggleSubmitButton(this.stepCount === 1);
		this.togglePreviousButton(false);
		this.toggleNextButton(this.stepCount > 1);

		this._setHandlers();

		return this;
	}

	/**
	 * Set pagination and form button handlers
	 * @returns {Wizard}
	 * @private
	 */
	_setHandlers(){
		var self = this;
		// next
		this.$next.click(function(){
			self._getNextNav().find('a').click();
			self.validatePreviousTab();
		});
		// prev
		this.$previous.click(function(){
			self._getPreviousNav().find('a').click();
			self.validateNextTab();
		});
		// submit
		this.$submit.click(function(){
			self.validateAllTabs();
		});
		// navs
		this.$navs.each(function(i, e){
			$(e).click(function(){
				self._setPagination(i);
				var x = i;
				// nav clicked is ahead
				if(i > self.step){
					for(x; x > 0; x--){
						self.validateTab(self._getTab(x))
					}
				}
				// nav clicked is behind
				else if (i < self.step){
					for(x; x < self.step + 1; x++){
						self.validateTab(self._getTab(x))
					}
				}
				self.step = i;
			});
		});
		return this;
	}

	/**
	 * Create an empty wizard
	 * @returns {Wizard}
	 * @private
	 */
	_useDefaultTemplate(){
		super._useDefaultTemplate();

		// to avoid duplicate $wrapper's (Wizard inherits Form)
		// set this.$form to Form's $wrapper
		this.$form = this.$wrapper;

		// components
		this.$wrapper = $('<div class="wizard"></div>');
		this.$navs = $('<ul class="nav"></ul>');
		this.$tabs = $('<div class="tab-pane"></div>');
		this.$pager = $('<ul class="pager"></ul>');
		this.$next = $('<li class="next"><a href="#">Next</a></li>');
		this.$previous = $('<li class="previous"><a href="#">Previous</a></li>');

		// build
		this.$pager.append(this.$previous, this.$next, this.$submit);
		this.$footer.append(this.$pager);
		this.$form.append(this.$tabs, this.$footer);
		this.$wrapper.append(this.$navs, this.$form);

		return this;
	}

	/**
	 * Attaches a validator to the form
	 * @returns {Form}
	 * @private
	 */
	_setupValidator(){
		var v = this.settings.validator;
		switch(v.api){
			case 'formValidation':
				// clone to not affect Form refs
				var options = $.extend(true, {}, v.options);
				// must validate hidden tabs
				options.excluded = [':disabled'];
				Wizard.validators.formValidation.setup(this, this.$form, options);
				break;
		}
		return this;
	}

	/**
	 * Prepare the wizard
	 * @returns {Wizard}
	 * @private
	 */
	_prepare(){
		this.toggleForm(false);
		this.feedback.setFeedback('processing', 'Getting data...');
		return this;
	}

	// ready

	/**
	 * Wizard is ready
	 * @returns {Wizard}
	 * @private
	 */
	_ready(){
		var self = this;
		this.feedback.slideUp(function(){
			self.slideToggleForm(true);
		});
		return this;
	}

	// control

	/**
	 * Show or hide pagination 
	 * buttons according to step
	 * @param {number} step - the step 
	 * @private
	 */
	_setPagination(step){
		// simply hide everything first
		this.togglePreviousButton(false);
		this.toggleNextButton(false);
		this.toggleSubmitButton(false);

		switch(step){
			// first step
			case 0:
				this.togglePreviousButton(false);
				if(this.stepCount === 1)
					this.toggleSubmitButton();
				else if(this.stepCount > 1)
					this.toggleNextButton();
				break;
			// last step
			case this.stepCount - 1:
				this.toggleSubmitButton();
				if(this.stepCount > 1)
					this.togglePreviousButton();
				break;
			// inbetween steps
			default:
				if(this.stepCount > 1){
					this.toggleNextButton();
					this.togglePreviousButton();
				}
				break;
		}
	}

	// navs

	/**
	 * Get a nav element by index
	 * @param {number} index
	 * @returns {jQuery}
	 * @private
	 */
	_getNav(index){
		return $(this.$navs.get(index));
	}

	/**
	 * Get a nav from a tab element
	 * @param {jQuery} $tab
	 * @returns {jQuery}
	 * @private
	 */
	_getNavFromTab($tab){
		var index = this.$tabs.index($tab);
		return this._getNav(index);
	}

	/**
	 * Get the previous nav
	 * @returns {jQuery}
	 * @private
	 */
	_getPreviousNav(){
		return $(this.$navs.get(this.step - 1));
	}

	/**
	 * Get the current nav
	 * @returns {jQuery}
	 * @private
	 */
	_getCurrentNav(){
		return $(this.$navs.get(this.step));
	}

	/**
	 * Get the next nav
	 * @returns {jQuery}
	 * @private
	 */
	_getNextNav(){
		return $(this.$navs.get(this.step + 1));
	}

	/**
	 * Toggle a nav as invalid
	 * @param {jQuery} $nav
	 * @param {boolean} state
	 * @returns {Wizard}
	 * @private
	 */
	_toggleNavInvalid($nav, state = true){
		$nav.toggleClass('wizard-tab invalid', state);
		return this;
	}
	
	// tabs

	/**
	 * Get a tab based on index
	 * @param {jQuery} index
	 * @returns {jQuery}
	 * @private
	 */
	_getTab(index){
		return $(this.$tabs.get(index));
	}

	/**
	 * Get the current tab
	 * @returns {jQuery}
	 * @private
	 */
	_getCurrentTab(){
		return $(this.$tabs.get(this.step));
	}

	/**
	 * Get the next tab
	 * @returns {jQuery|null}
	 * @private
	 */
	_getNextTab(){
		return this.step !== this.stepCount
			? $(this.$tabs.get(this.step + 1))
			: null;
	}

	/**
	 * Get the previous tab
	 * @returns {jQuery|null}
	 * @private
	 */
	_getPreviousTab(){
		return this.step > 0
			? $(this.$tabs.get(this.step - 1))
			: null;
	}

	// validation

	/**
	 * Validate a tab
	 * @param {jQuery} $tab
	 * @returns {boolean}
	 */
	validateTab($tab){
		var api = this.settings.validator.api;
		var valid = true;

		// todo: add support for other validators
		switch(api){
			case 'formValidation':
				this.validator.validateContainer($tab);
				valid = this.validator.isValidContainer($tab);
				break;
		}

		var $nav = this._getNavFromTab($tab);
		this._toggleNavInvalid($nav, !valid);
		return valid;
	}

	/**
	 * Validate the current tab
	 * @returns {boolean}
	 */
	validateCurrentTab(){
		var $tab = this._getCurrentTab();
		return this.validateTab($tab);
	}

	/**
	 * Validate the previous tab
	 * @returns {boolean}
	 */
	validatePreviousTab(){
		var $tab = this._getPreviousTab();
		return this.validateTab($tab);
	}

	/**
	 * Validate the next tab
	 * @returns {boolean}
	 */
	validateNextTab(){
		var $tab = this._getNextTab();
		return this.validateTab($tab);
	}

	/**
	 * Validate all tabs
	 * @returns {boolean}
	 */
	validateAllTabs(){
		var self = this;
		var valid = true;
		$.each(this.$tabs, function(i, e){
			var $tab = $(e);
			self.validator.validateContainer($tab);
			valid = self.validator.isValidContainer($tab);
			self._toggleNavInvalid(self._getNav(i), !valid);
		});
		return valid;
	}

	// buttons

	/**
	 * Toggle the next button
	 * @param {boolean} state
	 * @returns {Wizard}
	 */
	toggleNextButton(state = true){
		this.$next.toggle(state);
		return this;
	}

	/**
	 * Toggle the previous button
	 * @param {boolean} state
	 * @returns {Wizard}
	 */
	togglePreviousButton(state = true){
		this.$previous.toggle(state);
		return this;
	}

	/**
	 * Toggle the submit button
	 * @param {boolean} state
	 * @returns {Wizard}
	 */
	toggleSubmitButton(state = true){
		this.$submit.toggle(state);
		return this;
	}

	/**
	 * Toggle wizard components
	 * @param {boolean} state
	 * @returns {Wizard}
	 */
	toggleForm(state){
		super.toggleForm(state);
		this.$navs.toggle(state);
		return this;
	}

	/**
	 * Toggle wizard components
	 * @param {boolean} state
	 * @returns {Wizard}
	 */
	slideToggleForm(state){
		super.slideToggleForm(state);
		this.$navs.slideToggleState(state);
		return this;
	}

	// resets

	/**
	 * Reset nav validation
	 * @returns {Wizard}
	 */
	resetNavValidation(){
		for(var i = 0; i < this.$navs.length; i++){
			var $nav = $(this.$navs[i]);
			this._toggleNavInvalid($nav, false);
		}
		return this;
	}

	/**
	 * Reset the form
	 * @returns {Wizard}
	 */
	resetForm(){
		var $nav = $(this.$navs[0]);
		$nav.find('a').click();
		this.resetNavValidation();
		super.resetForm();
		return this;
	}
}
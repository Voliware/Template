/*!
 * bootstrap
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

(function($) {

	/**
	 * Turns an input group's addon into a
	 * button that reveals a help dialog.
	 * Place '<div class="input-help"></div>'
	 * AFTER a '<div class="input-group"></div>'
	 */
	$.fn.inputHelp = function() {
		return this.each(function() {
			var $this = $(this);
			var $group = $this.prev('.input-group');
			$group.find('.input-group-addon-help').click(function() {
				$this.slideToggle();
			});
		});
	};


	/**
	 * Makes tabs responsive in responsive mode
	 * http://jsbin.com/befiqofemu
	 */
	$.fn.responsiveTabs = function() {

		return this.each(function() {
			var $this = $(this);


			$this.addClass('responsive-tabs');
			$this.append($('<span class="glyphicon glyphicon-triangle-bottom"></span>'));
			$this.append($('<span class="glyphicon glyphicon-triangle-top"></span>'));

			$this.on('click', 'li.active > a, span.glyphicon', function() {
				this.toggleClass('open');
			}.bind($this));

			$this.on('click', 'li:not(.active) > a', function() {
				this.removeClass('open');
			}.bind($this));
		});

	};

})(jQuery);
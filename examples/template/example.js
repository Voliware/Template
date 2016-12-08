class ComponentBox extends TemplateManager {
	constructor(options){
		var defaults = {
			$wrapper : $('<div class="component-box"></div>')
		};
		super($Util.opts(defaults, options));

		this.lines = new LineManager();
		this._add(new MouseCoords());

		// listen to component creation
		// to attach clicks for connections

		// listen to components movements to redraw lines

		return this;
	}
}

class Line extends Template {
	constructor(options) {
		var defaults = {
			struct: {
				$wrapper: '.line'
			}
		};
		super($Util.opts(defaults, options));

		// properties
		this.color = 'black';
		this.dashColor = 'transparent';

		// states
		this.isDashed = false;

		this.setColor(this.color);

		return this;
	}

	_useDefaultTemplate(){
		this.settings.template =
			'<div class="line"></div>';
		return this._useTemplate();
	}

	setColor(color){
		this.color = color;
		if(this.isDashed)
			this.setDashed(true);
		else
			this.$wrapper.css('background', color);

		return this;
	}

	setDashColor(color){
		this.dashColor = color;
		if(this.isDashed)
			this.setDashed(true);
		return this;
	}

	setDashed(state){
		this.isDashed = state;
		if(state)
			this.$wrapper.css(
				'background',
				'repeating-linear-gradient(to right, ' + this.color + ', ' + this.color +  ' 2px,' + this.dashColor + ' 2px, ' + this.dashColor + ' 4px )'
			);
		else
			this.setColor(this.color);
		return this;
	}

	setWidth(width){
		this.$wrapper.css('width', width + "px");
		return this;
	}

	setHeight(height){
		this.$wrapper.css('height', height + "px");
		return this;
	}
}

class LineManager extends TemplateManager{
	constructor(options){
		super(options);
		var self = this;

		// alias
		this.lines = this.objects;

		// properties
		this.mouseX = 0;
		this.mouseY = 0;

		// handlers
		$("html").on('mousemove.mousecoords', function(e) {
			self.mouseX = e.pageX;
			self.mouseY = e.pageY;
		});

		return this;
	}

	createLine(){

	}
}

class InlineInput extends Template {
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : '.inlineInput',
				$value : '.inlineInput-value',
				$inputContainer : '.inlineInput-input',
				$input : 'input',
				$ok : '.inlineInput-btn-ok',
				$cancel : '.inlineInput-btn-cancel'
			}
		};
		super($Util.opts(defaults, options));
		var self = this;

		// properties
		this.value = "";

		// states
		this.inputIsHidden = true;

		// handlers
		this.$value.click(function(){
			self._toggleInput()
		});

		this.$ok.click(function(){
			self.$value.html(self.$input.val());
			self._toggleInput()
		});

		this.$cancel.click(function(){
			self._toggleInput()
		});

		this.$input.on('input', function(){
			self.value = $(this).val();
		});

		return this;
	}

	_useDefaultTemplate() {
		this.settings.template =
			'<div class="inputBox">' +
				'<span class="inlineInput-value"></span>' +
				'<div class="inlineInput-input">' +
					'<input type="text" name="value"/>' +
					'<button type="button" class="inlineInput-btn-ok">OK</button>' +
					'<button type="button" class="inlineInput-btn-cancel">X</button>' +
				'</div>' +
			'</div>';

		return this._useTemplate();
	}

	_toggleInput(state){
		this.inputIsHidden = isDefined(state)
			? state
			: !this.inputIsHidden;
		this.$inputContainer.toggle(!this.inputIsHidden);
		this.$value.toggle(this.inputIsHidden);
		this.$input.val(this.value);
		return this;
	}

	setValue(value){
		this.value = value;
		this.$value.html(value);
		return this;
	}
}

class Draggable extends Template {
	constructor(options){
		super(options);
		var self = this;

		// states
		this.hasBeenDragged = false;

		// set the wrapper to be HTML5 draggable
		this.$wrapper.attr('draggable', true);

		// handlers
		this.$wrapper.on('dragstart.draggable', function(e){
			if(!self.hasBeenDragged){
				$(this).css('position', 'fixed');
				self.hasBeenDragged = true;
			}
		});

		this.$wrapper.on('dragend.draggable', function(e){
			var top = e.clientY;
			var left = e.clientX;
			self._moveWrapper(top, left);
		});

		return this;
	}

	_moveWrapper(top, left){
		this.$wrapper.css({
			top : top,
			left : left
		})
	}
}

class Component extends Draggable {
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : '.comp',
				$header : '.comp-header',
				$title : '.comp-title',
				$body : '.comp-body',
				$display : '.comp-display',
				$actions : '.comp-actions'
			}
		};
		super($Util.opts(defaults, options));

		this.ioManager = new TemplateManager()
			.appendTo(this.$body);

		return this;
	}

	_useDefaultTemplate(){
		this.settings.template =
			'<div class="comp">' +
				'<div class="comp-header">' +
					'<h4 class="comp-title"></h4>' +
					'<div class="comp-actions">' +
					'</div>' +
				'</div>' +
				'<div class="comp-body">' +
					'<div class="comp-display"></div>' +
				'</div>' +
			'</div>';

		return this._useTemplate();
	}

	setTitle(title){
		this.$title.html(title);
		return this;
	}
}

class Io extends Template {
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : '.io',
				$value : '.io-value',
				$input : '.io-io-input',
				$output : '.io-io-output'
			}
		};
		super($Util.opts(defaults, options));

		// properties
		this.value = 0;

		// components
		this.nameInput = new InlineInput()
			.appendTo(this.$wrapper);

		return this;
	}

	_useDefaultTemplate(){
		this.settings.template =
			'<div class="template io">' +
				'<div class="io-io io-io-input"></div>' +
				'<div class="io-value"></div>' +
				'<div class="io-io io-io-output"></div>' +
			'</div>';

		return this._useTemplate();
	}

	_setValue(value){
		this.value = value;
		this.$value.html(value);
		this.trigger('value', value);
		return this;
	}
}

class MouseCoordX extends Io {
	constructor(options){
		super(options);
		var self = this;

		// handlers
		$("html").on('mousemove.mousecoords', function(e) {
			self._setValue(e.pageX);
		});

		this.nameInput.setValue('Mouse X');

		return this;
	}
}

class MouseCoordY extends Io {
	constructor(options){
		super(options);
		var self = this;

		// handlers
		$("html").on('mousemove.mousecoords', function(e) {
			self._setValue(e.pageY);
		});

		this.nameInput.setValue('Mouse Y');

		return this;
	}
}

class MouseCoords extends Component {
	constructor(options){
		super(options);

		this.mouseCordsX = new MouseCoordX();
		this.mouseCordsY = new MouseCoordY();
		
		this.ioManager.addTemplate(this.mouseCordsX, 'mouseCordsX');
		this.ioManager.addTemplate(this.mouseCordsY, 'mouseCordsY');

		this.setTitle('Mouse Coords');

		return this;
	}
}

class Variable extends Io {
	constructor(options){
		super(options);

		this.$value.click(function(){

		});

		return this;
	}
}

var templateBox;
$(document).on('ready', function(){
	templateBox = new ComponentBox().appendTo('body');
});
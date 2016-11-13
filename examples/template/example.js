class TemplateBox extends TemplateManager {
	constructor(options){
		var defaults = {
			$wrapper : $('<div class="template-box"></div>')
		};
		super($Util.opts(defaults, options));

		return this;
	}
}

class Draggable extends Template {
	constructor(options){
		super(options);
		var self = this;

		// properties
		this.x = 0;
		this.y = 0;
		this.guid = createGuid();
		this.hasBeenDragged = false;

		this.$wrapper.attr('draggable', true);

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

		}
		super(options);
		var self = this;

		// components
		this.inputs = new TemplateManager({
			template : Input
		});
		this.$container = $('<div class="component-container"></div>');
		this.$addInput = $('<button type="button" class="btn btn-sm btn-primary">IN +</button>');
		this.$addOuput = $('<button type="button" class="btn btn-sm btn-primary">OUT +</button>');

		// handlers
		this.$addInput.click(function(){
			self.inputs.createTemplate(createGuid());
		});
		this.$addOuput.click(function(){
			self.outputs.createTemplate(createGuid());
		});

		// add buttons to the component
		this.$container.append(this.$addInput, this.$addOuput, this.inputs.$wrapper, this.outputs.$wrapper);
		this.$wrapper.append(this.$container);

		return this;
	}
}

class Io extends Template {
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : '.io',
				$name : '.io-name',
				$nameInputContainer : '.io-nameInput',
				$nameInput : '[name="name"]',
				$nameConfirm : '[name="submit"]',
				$nameCancel : '[name="cancel"]',
				$connector : '.io-conn'
			}
		};
		super($Util.opts(defaults, options));
		var self = this;

		// properties
		this.nameInputIsHidden = true;

		// handlers
		this.$name.click(function(){
			self._toggleInput()
		});

		this.$nameConfirm.click(function(){
			self.$name.html(self.$nameInput.val());
			self._toggleInput()
		});

		this.$nameCancel.click(function(){
			self._toggleInput()
		});

		return this;
	}

	_useDefaultTemplate(){
		var template =
			'<div class="template io">' +
				'<div class="io-name">IO</div>' +
				'<div class="io-nameInput">' +
					'<input type="text" name="name"/>' +
					'<button type="button" class="btn btn-xs btn-success" name="submit">OK</button>' +
					'<button type="button" class="btn btn-xs btn-danger" name="cancel">X</button>' +
				'</div>' +
				'<div class="io-conn"></div>' +
			'</div>';

		this.settings.template = $(template);
		this.settings.useTemplate = true;
		this._useTemplate();
		return this;
	}

	_toggleInput(state){
		this.nameInputIsHidden = isDefined(state)
			? state
			: !this.nameInputIsHidden;
		this.$nameInputContainer.toggle(!this.nameInputIsHidden);
		this.$name.toggle(this.nameInputIsHidden);
		return this;
	}
}

class Input extends Io {
	constructor(options){
		super(options);

		this.$wrapper.addClass('input');

		return this;
	}
}

class MouseCoords extends Component {
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : '.mouse-coords',
				$x : '.mouse-coords-x',
				$y : '.mouse-coords-y'
			}
		};
		super($Util.opts(defaults, options));
		var self = this;

		// properties
		this.x = 0;
		this.y = 0;

		// handlers
		$("html").on('mousemove.mousecoords', function(e) {
			self._setX(e.pageX);
			self._setY(e.pageY);
		});

		this._setX(0);
		this._setY(0);

		return this;
	}

	_useDefaultTemplate(){
		var template =
			'<div class="template mouse-coords">' +
				'<span>x: </span>' +
				'<span class="mouse-coords-x"></span>' +
				'<span> y: </span>' +
				'<span class="mouse-coords-y"></span>' +
			'</div>';

		this.settings.template = $(template);
		this.settings.useTemplate = true;
		this._useTemplate();
		return this;
	}

	_setX(x){
		this.x = x;
		this.$x.html(x);
		return this;
	}

	_setY(y){
		this.y = y;
		this.$y.html(y);
		return this;
	}
}

class Adder extends Draggable {
	constructor(){
		super();

		return this;
	}
}

var templateBox;
var mouseCoords;
$(document).on('ready', function(){
	templateBox = new TemplateBox().appendTo('body');
	mouseCoords = new MouseCoords();

	templateBox.addObject(mouseCoords, 'mouseCoords');
});
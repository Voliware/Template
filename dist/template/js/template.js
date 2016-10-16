'use strict';

var _get2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * util
 * https://github.com/Voliware/Util
 * Licensed under the MIT license.
 */

/**
 * General utility functions
 */
var Util = function () {
	function Util() {
		_classCallCheck(this, Util);
	}

	_createClass(Util, null, [{
		key: 'each',

		/**
   * Wraps a for in loop.
   * For each object it will pass the
   * property name and value to a callback.
   * @param {object} data - data to loop through
   * @param {function} cb - callback
   */
		value: function each(data, cb) {
			for (var i in data) {
				var e = data[i];
				cb(i, e);
			}
		}
	}]);

	return Util;
}();

// helpers


if (typeof isDefined === 'undefined') {
	window.isDefined = function (x) {
		return typeof x !== 'undefined';
	};
}
if (typeof isNull === 'undefined') {
	window.isNull = function (x) {
		return x === null;
	};
}
if (typeof isFunction === 'undefined') {
	window.isFunction = function (x) {
		return typeof x === 'function';
	};
}
if (typeof isString === 'undefined') {
	window.isString = function (x) {
		return typeof x === 'string';
	};
}
if (typeof isNumber === 'undefined') {
	window.isNumber = function (x) {
		return typeof x === 'number';
	};
}
if (typeof isObject === 'undefined') {
	window.isObject = function (x) {
		return x !== null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object';
	};
}
if (typeof getType === 'undefined') {
	//http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
	window.getType = function (x) {
		if (x === null) return "[object Null]";
		return Object.prototype.toString.call(x);
	};
}
// array
if (typeof Array.diff === 'undefined') {
	Array.diff = function (a, b) {
		return a.filter(function (i) {
			return b.indexOf(i) < 0;
		});
	};
}
if (typeof Array.min === 'undefined') {
	Array.min = function (array) {
		return Math.min.apply(Math, array);
	};
}
if (typeof Array.max === 'undefined') {
	Array.max = function (array) {
		return Math.max.apply(Math, array);
	};
}

//https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
	Object.assign = function (target) {
		'use strict';

		if (target == null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		target = Object(target);
		for (var index = 1; index < arguments.length; index++) {
			var source = arguments[index];
			if (source != null) {
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	};
}
/*!
 * util-jquery
 * https://github.com/Voliware/Util
 * Licensed under the MIT license.
 */

if (!isDefined($)) throw new ReferenceError("util-jquery requires jquery 2.2.2 or greater");

/**
 * jQuery utility functions
 */

var $Util = function () {
	function $Util() {
		_classCallCheck(this, $Util);
	}

	_createClass($Util, null, [{
		key: 'jQuerify',


		/**
   * Attaches all jQuery functions to a
   * $wrapper property of an object, but
   * always returns the base object
   * @param {*} obj - some object that has a $wrapper property
   */
		value: function jQuerify(obj) {
			if (!obj.$wrapper) throw new ReferenceError('$Util.jQuerify: $wrapper must be a property of the first argument');
			Util.each($Util.jqueryPrototype, function (i, e) {
				obj[e] = function () {
					var _obj$$wrapper;

					(_obj$$wrapper = obj.$wrapper)[e].apply(_obj$$wrapper, arguments);
					return obj;
				};
			});
		}

		/**
   * Convenient wrapper for merging defaults
   * and options object with jquery deep $.extend
   * @param {object} defaults - the default settings
   * @param {object} options - set options
      */

	}, {
		key: 'opts',
		value: function opts(defaults, options) {
			return $.extend(true, defaults, options);
		}
	}]);

	return $Util;
}();

$Util.jqueryPrototype = Object.getOwnPropertyNames($.prototype);

// extensions for $.fn.populate
// specificy tag name as object name
// and a prop called populate that is a
// function that takes some data argument
$Util.populate = {};

(function ($) {

	/**
  * Append option(s) to a select
  * @param {*} arguments - Either an object of key/value pairs, where the key is the
  * option value and the value is the string within the tags,
  * or a key and value as two parameters to add one option
  * @returns {jQuery}
  */
	$.fn.addToSelect = function () {
		var data = {};

		if (arguments.length > 1) data[arguments[0]] = arguments[1];else data = arguments[0];

		var $this = $(this);
		if ($this.is('select')) {
			Util.each(data, function (i, e) {
				var opt = '<option value="' + i + '">' + e + '</option>';
				$this.append(opt);
			});
		}

		return this;
	};

	/**
  * Checks if an element has an attribute
  * @param {string} attr - attribute name
  * @returns {boolean} - true if it does, false otherwise
  */
	$.fn.hasAttr = function (attr) {
		return $(this).is('[' + attr + ']');
	};

	/**
  * Popualte a DOM object in the appropriate way.
  * Extend with $Util.populate object
  * @param {string|number|jQuery} data
  */
	$.fn.populate = function (data) {
		var $this = $(this);
		var tag = $this.prop("tagName").toLowerCase();
		var type = $this.attr('type');

		var extension = getExtension(tag);
		if (extension) extension.call(this, data);else defaultPopulate(tag, type, data);

		return this;

		/**
   * Default populate switch
   * @param {string} tag - element tag
   * @param {string} type - element type
   * @param {*} data - data to populate with
   */
		function defaultPopulate(tag, type, data) {
			switch (tag) {
				case 'input':
					_populateInput(type, data);
					break;
				case 'select':
				case 'textarea':
					$this.val(data);
					break;
				case 'img':
					$this.attr('src', data);
					break;
				case "button":
					$this.prop('disabled', data === 0);
					break;
				default:
					$this.html(data);
					break;
			}
		}

		/**
   * Get the extension for this tag,
   * or for a data-tag attribute
   * @param {string} tag - element tag
   * @returns {function|null}
   */
		function getExtension(tag) {
			if ($Util.populate[tag]) return $Util.populate[tag];
			if ($this.hasAttr('data-tag')) return $Util.populate[$this.attr('data-tag')];
			return null;
		}

		/**
   * Populate an input according to type
   */
		function _populateInput(type, data) {
			switch (type) {
				case "checkbox":
					var checkedValue = $this.data('checked');
					if (data.toString() === checkedValue || data.toString() === "1" || data === true) $this.prop('checked', true);
					break;
				case "radio":
					if (data === $this.attr('value')) $this.prop('checked', true);
					break;
				default:
					$this.val(data);
					break;
			}
		}
	};

	/**
  * Populates the children of an object such as a form
  * by matching data keys with DOM elements that have the
  * attribute [data-name="key"] or [name="key"].
  * Uses $.populate(data) to appropriately fill in the
  * found element.
  * @param {object} data
  * @returns {jQuery}
  */
	$.fn.populateChildren = function (data) {
		var $this = $(this);
		Util.each(data, function (i, e) {
			var $el = $this.find('[name="' + i + '"]');
			if ($el.length === 0) $el = $this.find('[data-name="' + i + '"]');
			if ($el.length > 0 && $el.data('populate') !== false) $el.populate(e);
		});
		return this;
	};

	/**
  * Slide toggle who's first arg is a toggle state
  * @param {boolean} state - true to slide down
  * @param {string} [options=""]
  * @param {function} [cb=null]
  */
	$.fn.slideToggleState = function (state) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
		var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		if (state) $(this).slideDown(options, cb);else $(this).slideUp(options, cb);
		return this;
	};

	/**
  * Disable/enable an option/set of options based on value attribute
  * @param {*} [arguments] - Pass a boolean to toggle all options,
  * pass an array and boolean to toggle some options,
  * pass a string and boolean to toggle one option
  * @returns {jQuery}
  */
	$.fn.toggleOption = function () {
		var $this = $(this);
		if (!$this.is('select')) return this;

		var state;
		var value;

		// toggle specific options
		if (arguments.length > 1) {
			value = arguments[0];
			if (!$.isArray(value)) value = [value];

			state = arguments[1];

			for (var i = 0; i < value.length; i++) {
				$this.find('option[value="' + value[i] + '"]').prop('disabled', !state);
			}
		}
		// toggle all <option>s
		else {
				state = arguments[0];
				$this.find('option').prop('disabled', !state);
			}

		return this;
	};
})(jQuery);
/*!
 * eventSystem
 * https://github.com/Voliware/Util
 * Licensed under the MIT license.
 */

/**
 * Basic event system.
 * Uses the on/off/trigger or emit methods.
 */

var EventSystem = function () {

	/**
  * Constructor
  * @returns {EventSystem}
  */
	function EventSystem() {
		_classCallCheck(this, EventSystem);

		this.events = {};
		return this;
	}

	/**
  * Create an event an object
  * with an array of callbacks
  * @param {string} name - name of the event
  * @returns {{callbacks: Array}}
  * @private
  */


	_createClass(EventSystem, [{
		key: '_create',
		value: function _create(name) {
			return this.events[name] = { callbacks: [] };
		}

		/**
   * Destroy an event
   * @param {string} name - name of the event
   * @returns {EventSystem}
   * @private
   */

	}, {
		key: '_destroy',
		value: function _destroy(name) {
			if (isDefined(this.event[name])) delete this.event[name];
			return this;
		}

		/**
   * Attaches a callback to an event
   * @param {string} name - name of the event
   * @param {function} callback - the callback function
   * @returns {EventSystem}
   */

	}, {
		key: 'on',
		value: function on(name, callback) {
			var event = this.events[name];

			if (!isDefined(event)) event = this._create(name);

			event.callbacks.push(callback);
			return this;
		}

		/**
   * Detach a callback from an event.
   * This will only work if the callback is not anonymous
   * @param {string} name - name of the event
   * @param {function} callback - the callback function
   * @returns {EventSystem}
   */

	}, {
		key: 'off',
		value: function off(name, callback) {
			var event = this.events[name];

			if (isDefined(event)) {
				var i = event.callbacks.indexOf(callback);
				if (i > -1) event.callbacks.splice(i, 1);
			}
			return this;
		}

		/**
   * Remove all callbacks for an event
   * @param {string} name - name of the event
   * @returns {EventSystem}
   */

	}, {
		key: 'offAll',
		value: function offAll(name) {
			var event = this.events[name];

			if (isDefined(event)) event[name].callbacks = [];

			return this;
		}

		/**
   * Run all callbacks attached to an event
   * @returns {EventSystem}
   */

	}, {
		key: 'trigger',
		value: function trigger() {
			// grab the name of the event and remove it from arguments
			var shift = [].shift;
			var name = shift.apply(arguments);
			var event = this.events[name];

			// there's no need to trigger if no one is listening
			if (!isDefined(event)) return this;

			for (var i = 0; i < event.callbacks.length; i++) {
				var _event$callbacks;

				(_event$callbacks = event.callbacks)[i].apply(_event$callbacks, arguments);
			}
			return this;
		}

		/**
   * Alias to trigger method
   * @returns {EventSystem}
   */

	}, {
		key: 'emit',
		value: function emit() {
			return this.trigger();
		}
	}]);

	return EventSystem;
}();
/*!
 * manager
 * https://github.com/Voliware/Util
 * Licensed under the MIT license.
 */

if (!isDefined(EventSystem)) throw new ReferenceError("Manager requires EventSystem");

/**
 * Generic object manager.
 * Adds/updates/deletes objects in a collection.
 * Can accept an array or object of
 * data and determine which objects
 * are new, old, or no longer exist
 * @extends EventSystem
 */

var Manager = function (_EventSystem) {
	_inherits(Manager, _EventSystem);

	/**
  * Constructor
  * @param {object} [options]
  * @param {string} [options.identifier='id'] - the property name that identifies
  * each object, which is a property of each object, managed by this manager
  * @param {boolean} [options.useObjectNames=false] - whether to use the names
  * of objects passed to manage() as their object identifiers
  * @returns {Manager}
  */
	function Manager(options) {
		var _ret;

		_classCallCheck(this, Manager);

		var _this = _possibleConstructorReturn(this, (Manager.__proto__ || Object.getPrototypeOf(Manager)).call(this));

		var defaults = {
			// to manage objects, they must have
			// a unique id before they get to Manager.
			// this is their id property name
			identifier: 'id',
			// OR instead of using an identifier,
			// use the name of the object.
			// this only works when passing
			// objects of objects to manage()
			useObjectNames: false
		};
		_this.settings = Object.assign(defaults, options);

		// all child classes will use
		// a more friendly name for objects
		// so any mutations must be done
		// to the object itself, not this ref
		_this.objects = {};
		_this.count = 0;

		// cached data passed to manage()
		_this._cachedData = {};

		return _ret = _this, _possibleConstructorReturn(_this, _ret);
	}

	/**
  * Check if an object exists in the collection
  * @param {...(number|object|string)} arguments - the object or the id of the object
  * @returns {boolean}
  * @private
  */


	_createClass(Manager, [{
		key: '_exists',
		value: function _exists() {
			var arg = arguments[0];
			if (isString(arg) || isNumber(arg)) return isDefined(this.objects[arg]);else return isDefined(this.objects[arg[this.settings.identifier]]);
		}

		/**
   * Get an object in the managed collection
   * by id (string/number) or by an object's
   * property as set in this.settings.identifier
   * @param {...(number|object|string)} arguments - the object or the id of the object
   * @returns {*}
   * @private
   */

	}, {
		key: '_get',
		value: function _get() {
			var arg = arguments[0];
			if (isString(arg) || isNumber(arg)) return this.objects[arg];else return this.objects[arg[this.settings.identifier]];
		}

		/**
   * Adds an object to the collection.
   * Replaces any existing object
   * @param {object} obj - the object to add
   * @param {string} [id] - the id of the object
   * @returns {*}
   * @private
   */

	}, {
		key: '_add',
		value: function _add(obj, id) {
			this.trigger('add', obj);
			this.count++;

			if (isDefined(id)) {
				obj[this.settings.identifier] = id;
				return this.objects[id] = obj;
			} else return this.objects[obj[this.settings.identifier]] = obj;
		}

		/**
   * Replaces or adds an object
   * @param {object} obj - the object to update
   * @param {string} [id] - the id of the object
   * @returns {*}
   * @private
   */

	}, {
		key: '_update',
		value: function _update(obj, id) {
			this.trigger('update', obj);

			if (id) return this.objects[id] = obj;else return this.objects[obj[this.settings.identifier]] = obj;
		}

		/**
   * Deletes an object from the collection
   * @param {...(number|object|string)} arguments - the object or the id of the object
   * @returns {Manager}
   * @private
   */

	}, {
		key: '_delete',
		value: function _delete() {
			var arg = arguments[0];
			// an object id was passed
			if (isString(arg) || isNumber(arg)) {
				String(arg);
				if (this.objects[arg]) delete this.objects[arg];
			}
			// an object was passed
			else if (this.objects[arg[this.settings.id]]) delete this.objects[arg[this.settings.id]];
				// fail
				else return this;

			this.count--;
			this.trigger('delete', arguments[0]);
			return this;
		}

		/**
   * Deletes all objects from the collection
   * @returns {Manager}
   * @private
   */

	}, {
		key: '_empty',
		value: function _empty() {
			// in likely case there are references
			for (var i in this.objects) {
				delete this.objects[i];
			}
			return this;
		}

		/**
   * Cache data
   * @param {*} data
   * @returns {Manager}
   * @private
   */

	}, {
		key: '_cacheData',
		value: function _cacheData(data) {
			this._cachedData = Object.create(data);
			return this;
		}

		/**
   * Process all incoming data to manage
   * @param {object} data
   * @returns {object}
   * @private
   */

	}, {
		key: '_processData',
		value: function _processData(data) {
			return data;
		}

		/**
   * Get the ids of all objects
   * @returns {string[]}
   */

	}, {
		key: 'getIds',
		value: function getIds() {
			var ids = [];
			for (var i in this.objects) {
				ids.push(i);
			}
			return ids;
		}

		/**
   * Get the id of an object
   * @param {object} obj
   * @returns {string|undefined}
   */

	}, {
		key: 'getId',
		value: function getId(obj) {
			return obj[this.settings.identifier];
		}

		/**
   * Given a collection of objects in an array, 
   * or in an object, add and update them 
   * in the manager's own collection.
   * Then delete any objects still in the manager's
   * collection that are not in the data
   * @param {object|object[]} data
   * @returns {Manager}
   */

	}, {
		key: 'manage',
		value: function manage(data) {
			data = this._processData(data);

			if (!isObject(data) && this.settings.useObjectNames) throw new Error("Manager.manage: to use option useObjectNames, object passed to manage() must be an object.");

			var self = this;
			var id = this.settings.identifier;
			// maintain an array of ids found in data
			// then xreference this to see which objects
			// no longer exist (data is the master here)
			var dataIds = [];

			// add or update objects
			for (var i in data) {
				var e = data[i];

				if (this.settings.useObjectNames) e[id] = i;

				// ids must be defined within objects
				// there is no other way to know if an
				// object is new or old otherwise
				if (!isDefined(e[id])) return console.error("Manager.manage: cannot manage objects with no ids");

				// objectIds will always be strings
				var objId = e[id].toString();
				var obj = self.objects[objId];
				if (isDefined(obj)) self._update(e);else self._add(e);
				dataIds.push(objId);
			}

			// diff the array of object ids
			// with the array of data ids
			var objectIds = this.getIds();
			var diff = Array.diff(objectIds, dataIds);

			// delete any objects that are
			// no longer found in data
			for (i = 0; i < diff.length; i++) {
				this._delete(diff[i]);
			}

			return this;
		}

		/**
   * Public method to see if an object exists
   * @returns {boolean}
   */

	}, {
		key: 'exists',
		value: function exists() {
			return this._exists.apply(this, arguments);
		}

		/**
   * Add many objects to the collection
   * @param {...object} arguments - one or more objects
   * @returns {Manager}
   */

	}, {
		key: 'addObjects',
		value: function addObjects() {
			var data = arguments.length > 1 ? [].slice.call(arguments).sort() : arguments[0];
			for (var i in data) {
				var e = data[i];
				this.addObject(e);
			}
			return this;
		}

		/**
   * Public method to add an object
   * @returns {*}
   */

	}, {
		key: 'addObject',
		value: function addObject() {
			return this._add.apply(this, arguments);
		}

		/**
   * Public method to get an object
   * @returns {*}
   */

	}, {
		key: 'getObject',
		value: function getObject() {
			return this._get.apply(this, arguments);
		}

		/**
   * Public method to update an object
   * @returns {*}
   */

	}, {
		key: 'updateObject',
		value: function updateObject() {
			return this._update.apply(this, arguments);
		}

		/**
   * Public method to delete an object
   * @returns {*}
   */

	}, {
		key: 'deleteObject',
		value: function deleteObject() {
			return this._delete.apply(this, arguments);
		}

		/**
   * Public method to delete all objects
   * @returns {*}
   */

	}, {
		key: 'deleteObjects',
		value: function deleteObjects() {
			return this._empty();
		}

		/**
   * Serialize all objects in some way
   * @param {number} [index=0] - index to start at
   * @param {number} [max=0] - max amount to serialize
   * @returns {object}
   */

	}, {
		key: 'serializer',
		value: function serializer() {
			var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			var objects = [];
			//var c = 0;
			Util.each(this.objects, function (i, e) {
				// if(c >= max)
				// 	return false;
				if (e.toObject) objects.push(e.toObject());
				//c++;
			});
			return {
				objects: objects
			};
		}
	}]);

	return Manager;
}(EventSystem);

/*!
 * template
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * A re-useable DOM generator that can
 * create new jQuery objects using the
 * 'new' keyword. All jQuery functions
 * are applied to this object's $wrapper property
 */


var Template = function () {

	/**
  * Constructor
  * @param {object} [options]
  * @param {jQuery} [options.template=null] - if passed, this
  * jquery object will be deconstructed into a template
  * @param {boolean} [options.consumeTemplate=false] - whether to remove the
  * template from the dom, if it exists there
  * @param {boolean} [options.useTemplate=false] - whether to use the template
  * itself as this object, bound to $wrapper
  * @param {object} [options.struct]
  * @param {object} [options.struct.$wrapper] - any css class that indicates
  * what the $wrapper element should be for the template
  * @param {object} [options.dom] - optional preset dom settings, such as
  * html, attributes, etc, that are then used with _setup() method
  * @returns {Template}
  */
	function Template(options) {
		_classCallCheck(this, Template);

		var defaults = {
			template: null,
			consumeTemplate: false,
			useTemplate: false,
			// jquery elements for components
			struct: {
				$wrapper: ''
			},
			dom: {}
		};
		this.settings = $Util.opts(defaults, options);

		this._template()._setup();

		return this;
	}

	/**
  * Uses the provided template to create
  * the DOM structure, or if no template
  * was passed, calls _useDefaultTemplate
  * @returns {Template}
  * @private
  */


	_createClass(Template, [{
		key: '_template',
		value: function _template() {
			if (this.settings.template) this._useTemplate();else this._useDefaultTemplate();

			// attach all jquery functions to $wrapper
			$Util.jQuerify(this);
			return this;
		}

		/**
   * Deconstructs the template into object
   * properties based on this.settings.struct
   * @returns {Template}
   * @private
   */

	}, {
		key: '_useTemplate',
		value: function _useTemplate() {
			var $template = this.settings.template;
			// conver string to jquery
			if (isString($template)) {
				$template = $($template);
			} else if ($template instanceof $) {
				// remove the templates id attr
				if (!this.settings.useTemplate) $template = $template.clone().removeAttr('id');
				// remove the template from the DOM
				if (this.settings.consumeTemplate) $template.remove();
			} else if ($template instanceof $ === false) {
				throw new ReferenceError("Template.useTemplate: first argument must be a string or jquery");
			}

			// search for the HTML components
			// then add them to this object
			// eg this.$image
			var self = this;
			for (var i in this.settings.struct) {
				var struct = this.settings.struct[i];
				self[i] = $template.find(struct);
			}
			this.$wrapper = $($template.get(0));

			return this;
		}

		/**
   * Optionally provide a default
   * way to construct the DOM object
   * @returns {Template}
   * @private
   */

	}, {
		key: '_useDefaultTemplate',
		value: function _useDefaultTemplate() {
			// implement in child
			return this;
		}

		/**
   * Setup the Template dom if there
   * are any settings for it
   */

	}, {
		key: '_setup',
		value: function _setup() {
			//var d = this.settings.dom;
			//if(d)
			//   this.html(d.html);
			// implement in child
			return this;
		}
	}]);

	return Template;
}();
/*!
 * templateManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Manage DOM elements/Templates and appends
 * them to the $wrapper property.
 * Provides a function to swap the
 * active DOM element with another
 * @extends Manager
 */


var TemplateManager = function (_Manager) {
	_inherits(TemplateManager, _Manager);

	/**
  * Constructor
  * @param {object} [options]
  * @param {jQuery|string} [options.template=null] - the template object to create
  * when the manager creates new objects
  * @param {object} [options.$wrapper=$('<div class="manager"></div>')] - the
  * TemplateManager's $wrapper property, where all managed Templates are appended
  * @returns {TemplateManager}
  */
	function TemplateManager(options) {
		var _ret2;

		_classCallCheck(this, TemplateManager);

		if (!isDefined(options.template)) throw new ReferenceError("TemplateManager.constructor: options must have a template property");

		var _this2 = _possibleConstructorReturn(this, (TemplateManager.__proto__ || Object.getPrototypeOf(TemplateManager)).call(this, options));

		_this2.template = options.template;
		_this2.$wrapper = options.$wrapper ? options.$wrapper : $('<div class="manager"></div>');
		$Util.jQuerify(_this2);

		_this2.$template = isString(options.template) ? $(options.template) : options.template;

		// alias
		_this2.templates = _this2.objects;

		// current active template if applicable
		_this2.current = null;

		return _ret2 = _this2, _possibleConstructorReturn(_this2, _ret2);
	}

	/**
  * Add an object to the collection
  * and append it to the $wrapper.
  * Accepts a Template object or jQuery
  * @returns {jQuery|Template}
  * @private
  */


	_createClass(TemplateManager, [{
		key: '_add',
		value: function _add() {
			var obj = _get2(TemplateManager.prototype.__proto__ || Object.getPrototypeOf(TemplateManager.prototype), '_add', this).apply(this, arguments);
			// arguments[0].$wrapper for Template objects
			this.$wrapper.append(arguments[0].$wrapper || arguments[0]);
			return obj;
		}

		/**
   * Update a template by simply re-populating it
   * @param {object} template - template data
   * @returns {TemplateManager}
   * @private
   */

	}, {
		key: '_update',
		value: function _update(template) {
			var id = this.getId(template);
			var $template = this.templates[id];
			this.populateTemplate($template, template);
			this.trigger('update', $template);
			return this;
		}

		/**
   * Deletes an object from the collection
   * and removes it from the dom.
   * Accepts a Template object or jQuery
   * @returns {TemplateManager}
   * @private
   */

	}, {
		key: '_delete',
		value: function _delete(id) {
			this.templates[id].remove();
			_get2(TemplateManager.prototype.__proto__ || Object.getPrototypeOf(TemplateManager.prototype), '_delete', this).call(this, id);
			return this;
		}

		/**
   * Create a template object that this manager manages
   * @param {object} data - data to populate the template with
   * Contains keys whos names are identical with [data-name]
   * or [name] attribute values within the template's elements,
   * so $.fn.populate may appropriately populate html or inputs
   * @returns {*|null|Template}
   * @private
   */

	}, {
		key: '_create',
		value: function _create(data) {
			var id = this.getId(data);
			if (!id) throw new Error("TemplateManager._add: templates must have a " + this.settings.identifier + " property");

			// clone the template and populate it with data
			var $template = this.$template.clone();
			// add a flag for first updates
			$template.isFirstUpdate = true;
			this.populateTemplate($template, data);

			return this._add($template, id);
		}

		/**
   * Given a set of data, create or update existing Templates
   * @param {object} data - a collection of objects
   * that have keys whos names are identical with [data-name]
   * or [name] attribute values within the template's elements,
   * so $.fn.populate may appropriately populate html or inputs
   * todo: this is literally a clone of manage with no process, and a _create call
   * @returns {TemplateManager}
   */

	}, {
		key: 'build',
		value: function build(data) {
			if (!isObject(data) && this.settings.useObjectNames) throw new Error("TemplateManager.build: to use option useObjectNames, object passed to build() must be an object.");

			var self = this;
			var id = this.settings.identifier;
			// maintain an array of ids found in data
			// then xreference this to see which objects
			// no longer exist (data is the master here)
			var dataIds = [];

			// add or update objects
			for (var i in data) {
				var e = data[i];

				if (this.settings.useObjectNames) e[id] = i;

				// ids must be defined within objects
				// there is no other way to know if an
				// object is new or old otherwise
				if (!isDefined(e[id])) return console.error("TemplateManager.build: cannot manage objects with no ids");

				// objectIds will always be strings
				var objId = e[id].toString();
				var obj = self.objects[objId];
				if (isDefined(obj)) self._update(e);else self._create(e);
				dataIds.push(objId);
			}

			// diff the array of object ids
			// with the array of data ids
			var objectIds = this.getIds();
			var diff = Array.diff(objectIds, dataIds);

			// delete any objects that are
			// no longer found in data
			for (i = 0; i < diff.length; i++) {
				this._delete(diff[i]);
			}

			return this;
		}

		/**
   * Populate a Template with data.
   * If any child elements have [data-update] set to
   * false, set a new attr [data-populate] to false. This way, the
   * element is only updated the first time.
   * This prevents controls, like selects from "popping"
   * @param {jQuery} $template - Template to populate
   * @param {object} data - template data.
   * @returns {TemplateManager}
   */

	}, {
		key: 'populateTemplate',
		value: function populateTemplate($template, data) {
			$template.populateChildren(data);

			// set elements that don't want to be updated
			// to have data-populate="false"
			// the isFirstUpdate flag was added in _add
			if ($template.isFirstUpdate) {
				$template.find('[data-update="false"]').attr('data-populate', false);
				$template.isFirstUpdate = false;
			}
			return this;
		}

		/**
   * If managing hidden objects - where
   * only one should be shown at a time -
   * hides the current object dom and shows
   * the requested one
   * @param {string} name - name of the object in the collection
   * @returns {TemplateManager}
   */

	}, {
		key: 'setCurrent',
		value: function setCurrent(name) {
			var self = this;
			var t = this.templates[name];
			if (isDefined(t)) {
				if (!isNull(this.current)) {
					this.current.slideUp(function () {
						show();
						self.current = t;
					});
				} else {
					show();
					this.current = t;
				}
			} else console.error("TemplateManager.setCurrent: object not found.");

			return this;

			/**
    * Slidedown the object
    */
			function show() {
				t.slideDown();
			}
		}
	}]);

	return TemplateManager;
}(Manager);
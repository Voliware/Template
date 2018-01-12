"use strict";

var _get2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * jQuery.extendext 0.1.2
 *
 * Copyright 2014-2016 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 *
 * Based on jQuery.extend by jQuery Foundation, Inc. and other contributors
 */

/*jshint -W083 */
(function ($) {
	"use strict";

	$.extendext = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false,
		    arrayMode = 'default';

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i++] || {};
		}

		// Handle array mode parameter
		if (typeof target === "string") {
			arrayMode = target.toLowerCase();
			if (arrayMode !== 'concat' && arrayMode !== 'replace' && arrayMode !== 'extend') {
				arrayMode = 'default';
			}

			// Skip the string param
			target = arguments[i++] || {};
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !$.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) !== null) {
				// Special operations for arrays
				if ($.isArray(options) && arrayMode !== 'default') {
					clone = target && $.isArray(target) ? target : [];

					switch (arrayMode) {
						case 'concat':
							target = clone.concat($.extend(deep, [], options));
							break;

						case 'replace':
							target = $.extend(deep, [], options);
							break;

						case 'extend':
							options.forEach(function (e, i) {
								if ((typeof e === "undefined" ? "undefined" : _typeof(e)) === 'object') {
									var type = $.isArray(e) ? [] : {};
									clone[i] = $.extendext(deep, arrayMode, clone[i] || type, e);
								} else if (clone.indexOf(e) === -1) {
									clone.push(e);
								}
							});

							target = clone;
							break;
					}
				} else {
					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if (target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {

							if (copyIsArray) {
								copyIsArray = false;
								clone = src && $.isArray(src) ? src : [];
							} else {
								clone = src && $.isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = $.extendext(deep, arrayMode, clone, copy);

							// Don't bring in undefined values
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	};
})(jQuery);
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
		key: "each",

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
if (typeof isNullOrUndefined === 'undefined') {
	window.isNullOrUndefined = function (x) {
		return x === null || x === 'undefined';
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
		return x !== null && !isArray(x) && (typeof x === "undefined" ? "undefined" : _typeof(x)) === 'object';
	};
}
if (typeof isArray === 'undefined') {
	window.isArray = function (x) {
		return x !== null && Array.isArray(x);
	};
}
if (typeof getType === 'undefined') {
	//http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
	window.getType = function (x) {
		if (x === null) return "[object Null]";
		return Object.prototype.toString.call(x);
	};
}
if (typeof createGuid === 'undefined') {
	window.createGuid = function createGuid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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
if (typeof Object.set === 'undefined') {
	Object.set = function (obj, data) {
		for (var key in data) {
			if (obj.hasOwnProperty(key)) {
				obj[key] = data[key];
			}
		}
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
/**
 * Deep copy an object (make copies of all its object properties, sub-properties, etc.)
 * An improved version of http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
 * that doesn't break if the constructor has required parameters
 *
 * It also borrows some code from http://stackoverflow.com/a/11621004/560114
 */
function deepCopy(src, /* INTERNAL */_visited, _copiesVisited) {
	if (src === null || (typeof src === "undefined" ? "undefined" : _typeof(src)) !== 'object') {
		return src;
	}

	//Honor native/custom clone methods
	if (typeof src.clone == 'function') {
		return src.clone(true);
	}

	//Special cases:
	//Date
	if (src instanceof Date) {
		return new Date(src.getTime());
	}
	//RegExp
	if (src instanceof RegExp) {
		return new RegExp(src);
	}
	//DOM Element
	if (src.nodeType && typeof src.cloneNode == 'function') {
		return src.cloneNode(true);
	}

	// Initialize the visited objects arrays if needed.
	// This is used to detect cyclic references.
	if (_visited === undefined) {
		_visited = [];
		_copiesVisited = [];
	}

	// Check if this object has already been visited
	var i,
	    len = _visited.length;
	for (i = 0; i < len; i++) {
		// If so, get the copy we already made
		if (src === _visited[i]) {
			return _copiesVisited[i];
		}
	}

	//Array
	if (Object.prototype.toString.call(src) == '[object Array]') {
		//[].slice() by itself would soft clone
		var ret = src.slice();

		//add it to the visited array
		_visited.push(src);
		_copiesVisited.push(ret);

		i = ret.length;
		while (i--) {
			ret[i] = deepCopy(ret[i], _visited, _copiesVisited);
		}
		return ret;
	}

	//If we've reached here, we have a regular object

	//make sure the returned object has the same prototype as the original
	var proto = Object.getPrototypeOf ? Object.getPrototypeOf(src) : src.__proto__;
	if (!proto) {
		proto = src.constructor.prototype; //this line would probably only be reached by very old browsers
	}
	var dest = object_create(proto);

	//add this object to the visited array
	_visited.push(src);
	_copiesVisited.push(dest);

	for (var key in src) {
		//Note: this does NOT preserve ES5 property attributes like 'writable', 'enumerable', etc.
		//For an example of how this could be modified to do so, see the singleMixin() function
		dest[key] = deepCopy(src[key], _visited, _copiesVisited);
	}
	return dest;
}

//If Object.create isn't already defined, we just do the simple shim,
//without the second argument, since that's all we need here
var object_create = Object.create;
if (typeof object_create !== 'function') {
	object_create = function object_create(o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}
/*!
 * util-jquery
 * https://github.com/Voliware/Util
 * Licensed under the MIT license.
 */

if (!isDefined($)) throw new ReferenceError("util-jquery requires jquery 2.2.2 or greater");

// helpers
if (typeof isJquery === 'undefined') {
	window.isJquery = function (x) {
		return x instanceof $;
	};
}

(function ($) {

	/**
  * Checks if an element has an attribute
  * @param {string} attr - attribute name
  * @returns {boolean} - true if it does, false otherwise
  */
	$.fn.hasAttr = function (attr) {
		return $(this).is('[' + attr + ']');
	};

	/**
  * Populate a DOM object in the appropriate way.
  * Extend with $Util.populate object
  * @param {string|number|jQuery} data
  * @param {boolean} [trigger=true] - whether to call change and input events
  */
	$.fn.populate = function (data) {
		var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		var $this = $(this);

		// don't popualte if data-populate=false
		if ($this.data('populate') === false) return this;

		var tag = $this.prop("tagName").toLowerCase();
		var type = $this.attr('type');

		// populate using extensions or defaults
		var extension = getExtension(tag);
		if (extension) extension.call(this, data);else defaultPopulate(tag, type, data);

		// prevent further populates if update is set to false
		if ($this.data('update') === false) this.attr('data-populate', false);

		// trigger input and change events
		if (trigger) $this.trigger('change').trigger('input');

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
					var dataStr = data.toString();
					$this.filter('[value="' + dataStr + '"]').prop('checked', true);
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
  * attribute [data-name="key"] or [name="key"]. Uses
  * $.populate(data) to appropriately fill in the found element.
  * @param {object} data
  * @param {boolean} [trigger=true] - whether to call change and input events
  * @returns {jQuery}
  */
	$.fn.populateChildren = function (data) {
		var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		var $this = $(this);
		$.each(data, function (i, e) {
			var $elInput = $this.find('[name="' + i + '"]');
			var $el = $this.find('[data-name="' + i + '"]');
			if ($elInput.length > 0 && $elInput.data('populate') !== false) $elInput.populate(e, trigger);
			if ($el.length > 0 && $el.data('populate') !== false) $el.populate(e, trigger);
		});
		return this;
	};

	/**
  * Populate an elements attributes by matching
  * data keys with attributes of the same name.
  * @param {object} data
  * @returns {jQuery}
  */
	$.fn.populateAttr = function (data) {
		var $this = $(this);
		$.each(data, function (i, e) {
			$this.attr('i', e);
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
  * Append option(s) to a select
  * @param {*} arguments - Either an object of key/value pairs, where the key is the
  * option value and the value is the string within the tags, and a third key is
  * an optional disabled state,
  * or a key and value as two parameters to add one option, with an optional bool
  * for option state
  * @example addToSelect(0, 'Male', true)
  * @example addToSelect(1, 'Female')
  * @example addToSelect({0 : 'Male'}, {1 : 'Female'})
  * @example addToSelect({value : 0, text : 'Male', disabled : true})
  * @example addToSelect({value : 0, text : 'Male', disabled : true}, {value : 1, text : 'Female'})
  * @example addToSelect([{value : 0, text : 'Male'}])
  * @example addToSelect({ female : {value : 1, text : 'Female'}})
  * @returns {jQuery}
  */
	$.fn.addToSelect = function () {
		var $this = $(this);
		if (!$this.is('select')) {
			return this;
		}

		// options always end up in an array
		var options = [];

		// case: multiple arguments
		if (arguments.length > 1) {

			// case: arguments of strings/numbers, single option
			if (isString(arguments[0]) || isNumber(arguments[0])) {
				var disabled = isDefined(arguments[2]) ? arguments[2] : false;
				var option = {
					value: arguments[0],
					text: arguments[1],
					disabled: disabled
				};
				options = [option];
			}
			// case: arguments of multiple objects (comma seperated)
			else {
					if (isObject(arguments[0])) {
						options = arguments;
					}
				}
		}
		// case: single object argument
		else if (isObject(arguments[0])) {
				// case: well formed single object
				if (arguments[0].hasOwnProperty('value')) {
					options = [arguments[0]];
				}
				// case: object of objects
				else if (Object.keys(arguments[0]).length > 1) {
						$.each(arguments[0], function (i, e) {
							// case: objects are named
							if (isObject(e)) {
								options.push(e);
							}
							// case: objects are simple key/values
							else {
									options.push({
										value: i,
										text: e
									});
								}
						});
					}
					// case: single object
					else {
							options = [arguments[0]];
						}
			}
			// case: array of objects
			else if (Array.isArray(arguments[0])) {
					options = arguments[0];
				}

		// add options
		for (var i = 0; i < options.length; i++) {
			var _option = processOption(options[i]);
			var $opt = '<option value="' + _option.value + '"';
			if (_option.disabled) {
				$opt += ' disabled';
			}
			$opt += '>' + _option.text + '</option>';
			$this.append($opt);
		}

		return this;

		/**
   * Process an option ensuring it is formatted correctly
   * @param {object} option
   * @returns {object}
   */
		function processOption(option) {
			if (option.hasOwnProperty('value') === false) {
				var value = Object.keys(option)[0];
				var text = option[value];
				return {
					value: value,
					text: text
				};
			} else {
				return option;
			}
		}
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

/**
 * jQuery utility functions
 */

var $Util = function () {
	function $Util() {
		_classCallCheck(this, $Util);
	}

	_createClass($Util, null, [{
		key: "jQuerify",


		/**
   * Attaches all jQuery functions to a
   * $wrapper property of an object, but
   * always returns the base object
   * @param {*} obj - some object that has a $wrapper property
   * @param {boolean} [override=false] - whether to override any already-named properties
   * @param {jQuery} obj.$wrapper
   */
		value: function jQuerify(obj) {
			var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			if (!obj.$wrapper) throw new ReferenceError('$Util.jQuerify: $wrapper must be a property of the first argument');

			Util.each($Util.jqueryPrototype, function (i, e) {
				// continue if override is false
				if (isDefined(obj[e]) && !override) return true;

				// special cases where we shouldn't return the jquerified object
				if (e === 'find') {
					obj[e] = function () {
						var _obj$$wrapper;

						return (_obj$$wrapper = obj.$wrapper)[e].apply(_obj$$wrapper, arguments);
					};
					return true;
				}

				obj[e] = function () {
					var _obj$$wrapper2;

					(_obj$$wrapper2 = obj.$wrapper)[e].apply(_obj$$wrapper2, arguments);
					return obj;
				};
			});
		}

		/**
   * Convenient wrapper for merging defaults
   * and options object with jquery deep $.extend
   * @param {object} defaults - the default settings
   * @param {object} options - set options
   * @param {string} [arrayMode] - optional array mode
      */

	}, {
		key: "opts",
		value: function opts(defaults, options, arrayMode) {
			if (isDefined(arrayMode)) {
				return $.extendext(true, arrayMode, defaults, options);
			} else {
				return $.extend(true, defaults, options);
			}
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
		key: "_createEvent",
		value: function _createEvent(name) {
			return this.events[name] = { callbacks: [] };
		}

		/**
   * Destroy an event
   * @param {string} name - name of the event
   * @returns {EventSystem}
   * @private
   */

	}, {
		key: "_destroy",
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
		key: "on",
		value: function on(name, callback) {
			var event = this.events[name];

			if (!isDefined(event)) event = this._createEvent(name);

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
		key: "off",
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
		key: "offAll",
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
		key: "trigger",
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
		key: "emit",
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
			useObjectNames: false,
			// max number of objs to manage
			max: 0
		};
		_this.settings = Object.assign(defaults, options);

		// all child classes will use
		// a more friendly name for objects
		// so any mutations must be done
		// to the object itself, not this ref
		_this.objects = {};
		_this.count = 0;

		// cached and processed data passed to manage()
		_this._cachedData = {};
		_this._processedData = {};
		// last serialized collection
		_this.serializedObjects = [];
		// a flag that is set to true when the add/edit/delete
		// functions are called, to indicate that the
		// previously serialized data is now old
		_this.requiresNewSerialize = false;

		return _ret = _this, _possibleConstructorReturn(_this, _ret);
	}

	/**
  * Check if an object exists in the collection
  * @param {...(number|object|string)} arguments - the object or the id of the object
  * @returns {boolean}
  * @private
  */


	_createClass(Manager, [{
		key: "_exists",
		value: function _exists() {
			var arg = arguments[0];
			if (isString(arg) || isNumber(arg)) return isDefined(this.objects[arg]);else return isDefined(this.objects[arg[this.settings.identifier]]);
		}

		/**
   * Get an object in the managed collection
   * by id (string/number) or by an object's
   * property as set in this.settings.identifier
   * @param {...(number|object|string)} arguments - the object or the id of the object
   * @returns {*|null}
   * @private
   */

	}, {
		key: "_get",
		value: function _get() {
			var arg = arguments[0];
			var obj = null;
			var identifier = this.settings.identifier;

			// an object id was passed
			if (isString(arg) || isNumber(arg)) {
				String(arg);
				if (this.objects[arg]) obj = this.objects[arg];
			}
			// an object was passed
			else if (this.objects[arg[identifier]]) {
					obj = this.objects[arg[identifier]];
				}

			return obj;
		}

		/**
   * Adds an object to the collection.
   * Replaces any existing object with the same identifier.
   * @param {object} obj - the object to add
   * @param {string} [id] - the id of the object
   * @returns {*}
   * @private
   */

	}, {
		key: "_add",
		value: function _add(obj, id) {
			var self = this;
			var identifier = this.settings.identifier;

			// if an id is passed, add it to
			// the object as the identifier property
			if (isDefined(id)) {
				String(id);
				obj[identifier] = id;
				this.objects[id] = obj;
				postAdd();
			}
			// if no id is passed, check that it has
			// an identifier property already
			else if (!isNullOrUndefined(obj[identifier])) {
					this.objects[obj[identifier]] = obj;
					postAdd();
				}
				// otherwise, it cannot be managed
				else {
						console.warn('Manager._add: cannot add an object with no identifier');
					}

			return obj;

			/**
    * After a successful add, trigger
    * the event and increase the counter
    */
			function postAdd() {
				self.requiresNewSerialize = true;
				self.trigger('add', obj);
				self.count++;
				obj._count = self.count;
			}
		}

		/**
   * Replaces or adds an object
   * @param {object} obj - the object to update
   * @param {string} [id] - the id of the object
   * @returns {*}
   * @private
   */

	}, {
		key: "_update",
		value: function _update(obj, id) {
			var self = this;
			var identifier = this.settings.identifier;

			if (isDefined(id)) {
				String(id);
				this.objects[id] = obj;
				postUpdate();
			} else if (!isNullOrUndefined(obj[identifier])) {
				this.objects[obj[identifier]] = obj;
				postUpdate();
			} else {
				console.warn('Manager._update: cannot update an object with no identifier');
			}

			return obj;

			/**
    * After a successful update, trigger
    * the event and reset the serialize flag
    */
			function postUpdate() {
				self.requiresNewSerialize = true;
				self.trigger('update', obj);
				self.count++;
				obj._count = self.count;
			}
		}

		/**
   * Deletes an object from the collection
   * @param {...(number|object|string)} arguments - the object or the id of the object
   * @returns {Manager}
   * @private
   */

	}, {
		key: "_delete",
		value: function _delete() {
			var arg = arguments[0];
			var obj = null;
			var identifier = this.settings.identifier;

			obj = this._get.apply(this, arguments);

			if (obj) {
				var id = obj[identifier];
				this.trigger('delete', id);
				delete this.objects[id];
				this.requiresNewSerialize = true;
				if (this.count > 0) this.count--;
			} else {
				console.error('Manager._delete: cannot delete an object with no identifier');
			}

			return this;
		}

		/**
   * Deletes all objects from the collection
   * @returns {Manager}
   * @private
   */

	}, {
		key: "_empty",
		value: function _empty() {
			// ..in likely case there are references
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
		key: "_cacheData",
		value: function _cacheData(data) {
			this._cachedData = deepCopy(data);
			return this;
		}

		/**
   * Process all incoming data to manage
   * @param {object} data
   * @returns {Manager}
   * @private
   */

	}, {
		key: "_processData",
		value: function _processData(data) {
			this._processedData = deepCopy(data);
			return this;
		}

		/**
   * Get the ids of all objects
   * @returns {string[]}
   */

	}, {
		key: "getIds",
		value: function getIds() {
			var ids = [];
			for (var i in this.objects) {
				var id = this.getId(this.objects[i]);
				ids.push(id);
			}
			return ids;
		}

		/**
   * Get the id of an object
   * @param {object} obj
   * @returns {string|undefined}
   */

	}, {
		key: "getId",
		value: function getId(obj) {
			return obj[this.settings.identifier].toString();
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
		key: "manage",
		value: function manage(data) {
			this._cacheData(data);
			this._processData(data);

			if (!isObject(this._processedData) && this.settings.useObjectNames) throw new Error("Manager.manage: to use option useObjectNames, object passed to manage() must be an object.");

			var self = this;
			var id = this.settings.identifier;
			// maintain an array of ids found in data
			// then xreference this to see which objects
			// no longer exist (data is the master here)
			var dataIds = [];

			// add or update objects
			for (var i in this._processedData) {
				var e = this._processedData[i];

				if (this.settings.useObjectNames) e[id] = i;

				// ids must be defined within objects
				// there is no other way to know if an
				// object is new or old
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
		key: "exists",
		value: function exists() {
			return this._exists.apply(this, arguments);
		}

		/**
   * Add many objects to the collection
   * @param {...object} arguments - one or more objects
   * @returns {Manager}
   */

	}, {
		key: "addObjects",
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
		key: "addObject",
		value: function addObject() {
			return this._add.apply(this, arguments);
		}

		/**
   * Public method to get an object
   * @returns {*}
   */

	}, {
		key: "getObject",
		value: function getObject() {
			return this._get.apply(this, arguments);
		}

		/**
   * Public method to update an object
   * @returns {*}
   */

	}, {
		key: "updateObject",
		value: function updateObject() {
			return this._update.apply(this, arguments);
		}

		/**
   * Public method to delete an object
   * @returns {*}
   */

	}, {
		key: "deleteObject",
		value: function deleteObject() {
			return this._delete.apply(this, arguments);
		}

		/**
   * Public method to delete all objects
   * @returns {*}
   */

	}, {
		key: "deleteObjects",
		value: function deleteObjects() {
			return this._empty();
		}

		/**
   * Serialize all objects that have a serializer method
   * @param {number} [index=0] - index to start at
   * @param {number} [max=0] - max amount to return
   * @returns {object[]}
   */

	}, {
		key: "serializer",
		value: function serializer() {
			var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			if (this.requiresNewSerialize) {
				var self = this;
				this.serializedObjects = [];
				$.each(this.objects, function (i, e) {
					if (e.serializer) self.serializedObjects.push(e.serializer());
				});
				this.requiresNewSerialize = false;
			}

			max = max > 0 ? max : this.serializedObjects.length;
			return this.serializedObjects.slice(index, max);
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
			}
		};
		this.settings = $Util.opts(defaults, options);

		this._template();

		// properties related to template population
		this._cachedData = {};
		this._processedData = {};

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
		key: "_template",
		value: function _template() {
			if (this.settings.template) this._useTemplate();else this._useDefaultTemplate();

			this.$wrapper.removeClass('template');

			// attach all jquery functions to Template
			$Util.jQuerify(this);

			return this;
		}

		/**
   * Deconstructs the template into object
   * properties based on this.settings.struct
   * @param {jQuery|string} [$template=null] - a string or jquery object to use as the template.
   * If null, will use what is set in this.settings.template
   * @returns {Template}
   * @private
   */

	}, {
		key: "_useTemplate",
		value: function _useTemplate() {
			var $template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			$template = $template || this.settings.template;
			// conver string to jquery
			if (isString($template)) {
				$template = $($template);
			} else if ($template instanceof $) {
				// remove the templates id attr
				if (!this.settings.useTemplate) $template = $template.clone().removeAttr('id');
				// remove the template from the DOM
				if (this.settings.consumeTemplate) $template.remove();
			} else if ($template instanceof $ === false) {
				throw new ReferenceError("Template._useTemplate: first argument must be a string or jquery");
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
		key: "_useDefaultTemplate",
		value: function _useDefaultTemplate() {
			// var template = '<div></div';
			// this._useTemplate(template);
			return this;
		}

		// data

		/**
   * Cache data into a new object.
   * @param {object} data
   * @returns {Template}
   * @private
   */

	}, {
		key: "_cacheData",
		value: function _cacheData(data) {
			this._cachedData = $.extend(true, {}, data);
			return this;
		}

		/**
   * Process data into a new object.
   * @param {object} data
   * @returns {Template}
   * @private
   */

	}, {
		key: "_processData",
		value: function _processData(data) {
			this._processedData = $.extend(true, {}, data);
			return this;
		}

		/**
   * Override popualteChildren to first cache and process data.
   * Use the processed data to populate the Template.
   * @param {object} data
   * @returns {Template}
   */

	}, {
		key: "populateChildren",
		value: function populateChildren(data) {
			this._cacheData(data);
			this._processData(data);
			this.$wrapper.populateChildren(this._processedData);
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
  * @param {jQuery|string|Template} [options.template=null] - the template object to create
  * when the manager creates new objects
  * @param {object} [options.$wrapper=$('<div class="manager"></div>')] - the
  * TemplateManager's $wrapper property, where all managed Templates are appended
  * @returns {TemplateManager}
  */
	function TemplateManager() {
		var _ret2;

		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, TemplateManager);

		var _this2 = _possibleConstructorReturn(this, (TemplateManager.__proto__ || Object.getPrototypeOf(TemplateManager)).call(this, options));

		_this2.$wrapper = options.$wrapper ? options.$wrapper : $('<div class="manager"></div>');
		$Util.jQuerify(_this2);

		_this2.template = isString(options.template) ? $(options.template) : options.template;

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
		key: "_add",
		value: function _add() {
			var obj = _get2(TemplateManager.prototype.__proto__ || Object.getPrototypeOf(TemplateManager.prototype), "_add", this).apply(this, arguments);
			// arguments[0].$wrapper for Template objects
			// arguments[0] for native jQuery objects
			this.$wrapper.append(arguments[0].$wrapper || arguments[0]);
			return obj;
		}

		/**
   * Update a template by simply re-populating it
   * @param {object} data - template data
   * @returns {TemplateManager}
   * @private
   */

	}, {
		key: "_update",
		value: function _update(data) {
			var id = this.getId(data);
			var $template = this.templates[id];
			this._populateTemplate($template, data);
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
		key: "_delete",
		value: function _delete() {
			var template = this._get.apply(this, arguments);
			if (template) {
				template.remove();
				_get2(TemplateManager.prototype.__proto__ || Object.getPrototypeOf(TemplateManager.prototype), "_delete", this).call(this, template);
			} else {
				console.error("TemplateManager._delete: could not find template object");
			}
			return this;
		}

		/**
   * Create a template object that this manager manages
   * @param {string} id - id of the object to create and then manage
   * @param {object} [data={}] - data to populate a jquery template with or construct a Template with
   * @returns {*|null|Template}
   * @private
   */

	}, {
		key: "_create",
		value: function _create(id) {
			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			if (!this.template) throw new ReferenceError("TemplateManager._create: no template option was passed to constructor");

			// create a new template if it is a Template class
			// or clone it if it is a jquery object
			var template;
			if (this.template.prototype instanceof Template) template = new this.template(data);else if (isJquery(this.template)) template = this.template.clone();

			this._populateTemplate(template, data);

			return this._add(template, id);
		}

		/**
   * Deletes all objects from the collection
   * @returns {Manager}
   * @private
   */

	}, {
		key: "_empty",
		value: function _empty() {
			for (var i in this.objects) {
				this.objects[i].remove();
				delete this.objects[i];
			}
			return this;
		}

		/**
   * Populate the template
   * @param {jQuery|Template} template
   * @param {*} data
   * @returns {TemplateManager}
   * @private
   */

	}, {
		key: "_populateTemplate",
		value: function _populateTemplate(template, data) {
			template.populateChildren(data);
			return this;
		}

		/**
   * Redirect manage to build
   * @param {object|object[]} data
   * @returns {TemplateManager}
   */

	}, {
		key: "manage",
		value: function manage(data) {
			return this.build(data);
		}

		/**
   * Given a set of data, create or update existing Templates
   * @param {object} data - a collection of objects
   * that have keys whos names are identical with [data-name]
   * or [name] attribute values within the template's elements,
   * so $.fn.populate may appropriately populate html or inputs
   * todo: this is literally a clone of manage with a _create call
   * @returns {TemplateManager}
   */

	}, {
		key: "build",
		value: function build(data) {
			this._cacheData(data);
			this._processData(data);

			if (!isObject(this._processedData) && this.settings.useObjectNames) throw new Error("TemplateManager.build: to use option useObjectNames, object passed to build() must be an object.");

			var self = this;
			var id = this.settings.identifier;
			// maintain an array of ids found in data
			// then xreference this to see which objects
			// no longer exist (data is the master here)
			var dataIds = [];

			// add or update objects
			for (var i in this._processedData) {
				var e = this._processedData[i];

				if (this.settings.useObjectNames) e[id] = i;

				// ids must be defined within objects
				// there is no other way to know if an
				// object is new or old otherwise
				if (!isDefined(e[id])) return console.error("TemplateManager.build: cannot manage objects with no ids");

				// objectIds will always be strings
				var objId = e[id].toString();
				var obj = self.objects[objId];
				if (isDefined(obj)) self._update(e);else self._create(objId, e);
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
   * If managing hidden objects - where
   * only one should be shown at a time -
   * hides the current object dom and shows
   * the requested one
   * @param {string} name - name of the object in the collection
   * @returns {TemplateManager}
   */

	}, {
		key: "setCurrent",
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

		/**
   * Public method to create a template
   * @returns {*}
   */

	}, {
		key: "createTemplate",
		value: function createTemplate() {
			return this._create.apply(this, arguments);
		}

		/**
   * Add many templates to the collection
   * @param {...object} arguments - one or more objects
   * @returns {TemplateManager}
   */

	}, {
		key: "addTemplates",
		value: function addTemplates() {
			return _get2(TemplateManager.prototype.__proto__ || Object.getPrototypeOf(TemplateManager.prototype), "addObjects", this).apply(this, arguments);
		}

		/**
   * Public method to add a template
   * @returns {*}
   */

	}, {
		key: "addTemplate",
		value: function addTemplate() {
			return this._add.apply(this, arguments);
		}

		/**
   * Public method to get a template
   * @returns {*}
   */

	}, {
		key: "getTemplate",
		value: function getTemplate() {
			return this._get.apply(this, arguments);
		}

		/**
   * Public method to update a template
   * @returns {*}
   */

	}, {
		key: "updateTemplate",
		value: function updateTemplate() {
			return this._update.apply(this, arguments);
		}

		/**
   * Public method to delete a template
   * @returns {*}
   */

	}, {
		key: "deleteTemplate",
		value: function deleteTemplate() {
			return this._delete.apply(this, arguments);
		}

		/**
   * Public method to delete all templates
   * @returns {*}
   */

	}, {
		key: "deleteTemplates",
		value: function deleteTemplates() {
			return this._empty();
		}
	}]);

	return TemplateManager;
}(Manager);
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
		var _ret3;

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

		var _this3 = _possibleConstructorReturn(this, (Feedback.__proto__ || Object.getPrototypeOf(Feedback)).call(this, $Util.opts(defaults, options)));

		var self = _this3;

		if (_this3.settings.closeButton) {
			_this3.$close.click(function () {
				self.slideUp();
			});
		}

		return _ret3 = _this3, _possibleConstructorReturn(_this3, _ret3);
	}

	/**
  * Default feedback template
  * @returns {Feedback}
  * @private
  */


	_createClass(Feedback, [{
		key: "_useDefaultTemplate",
		value: function _useDefaultTemplate() {
			var template = '<div class="feedback">' + '<div class="feedback-icon"></div>' + '<div class="feedback-text"></div>';

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
		key: "_setClass",
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
		key: "_animateFeedback",
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
		key: "setFeedback",
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
/*!
 * col
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * A table column with inline editing support.
 * Used to build complex rows.
 * @extends Template
 */


var Col = function (_Template2) {
	_inherits(Col, _Template2);

	/**
  * Constructor
  * @param {object} options
  * @returns {Col}
  */
	function Col(options) {
		var _ret4;

		_classCallCheck(this, Col);

		var defaults = {
			inlineEdit: true,
			// options found in FormInput
			fieldOptions: {
				name: "input",
				type: 'text',
				tag: 'input'
			},
			struct: {
				$wrapper: 'td'
			}
		};

		var _this4 = _possibleConstructorReturn(this, (Col.__proto__ || Object.getPrototypeOf(Col)).call(this, $Util.opts(defaults, options)));

		var self = _this4;

		// properties
		_this4.value = 0;

		// states
		_this4.isInEditMode = false;

		// handlers
		if (_this4.settings.inlineEdit && !self.isInEditMode) {
			_this4.$wrapper.click(function () {
				self.toggleInlineEdit(true);
			});
		}

		return _ret4 = _this4, _possibleConstructorReturn(_this4, _ret4);
	}

	/**
  * Default template
  * @returns {Template}
  * @private
  */


	_createClass(Col, [{
		key: "_useDefaultTemplate",
		value: function _useDefaultTemplate() {
			var template = '<td><span data-name="' + this.settings.fieldOptions.name + '"></span></td>';
			return this._useTemplate(template);
		}

		/**
   * Set field options
   * @param {object} options
   * @param {string} options.name
   * @param {string} [options.type]
   * @param {string} [options.tag]
   * @returns {Col}
   */

	}, {
		key: "setFieldOptions",
		value: function setFieldOptions(options) {
			this.settings.fieldOptions.name = options.name;
			if (isDefined(options.type)) {
				this.settings.fieldOptions.type = options.type;
			}
			if (isDefined(options.tag)) {
				this.settings.fieldOptions.tag = options.tag;
			}

			this._useDefaultTemplate();
			return this;
		}

		/**
   * Toggle inline editing state
   * @param {boolean} state
   * @returns {Col}
   */

	}, {
		key: "toggleInlineEdit",
		value: function toggleInlineEdit(state) {
			this.isInEditMode = state;
			if (state) {
				this.$wrapper.children().wrap('<div class="childWrap" style="display:none;"></div>');
				this.createInlineField();
			} else {
				this.$wrapper.find(this.settings.fieldOptions.tag).remove();
				this.$wrapper.find('.childWrap').children().unwrap();
			}
			return this;
		}

		/**
   * Create an input or select for inline editing
   * @returns {Col}
   */

	}, {
		key: "createInlineField",
		value: function createInlineField() {
			var self = this;
			var field;
			switch (this.settings.fieldOptions.tag) {
				case 'select':
					field = new FormSelect(this.settings.fieldOptions);
					break;
				case 'input':
				default:
					field = new FormInput(this.settings.fieldOptions);
					break;
			}
			this.$wrapper.append(field.$wrapper);

			field.focus();
			field.val(this.value);
			field.blur(function () {
				if (self.isInEditMode) {
					self.trigger('edit', $(this).val());
					self.toggleInlineEdit(false);
				}
			});

			return this;
		}
	}]);

	return Col;
}(Template);
/*!
 * row
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * A table row with inline editing support.
 * Used to build complex rows.
 * @extends Template
 */


var Row = function (_Template3) {
	_inherits(Row, _Template3);

	/**
  * Constructor
  * @param {object} options
  * @returns {Row}
  */
	function Row(options) {
		var _ret5;

		_classCallCheck(this, Row);

		var defaults = {
			colIdentifier: 'name',
			struct: {
				$wrapper: 'tr'
			}
		};

		var _this5 = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, $Util.opts(defaults, options)));

		var self = _this5;

		// components
		_this5.colManager = new TemplateManager({
			identifier: _this5.settings.colIdentifier,
			useObjectNames: _this5.settings.useObjectNames,
			$wrapper: _this5.$wrapper
		}).on('add', function (row) {
			row.on('update', function (e, data) {
				self.trigger('update', data);
			});
		});

		// save any template columns
		_this5.$cols = [];
		_this5.$wrapper.find('td').each(function (i, e) {
			self.$cols.push($(e));
		});

		return _ret5 = _this5, _possibleConstructorReturn(_this5, _ret5);
	}

	/**
  * Default template
  * @returns {Row}
  * @private
  */


	_createClass(Row, [{
		key: "_useDefaultTemplate",
		value: function _useDefaultTemplate() {
			var template = '<tr></tr>';
			return this._useTemplate(template);
		}

		/**
   * Generate columns for the row
   * @param cols
   * @returns {Row}
   */

	}, {
		key: "generateColumns",
		value: function generateColumns(cols) {
			for (var i = 0; i < cols.length; i++) {
				var fieldOptions = {
					fieldOptions: {
						name: cols[i].name
					}
				};
				var colData = $.extend(true, fieldOptions, cols[i]);
				var col = new Col(colData);
				this.colManager.addObject(col);
				this.$wrapper.append(col.$wrapper);
			}
			for (i = 0; i < this.$cols.length; i++) {
				this.$wrapper.append(this.$cols[i]);
			}

			return this;
		}
	}]);

	return Row;
}(Template);
/*!
 * crudRow
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * CRUD row with read/update/delete buttons.
 * A virtual class to extend from.
 * @extends Row
 */


var CrudRow = function (_Row) {
	_inherits(CrudRow, _Row);

	/**
  * Constructor
  * @returns {CrudRow}
  */
	function CrudRow(options) {
		var _ret6;

		_classCallCheck(this, CrudRow);

		var defaults = {
			struct: {
				$deleteButton: '[name="deleteButton"]',
				$updateButton: '[name="updateButton"]',
				$viewButton: '[name="viewButton"]'
			}
		};

		var _this6 = _possibleConstructorReturn(this, (CrudRow.__proto__ || Object.getPrototypeOf(CrudRow)).call(this, $Util.opts(defaults, options)));

		return _ret6 = _this6, _possibleConstructorReturn(_this6, _ret6);
	}

	// delete

	/**
  * Attach delete button handlers
  * @returns {CrudRow}
  * @private
  */


	_createClass(CrudRow, [{
		key: "_attachDeleteButtonHandlers",
		value: function _attachDeleteButtonHandlers() {
			var self = this;
			this.$deleteButton.click(function () {
				self._deleteButtonAction();
			});
			return this;
		}

		/**
   * Action that occurs when delete button is clicked
   * @private
   */

	}, {
		key: "_deleteButtonAction",
		value: function _deleteButtonAction() {
			throw new Error("CrudRow._deleteButtonAction: must be implemented in child class");
		}

		// update

		/**
   * Attach update button handlers
   * @virtual
   * @private
   */

	}, {
		key: "_attachUpdateButtonHandlers",
		value: function _attachUpdateButtonHandlers() {
			var self = this;
			this.$updateButton.click(function () {
				self._updateButtonAction();
			});
			return this;
		}

		/**
   * Action that occurs when update button is clicked
   * @private
   */

	}, {
		key: "_updateButtonAction",
		value: function _updateButtonAction() {
			throw new Error("CrudRow._updateButtonAction: must be implemented in child class");
		}

		// view

		/**
   * Attach view button handlers
   * @virtual
   * @private
   */

	}, {
		key: "_attachViewButtonHandlers",
		value: function _attachViewButtonHandlers() {
			var self = this;
			this.$viewButton.click(function () {
				self._viewButtonAction();
			});
			return this;
		}

		/**
   * Action that occurs when view button is clicked
   * @private
   */

	}, {
		key: "_viewButtonAction",
		value: function _viewButtonAction() {
			throw new Error("CrudRow._viewButtonAction: must be implemented in child class");
		}

		/**
   * Initialize the row
   * @returns {CrudRow}
   */

	}, {
		key: "initialize",
		value: function initialize() {
			this._attachDeleteButtonHandlers()._attachUpdateButtonHandlers()._attachViewButtonHandlers();
			return this;
		}
	}]);

	return CrudRow;
}(Row);
/*!
 * table
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates and creates tables
 * @extends Template
 */


var Table = function (_Template4) {
	_inherits(Table, _Template4);

	/**
  * Constructor
  * @param {object} options
  * @param {string[]} options.rowHeaders - if using the default table
  * template, pass a string array of row headers
  * @param {object} options.struct
  * @param {string} options.struct.$wrapper - css class of the table
  * @param {string} options.struct.$thead - css class of the header
  * @param {string} options.struct.$tbody - css class of the body
  * @param {string} options.struct.$tfoot - css class of the footer
  * @param {string} options.struct.$tr - css class of the row
  * @returns {Table}
  */
	function Table(options) {
		var _ret7;

		_classCallCheck(this, Table);

		var defaults = {
			struct: {
				$wrapper: 'table',
				$thead: 'thead',
				$tbody: 'tbody',
				$tfoot: 'tfoot',
				$tr: 'tbody > tr'
			},
			rowHeaders: []
		};

		// properties
		var _this7 = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, $Util.opts(defaults, options)));

		_this7.$rows = [];
		_this7.primaryKey = "id";

		// states
		_this7.isFirstBuild = true;

		// provide a default empty msg
		_this7.$empty = $('<tr class="table-empty"><td>There is no data to display.</td></tr>');

		return _ret7 = _this7, _possibleConstructorReturn(_this7, _ret7);
	}

	/**
  * Use the provided template and remove
  * the remplate row from the <tbody>
  * @param {jQuery|string} [$template=null] - a string or jquery object to use as the template.
  * If null, will use what is set in this.settings.template
  * @returns {Table}
  * @private
  */


	_createClass(Table, [{
		key: "_useTemplate",
		value: function _useTemplate() {
			var $template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_get2(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), "_useTemplate", this).call(this, $template);
			// remove template row from the DOM
			this.$tr.remove();
			return this;
		}

		/**
   * Build a default table structure
   * @returns {Table}
   * @private
   */

	}, {
		key: "_useDefaultTemplate",
		value: function _useDefaultTemplate() {
			var template = '<table class="table">' + '<thead></thead>' + '<tbody>' + '<tr></tr>' + '</tbody>' + '<tfoot></tfoot>' + '</table>';

			this._useTemplate($(template));

			// todo: this is a patch for render 
			this.settings.template = null;

			// setup row headers
			var rh = this.settings.rowHeaders;
			var $theadRow = $('<tr></tr>');
			for (var i = 0; i < rh.length; i++) {
				var header = rh[i] || '';
				var $header = '<th>' + header + '</th>';
				var $col = '<td></td>';

				this.$tr.append($col);
				$theadRow.append($header);
			}
			this.$thead.append($theadRow);

			return this;
		}

		// data

		/**
   * Cache originally fed data
   * @param {object} data
   * @returns {Table}
   * @private
   */

	}, {
		key: "_cacheData",
		value: function _cacheData(data) {
			if (isArray(data)) this._cachedData = data;else this._cachedData = $.extend(true, {}, data);
			return this;
		}

		/**
   * Optionally process data
   * @param {number[]|object|object[]|string[]} data
   * @returns {Table}
   * @private
   */

	}, {
		key: "_processData",
		value: function _processData(data) {
			var self = this;
			if (isArray(data)) this._processedData = data;else this._processedData = $.extend(true, {}, data);

			$.each(data, function (i, e) {
				// add a private _rowId_ for objects
				if (isObject(e)) {
					var _rowId_ = i;
					if (self._cachedData[i][self.primaryKey]) {
						_rowId_ = self._cachedData[i][self.primaryKey];
					}
					self._processedData[i]._rowId_ = _rowId_;
				}
				self._processedData[i] = self._processRow(e);
			});
			return this;
		}

		/**
   * Optionally process row
   * @param {*} data
   * @returns {*}
   * @private
   */

	}, {
		key: "_processRow",
		value: function _processRow(data) {
			return data;
		}

		// render

		/**
   * Reneder/build the table rows from supplied data.
   * This will empty the <tbody> element
   * @param {object} data
   * @returns {Table}
   * @private
   */

	}, {
		key: "_render",
		value: function _render(data) {
			var self = this;

			if (!$.isEmptyObject(data) || Array.isArray(data) && data.length) this.toggleEmpty(false);else return this;

			// run through data and create rows
			Util.each(data, function (i, e) {
				self.addRow(e);
			});
			return this;
		}

		// rows

		/**
   * Create a new row
   * @returns {jQuery}
   */

	}, {
		key: "createRow",
		value: function createRow() {
			return this.$tr.clone();
		}

		/**
   * Add the row to the <tobdy>
   * @param {jQuery} $row
   * @returns {Table}
   */

	}, {
		key: "appendRow",
		value: function appendRow($row) {
			$row.appendTo(this.$tbody);
			this.$rows.push($row);
			return this;
		}

		/**
   * Populate a row with data
   * The <td> elements will be populated
   * @param {jQuery} $row - row to populate
   * @param {object[]} data - array of data
   * @returns {Table}
   */

	}, {
		key: "populateRow",
		value: function populateRow($row, data) {
			var dataArr = [];
			Util.each(data, function (i, e) {
				dataArr.push(e);
			});

			var $tds = $row.find('td');
			$.each($tds, function (i, e) {
				$(e).html(dataArr[i]);
			});
			return this;
		}

		/**
   * Add a new row and populate with data
   * @param {object} data
   * @returns {Table}
   */

	}, {
		key: "addRow",
		value: function addRow(data) {
			var useTemplate = !isNull(this.settings.template);
			var $row = this.createRow();

			// if data is an object and a template is used
			if (useTemplate && !Array.isArray(data)) $row.populateChildren(data);
			// if data is an array
			else this.populateRow($row, data);

			this.appendRow($row);
			$row.attr('data-id', data._rowId_);
			return this;
		}

		/**
   * Check if the table is empty based
   * on the number of trs in the tbody.
   * This may be useful if rows were
   * delete from the DOM and not data
   * @returns {boolean}
   * @private
   */

	}, {
		key: "_isEmptyTable",
		value: function _isEmptyTable() {
			return this.$tbody.find('tr').length === 0;
		}

		/**
   * Build the entire table
   * @param {object|object[]} data
   * object: an object of objects, where each object is a row of data
   * All row objects are name-value pairs, where the names equal a [name]
   * or [data-name] attribute within a row DOM element
   * object[]: same as object, but instead an object of objects, it is an
   * array of objects
   * array: an array of data. This is the most simplest form of data and will
   * simply be turned into <td>s with the data as the html
   * @returns {Table}
   */

	}, {
		key: "build",
		value: function build(data) {
			this.wipe();
			this._cacheData(data);
			this._processData(data);
			this.toggleEmpty(false);
			this._render(this._processedData);
			this.isFirstBuild = false;
			return this;
		}

		/**
   * Empty the <tbody> and the cached data
   * @returns {Table}
   */

	}, {
		key: "wipe",
		value: function wipe() {
			this.$tbody.empty();
			this.toggleEmpty(true);
			this.$rows = [];
			this._cachedData = {};
			return this;
		}

		/**
   * Delete a row based on
   * its index in this.$tr
   * @param {number} index
   * @returns {Table}
   */

	}, {
		key: "deleteRow",
		value: function deleteRow(index) {
			if (this.$rows[index]) {
				this.$rows[index].remove();
				this.$rows.splice(index, 1);
			}
			// check if all rows were deleted
			if (this._isEmptyTable()) {
				this.toggleEmpty();
			}
			return this;
		}

		/**
   * Toggle the empty table message
   * and hide the thead and tfoot
   * @param {boolean} [state=true]
   * @returns {Table}
   */

	}, {
		key: "toggleEmpty",
		value: function toggleEmpty() {
			var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			this.$thead.toggle(!state);
			this.$tfoot.toggle(!state);

			if (state) {
				this.$tbody.append(this.$empty);
				this.$empty.show();
			} else {
				this.$empty.remove();
			}
			return this;
		}
	}]);

	return Table;
}(Template);
/*!
 * renderTable
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Updates tables without redrawing them
 * @extends Table
 */


var RenderTable = function (_Table) {
	_inherits(RenderTable, _Table);

	/**
  * Constructor
  * @param {object} [options]
  * @param {string} [options.identifier='id'] - required for TemplateManager
  * @param {boolean} [options.useObjectNames=false] - required for TemplateManager
  * @returns {RenderTable}
  */
	function RenderTable(options) {
		var _ret8;

		_classCallCheck(this, RenderTable);

		var defaults = {
			// to manage objects, they must have
			// a unique id before they get to Manager.
			// this is their id property name
			identifier: 'id',
			// OR instead of using an identifier,
			// use the name of the object.
			// this only works when passing
			// objects of objects to manage()
			useObjectNames: false,
			// instead of using a jquery object
			// such as a tr, use a Template class
			rowTemplate: null
		};

		// components
		// row manager to re-build rows instead
		// of wiping the <tbody> each time
		var _this8 = _possibleConstructorReturn(this, (RenderTable.__proto__ || Object.getPrototypeOf(RenderTable)).call(this, $Util.opts(defaults, options)));

		_this8.rowManager = new TemplateManager({
			identifier: _this8.settings.identifier,
			useObjectNames: _this8.settings.useObjectNames,
			template: _this8.settings.rowTemplate || _this8.$tr,
			$wrapper: _this8.$tbody
		});

		_this8.$wrapper.addClass('renderTable');

		return _ret8 = _this8, _possibleConstructorReturn(_this8, _ret8);
	}

	/**
  * Set the table and rowManager's identifier
  * @param {string} identifier
  * @returns {RenderTable}
  * @private
  */


	_createClass(RenderTable, [{
		key: "setIdentifier",
		value: function setIdentifier(identifier) {
			this.settings.identifier = identifier;
			this.rowManager.settings.identifier = identifier;
			return this;
		}

		/**
   * Render via TemplateManager.manage.
   * Cannot use an array of non-object data
   * @param {object|object[]} data
   * @returns {RenderTable}
   * @private
   */

	}, {
		key: "_render",
		value: function _render(data) {
			var dataIsArray = Array.isArray(data);

			if ($.isEmptyObject(data) || !data || dataIsArray && !data.length) this.toggleEmpty(true);else if (dataIsArray && !isObject(data[0])) throw new ReferenceError("RenderTable._render: data must be an object, or an array of objects");

			this.rowManager.build(data);
			return this;
		}

		/**
   * Set the row template settings property
   * as well as the row manager's row template.
   * @param {Row|Template} template
   * @returns {RenderTable}
   */

	}, {
		key: "setRowTemplate",
		value: function setRowTemplate(template) {
			this.settings.rowTemplate = template;
			this.rowManager.settings.rowTemplate = template;
			return this;
		}

		/**
   * Empty the tbody and clear cached data
   * @returns {RenderTable}
   */

	}, {
		key: "wipe",
		value: function wipe() {
			_get2(RenderTable.prototype.__proto__ || Object.getPrototypeOf(RenderTable.prototype), "wipe", this).call(this);
			this.rowManager.deleteObjects();
			return this;
		}

		/**
   * Delete a row based on its identifier
   * in the TemplateManager collection of rows
   * or simply pass the row data object itself
   * @returns {RenderTable}
   */

	}, {
		key: "deleteRow",
		value: function deleteRow() {
			var _rowManager;

			(_rowManager = this.rowManager).deleteObject.apply(_rowManager, arguments);
			// check if all rows were deleted
			if (this._isEmptyTable()) {
				this.toggleEmpty();
			}
			return this;
		}
	}]);

	return RenderTable;
}(Table);
/*!
 * controlTable
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * A table that has view/update/delete support.
 * Buttons are added to the incoming data objects
 * as if they were part of the data.
 * @extends RenderTable
 * @deprecated Use RenderTable
 */


var ControlTable = function (_RenderTable) {
	_inherits(ControlTable, _RenderTable);

	/**
  * Constructor
  * @param {object} [options]
  * @param {object} [options.buttons]
  * @param {boolean} [options.buttons.deleteButton=true]
  * @param {boolean} [options.buttons.updateButton=true]
  * @param {boolean} [options.buttons.viewButton=true]
  * @returns {ControlTable}
  */
	function ControlTable(options) {
		var _ret9;

		_classCallCheck(this, ControlTable);

		var defaults = {
			buttons: {
				deleteButton: true,
				viewButton: true,
				updateButton: true
			}
		};

		var _this9 = _possibleConstructorReturn(this, (ControlTable.__proto__ || Object.getPrototypeOf(ControlTable)).call(this, $Util.opts(defaults, options)));

		_this9._setupButtons();
		_this9.$wrapper.addClass('controlTable');

		return _ret9 = _this9, _possibleConstructorReturn(_this9, _ret9);
	}

	// buttons

	/**
  * Add headers and tds for
  * each button that is enabled
  * @private
  */


	_createClass(ControlTable, [{
		key: "_setupButtons",
		value: function _setupButtons() {
			var self = this;

			$.each(this.settings.buttons, function (i, e) {
				if (e && !findTd(i)) {
					addHeader();
					addTd(i);
				}
			});

			/**
    * Determine if an element has already been
    * created in the template for this button
    * @param {string} i - button name
    */
			function findTd(i) {
				var $btnName = self.$tr.find('[data-name="' + i + '"]');
				var $btnDataName = self.$tr.find('[name="' + i + '"]');
				return $btnName.length || $btnDataName.length;
			}

			/**
    * Add a blank header
    */
			function addHeader() {
				self.$thead.find('tr').append('<th></th>');
			}

			/**
    * Add a td for a button
    * @param {string} dataName - the data-name attr
    */
			function addTd(dataName) {
				self.$tr.append('<td data-name="' + dataName + '"></td>');
			}
		}

		/**
   * Add each enabled button
   * @param {object} data - row data
   * @returns {object}
   * @private
   */

	}, {
		key: "_processRow",
		value: function _processRow(data) {
			if (this.settings.buttons.deleteButton) this._addDeleteButton(data);
			if (this.settings.buttons.updateButton) this._addUpdateButton(data);
			if (this.settings.buttons.viewButton) this._addViewButton(data);
			return data;
		}

		// delete button

		/**
   * Add a delete button
   * @param {object} data - row data
   * @returns {ControlTable}
   * @private
   */

	}, {
		key: "_addDeleteButton",
		value: function _addDeleteButton(data) {
			data.deleteButton = this._createDeleteButton(data);
			return this;
		}

		/**
   * Create a delete button
   * @param {object} data - row data
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_createDeleteButton",
		value: function _createDeleteButton(data) {
			var self = this;
			var $btn = $('<button type="button" title="Delete">Delete</button>');
			$btn.click(function () {
				self.deleteRow(data);
			});
			return $btn;
		}

		// update button

		/**
   * Add an update button
   * @param {object} data - row data
   * @returns {ControlTable}
   * @private
   */

	}, {
		key: "_addUpdateButton",
		value: function _addUpdateButton(data) {
			data.updateButton = this._createUpdateButton(data);
			return this;
		}

		/**
   * Create an update button
   * @param {object} data - row data
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_createUpdateButton",
		value: function _createUpdateButton(data) {
			return $('<button type="button" title="Update">Update</button>');
		}

		// view button

		/**
   * Add a view button
   * @param {object} data - row data
   * @returns {ControlTable}
   * @private
   */

	}, {
		key: "_addViewButton",
		value: function _addViewButton(data) {
			data.viewButton = this._createViewButton(data);
			return this;
		}

		/**
   * Create a view button
   * @param {object} data - row data
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_createViewButton",
		value: function _createViewButton(data) {
			return $('<button type="button" title="View">View</button>');
		}
	}]);

	return ControlTable;
}(RenderTable);
/*!
 * formInput
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Form input
 * @extends Template
 */


var FormInput = function (_Template5) {
	_inherits(FormInput, _Template5);

	/**
  * Constructor
  * @param {object} data
  * @param {object} [options]
  * @returns {FormInput}
  */
	function FormInput() {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		var _ret10;

		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, FormInput);

		var defaults = {
			struct: {
				$wrapper: '.form-input'
			}
		};

		// properties
		var _this10 = _possibleConstructorReturn(this, (FormInput.__proto__ || Object.getPrototypeOf(FormInput)).call(this, $Util.opts(defaults, options)));

		_this10.type = "text";
		_this10.tag = options.tag || "input";
		_this10.disabled = false;
		_this10.required = false;
		_this10.name = "input";
		_this10.maxlength = undefined;
		_this10.max = undefined;
		_this10.min = undefined;
		_this10.placeholder = null;
		_this10.step = undefined;
		_this10.value = null;

		_this10.set(data);

		return _ret10 = _this10, _possibleConstructorReturn(_this10, _ret10);
	}

	/**
  * Set properties from data
  * and rebuild the template.
  * @param {object} data
  * @returns {FormInput}
  */


	_createClass(FormInput, [{
		key: "set",
		value: function set(data) {
			Object.set(this, data);
			this._useDefaultTemplate();
			return this;
		}

		/**
   * Default template
   * @private
   */

	}, {
		key: "_useDefaultTemplate",
		value: function _useDefaultTemplate() {
			var $template = $("<" + this.tag + " class=\"form-input\"/>");
			this._useTemplate($template);
			return this;
		}

		/**
   * Use template
   * @param {jQuery} $template
   * @returns {FormInput}
   * @private
   */

	}, {
		key: "_useTemplate",
		value: function _useTemplate($template) {
			_get2(FormInput.prototype.__proto__ || Object.getPrototypeOf(FormInput.prototype), "_useTemplate", this).call(this, $template);
			this._setAttrs()._setProps()._setValue();
			return this;
		}

		/**
   * Set attributes
   * @returns {FormInput}
   * @private
   */

	}, {
		key: "_setAttrs",
		value: function _setAttrs() {
			this.$wrapper.attr({
				maxlength: this.maxlength,
				max: this.max,
				min: this.min,
				name: this.name,
				placeholder: this.placeholder,
				step: this.step,
				type: this.type
			});
			return this;
		}

		/**
   * Set props
   * @returns {FormInput}
   * @private
   */

	}, {
		key: "_setProps",
		value: function _setProps() {
			this.$wrapper.prop('required', this.required);
			this.$wrapper.prop('disabled', this.disabled);
			return this;
		}

		/**
   * Set the value
   * @returns {FormInput}
   * @private
   */

	}, {
		key: "_setValue",
		value: function _setValue() {
			if (this.value !== null) {
				this.$wrapper.populate(this.value);
			}
			return this;
		}
	}]);

	return FormInput;
}(Template);
/*!
 * formSelect
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Form select
 * @extends FormInput
 */


var FormSelect = function (_FormInput) {
	_inherits(FormSelect, _FormInput);

	/**
  * Constructor
  * @param {object} [data]
  * @param {object} [options]
  * @returns {FormInput}
  */
	function FormSelect(data, options) {
		var _ret11;

		_classCallCheck(this, FormSelect);

		// properties
		var _this11 = _possibleConstructorReturn(this, (FormSelect.__proto__ || Object.getPrototypeOf(FormSelect)).call(this, data, options));

		_this11.tag = "select";
		_this11.type = undefined;

		return _ret11 = _this11, _possibleConstructorReturn(_this11, _ret11);
	}

	/**
  * Set attributes
  * @returns {FormInput}
  * @private
  */


	_createClass(FormSelect, [{
		key: "_setAttrs",
		value: function _setAttrs() {
			this.$wrapper.attr({
				name: this.name
			});
			return this;
		}

		/**
   * Add options to the select
   * @param {*} arguments - Either an object of key/value pairs, where the key is the
   * option value and the value is the string within the tags,
   * or a key and value as two parameters to add one option
   * @returns {FormSelect}
   */

	}, {
		key: "addToSelect",
		value: function addToSelect() {
			var _$wrapper;

			(_$wrapper = this.$wrapper).addToSelect.apply(_$wrapper, arguments);
			return this;
		}

		/**
   * Select an option
   * @param {string} val
   * @param {boolean} [trigger=true] - whether to fire change event
   * @returns {FormSelect}
   */

	}, {
		key: "selectOption",
		value: function selectOption(val) {
			var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			this.$wrapper.val(val);
			if (trigger) {
				this.$wrapper.trigger('change');
			}
			return this;
		}
	}]);

	return FormSelect;
}(FormInput);
/*!
 * formGroup
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Form group
 * @extends Template
 */


var FormGroup = function (_Template6) {
	_inherits(FormGroup, _Template6);

	/**
  * Constructor
  * @param {object} [options]
  * @returns {FormGroup}
  */
	function FormGroup(options) {
		var _ret12;

		_classCallCheck(this, FormGroup);

		var defaults = {
			formInput: FormInput,
			formSelect: FormSelect,
			struct: {
				$wrapper: '.form-group',
				$label: 'label',
				$inputWrapper: '.form-input-wrapper',
				$input: 'input'
			}
		};

		var _this12 = _possibleConstructorReturn(this, (FormGroup.__proto__ || Object.getPrototypeOf(FormGroup)).call(this, $Util.opts(defaults, options)));

		_this12.input = null;

		return _ret12 = _this12, _possibleConstructorReturn(_this12, _ret12);
	}

	/**
  * Default template
  * @private
  */


	_createClass(FormGroup, [{
		key: "_useDefaultTemplate",
		value: function _useDefaultTemplate() {
			var template = '<div class="form-group">' + '<label></label>' + '<div class="form-input-wrapper">' + '</div>' + '</div>';

			this._useTemplate(template);
			return this;
		}

		/**
   * Create an input or select from data
   * @param {object} data
   * @returns {FormGroup}
   */

	}, {
		key: "createInput",
		value: function createInput(data) {
			switch (data.tag) {
				case "input":
					this.input = new this.settings.formInput();
					break;
				case "select":
					this.input = new this.settings.formSelect();
					break;
				case "textarea":
					this.input = new this.settings.formInput({}, { tag: 'textarea' });
					break;
			}
			this.input.set(data);
			this.setInput(this.input);
			if (this.input.type === 'hidden') {
				this.$wrapper.hide();
			}
			return this;
		}

		/**
   * Set the input into the input wrapper
   * @param {FormInput|FormSelect|jQuery} $input
   * @returns {FormGroup}
   */

	}, {
		key: "setInput",
		value: function setInput($input) {
			this.$input = $input instanceof Template ? $input.$wrapper : $input;
			this.$inputWrapper.html(this.$input);
			return this;
		}

		/**
   * Set the label
   * @param {jQuery|string} label
   * @returns {FormGroup}
   */

	}, {
		key: "setLabel",
		value: function setLabel(label) {
			this.$label.html(label);
			return this;
		}
	}]);

	return FormGroup;
}(Template);
/*!
 * formGroupManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Form group manager
 * @extends TemplateManager
 */


var FormGroupManager = function (_TemplateManager) {
	_inherits(FormGroupManager, _TemplateManager);

	/**
  * Constructor
  * @param {object} [options]
  * @returns {FormGroupManager}
  */
	function FormGroupManager(options) {
		var _ret13;

		_classCallCheck(this, FormGroupManager);

		var defaults = {
			identifier: 'label',
			template: FormGroup
		};

		var _this13 = _possibleConstructorReturn(this, (FormGroupManager.__proto__ || Object.getPrototypeOf(FormGroupManager)).call(this, $Util.opts(defaults, options)));

		return _ret13 = _this13, _possibleConstructorReturn(_this13, _ret13);
	}

	/**
  * Populate the template
  * @param {jQuery|Template} formGroup
  * @param {*} data
  * @returns {TemplateManager}
  * @private
  */


	_createClass(FormGroupManager, [{
		key: "_populateTemplate",
		value: function _populateTemplate(formGroup, data) {
			formGroup.createInput(data.input).setLabel(data.label);
			return this;
		}
	}]);

	return FormGroupManager;
}(TemplateManager);
/*!
 * formSerializer
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Serializes a form
 */


var FormSerializer = function () {

	/**
  * Construtor
  * @param {object} [options]
  * @param {number} [options.checkboxMode=0] - the mode in which to serialize checkboxes
  * @param {number} [options.mode=0] - the mode in which to serialize data
  * mode in which to serialize checkboxes
  * @returns {FormSerializer}
  */
	function FormSerializer(options) {
		_classCallCheck(this, FormSerializer);

		var defaults = {
			checkboxMode: FormSerializer.checkboxMode.number,
			serializeMode: FormSerializer.serializeMode.toString,
			excluded: [':disabled']
		};
		// use extendext to replace entirely the excluded settings
		this.settings = $Util.opts(defaults, options, 'replace');

		return this;
	}

	/**
  * Get either the [name]
  * or [data-name] attr of an element
  * @param {jQuery} $el
  * @returns {string}
  * @private
  */


	_createClass(FormSerializer, [{
		key: "_getElName",
		value: function _getElName($el) {
			if (typeof $el.attr('name') !== "undefined") return $el.attr('name');
			if (typeof $el.data('name') !== "undefined") return $el.data('name');

			console.error("FormSerializer._getElName: field has no name or data-name attribute");
			return '';
		}

		/**
   * Convert a checkbox
   * @param {jQuery} $checkbox
   * @param {number} mode
   * @returns {boolean|number|string}
   * @private
   */

	}, {
		key: "_convertCheckbox",
		value: function _convertCheckbox($checkbox, mode) {
			var checked = $checkbox.is(':checked');
			switch (mode) {
				case FormSerializer.checkboxMode.boolean:
					return checked;
					break;
				case FormSerializer.checkboxMode.number:
					return checked ? 1 : 0;
					break;
				case FormSerializer.checkboxMode.string:
					return checked ? '1' : '0';
					break;
				case FormSerializer.checkboxMode.onOff:
					return checked ? 'on' : 'off';
					break;
			}
		}

		/**
   * Serialize a form
   * @param {jQuery} $form
   * @returns {object|string}
   */

	}, {
		key: "serialize",
		value: function serialize($form) {
			var self = this;
			var formData = new FormSerializerData();
			var data = {};

			$form.find('input, select, textarea').each(function (i, e) {
				var $el = $(e);
				var name = "";
				var order = -1;
				var type = "";
				var tag = "";
				var val = "";

				var excluded = self.settings.excluded;
				for (var x = 0; x < excluded.length; x++) {
					if ($el.is(excluded[x])) return true;
				}

				if ($el.data('serialize') === false) return true;

				// get the tag (input or select)
				tag = $el[0].nodeName.toLowerCase();

				// find the name
				name = self._getElName($el);
				if (typeof name === 'undefined') return true;

				// see if it needs to be serialized in some order
				if (typeof $el.data('order') !== "undefined") order = $el.data('order');

				// handle <input>s
				if (tag === 'input') {
					type = $el.attr('type');
					if (typeof type === 'undefined') return console.error("FormSerializer.serialize: input" + name + " must have a type");

					switch (type) {
						case 'checkbox':
							val = self._convertCheckbox($el, self.settings.checkboxMode);
							break;
						case 'radio':
							if ($el.is(':checked')) val = $el.val();else return true;
							break;
						case 'file':
							var files = $el.get(0).files;
							if (files.length === 0) {
								return true;
							}
							val = files[0];
							break;
						default:
							val = $el.val();
							break;
					}
				}
				// handle <select>s
				else if (tag === 'select' || tag === 'textarea') {
						val = $el.val();
					} else {
						console.error('FormSerializer.serialize: only inputs, textareas, and selects can be serialized');
					}

				data[name] = {
					val: val,
					order: order
				};
			});

			formData.set(data);

			switch (this.settings.serializeMode) {
				default:
				case FormSerializer.serializeMode.toString:
					return formData.toString();
					break;
				case FormSerializer.serializeMode.toOrderedString:
					return formData.toOrderedString();
					break;
				case FormSerializer.serializeMode.toObject:
					return formData.toObject();
					break;
				case FormSerializer.serializeMode.toValue:
					return formData.toValue();
					break;
			}
		}
	}]);

	return FormSerializer;
}();

/**
 * Mode in which to convert checkboxes
 */


FormSerializer.checkboxMode = {
	boolean: 0,
	number: 1,
	string: 2,
	onOff: 3
};

/**
 * Mode in which to serialize data
 */
FormSerializer.serializeMode = {
	toString: 0,
	toOrderedString: 1,
	toObject: 2,
	toValue: 3
};

/*!
 * formSerializerData
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * An object that holds form data
 * and can output it in different ways
 */

var FormSerializerData = function () {

	/**
  * Constructor
  * @param {object} [data={}]
  * @returns {FormSerializerData}
  */
	function FormSerializerData(data) {
		_classCallCheck(this, FormSerializerData);

		this.data = data || {};
		return this;
	}

	/**
  * Set the data
  * @param {object} data
  * @returns {FormSerializerData}
  */


	_createClass(FormSerializerData, [{
		key: "set",
		value: function set(data) {
			this.data = data;
			return this;
		}

		/**
   * Convert the data to a serialized string
   * @returns {string}
   */

	}, {
		key: "toString",
		value: function toString() {
			var data = "";
			var c = 0;
			var len = Object.keys(this.data).length;
			Util.each(this.data, function (i, e) {
				data += i + "=" + e.val;
				if (c++ < len - 1) data += "&";
			});
			return data;
		}

		/**
   * Convert the data to an
   * ordered serialized string
   * @returns {string}
   */

	}, {
		key: "toOrderedString",
		value: function toOrderedString() {
			var data = "";
			var ordered = [];
			var unordered = [];
			Util.each(this.data, function (i, e) {
				var obj = {
					name: i,
					val: e.val
				};
				if (e.order > -1) ordered[e.order] = obj;else unordered.push(obj);
			});

			var len = ordered.length;
			for (var i = 0; i < len; i++) {
				data += ordered[i].name + '=' + ordered[i].val;
				if (i < len) data += "&";
			}

			len = unordered.length;
			for (i = 0; i < len; i++) {
				data += unordered[i].name + '=' + unordered[i].val;
				if (i < len - 1) data += "&";
			}

			return data;
		}

		/**
   * Convert the data to an object
   * @returns {object}
   */

	}, {
		key: "toObject",
		value: function toObject() {
			var data = {};
			Util.each(this.data, function (i, e) {
				// convert string numbers to real numbers
				data[i] = e.val !== "" && !isNaN(e.val) ? parseInt(e.val) : data[i] = e.val;
			});
			return data;
		}

		/**
   * Convert the data into a single value.
   * This is only useful if the form only has one input.
   * @returns {*}
   */

	}, {
		key: "toValue",
		value: function toValue() {
			var data = null;
			// data will be the last iterated object value
			// using this function though, the form is
			// expected to only have one input anyway
			Util.each(this.data, function (i, e) {
				// convert string numbers to real numbers
				data = isNaN(e.val) ? e.val : parseInt(e.val);
			});
			return data;
		}
	}]);

	return FormSerializerData;
}();
/*!
 * form
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates, serializes, and submits forms
 * @extends Template
 */


var Form = function (_Template7) {
	_inherits(Form, _Template7);

	/**
  * Constructor
  * @param {object} [options]
  * @param {boolean} [options.feedback=true] - whether to show feedback during submissions
  * @param {function} [options.getRequest=null] - if set, a request to get form data 
  * @param {string} [options.submitUrl] - the submitUrl or path to submit the form to
  * @param {function} [options.submitRequest=null] - if set, ignores submitUrl and uses this function to submit data
  * @param {number} [options.serializeMode=0] - the mode in which to serialize data
  * @param {number} [options.checkboxMode=0] - the mode in which to serialize checkboxes
  * @param {number} [options.formGroupManager=FormGroupManager] -
  * @param {string[]} [options.excluded=[':disabled']] - exluded fields via css pseudo selectors
  * @param {object} [options.validator] - validator setttings
  * @param {string} [options.validator.api] - the validator api to use
  * @param {object} [options.validator.options] - the validator options
  * @param {object} [options.struct] - the template struct to build the form from, if using a template
  * @param {string} [options.struct.$wrapper='form'] - the form element
  * @param {string} [options.struct.$header='.form-header'] - the header selector
  * @param {string} [options.struct.$body='.form-body'] - the body selector
  * @param {string} [options.struct.$footer='.form-footer'] - the footer selector
  * @param {string} [options.struct.$cancel='.form-cancel'] - the cancel button selector
  * @param {string} [options.struct.$reset='.form-reset'] - the reset button selector
  * @param {string} [options.struct.$submit='button[type="submit"]'] - the submit button selector
  * @returns {Form}
  */
	function Form(options) {
		var _ret14;

		_classCallCheck(this, Form);

		var defaults = {
			useTemplate: true,
			getRequest: null,
			submitUrl: "",
			submitRequest: null,
			serializeMode: FormSerializer.serializeMode.toString,
			checkboxMode: FormSerializer.checkboxMode.number,
			excluded: [':disabled'],
			formGroupManager: FormGroupManager,
			// feedback
			feedback: true,
			feedbackCloseable: true,
			feedbackSuccess: 'Submission successful',
			feedbackFail: 'Submission failed',
			// css classes for each form component
			struct: {
				$wrapper: 'form',
				$feedback: '.form-feedback',
				$header: '.form-header',
				$body: '.form-body',
				$footer: '.form-footer',
				$cancel: '.form-cancel',
				$reset: '.form-reset',
				$submit: 'button[type="submit"]'
			},
			validator: null
		};

		var _this14 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, $Util.opts(defaults, options, 'replace')));

		var self = _this14;

		// store serialized data
		_this14._serializedData = {};

		// alias
		// this exists solely for Wizard !!
		var $form = _this14.$wrapper.find('form');
		_this14.$form = $form.length > 0 ? $form : _this14.$wrapper;

		// components
		_this14.formSerializer = new FormSerializer({
			serializeMode: _this14.settings.serializeMode,
			checkboxMode: _this14.settings.checkboxMode,
			excluded: _this14.settings.excluded
		});
		_this14.validator = null;
		_this14.feedback = null;
		_this14.formGroupManager = new _this14.settings.formGroupManager({
			$wrapper: _this14.$body
		});

		// handlers
		// default submit handler
		_this14.$form.off('submit').on('submit', function (e) {
			e.preventDefault();
			self.serializeForm()._submit();
		});

		// cancel
		_this14.$cancel.click(function () {
			self.resetForm();
		});

		// reset
		_this14.$reset.click(function () {
			self.resetForm();
		});

		// set up validator
		if (_this14.settings.validator) _this14._setupValidator();

		// set up feedback
		if (_this14.settings.feedback) _this14._setupFeedback();

		return _ret14 = _this14, _possibleConstructorReturn(_this14, _ret14);
	}

	// setup

	/**
  * Default form template
  * @returns {Form}
  * @private
  */


	_createClass(Form, [{
		key: "_useDefaultTemplate",
		value: function _useDefaultTemplate() {
			var template = '<form class="form">' + '<div class="form-feedback"></div>' + '<div class="form-header"></div>' + '<div class="form-body"></div>' + '<div class="form-footer">' + '<button type="submit" class="form-submit">Submit</button>' + '<button type="button" class="form-reset">Reset</button>' + '<button type="button" class="form-cancel">Cancel</button>' + '</div>' + '</form>';

			this._useTemplate($(template));

			return this;
		}

		/**
   * Attaches a validator to the form
   * @returns {Form}
   * @private
   */

	}, {
		key: "_setupValidator",
		value: function _setupValidator() {
			var v = this.settings.validator;
			switch (v.api) {
				case 'formValidation':
					Form.validators.formValidation.setup(this, this.$form, v.options);
					break;
				case 'formValidationBootstrap4':
					Form.validators.formValidationBootstrap4.setup(this, this.$form, v.options);
					break;
			}
			return this;
		}

		/**
   * Setup the feedback
   * @returns {Form}
   * @private
   */

	}, {
		key: "_setupFeedback",
		value: function _setupFeedback() {
			this.feedback = new Feedback({
				closeButton: this.settings.feedbackCloseable
			});
			if (!this.$feedback.length) {
				this.$feedback = $('<div class="form-feedback"></div>');
				this.$form.prepend(this.$feedback);
			}
			this.$feedback.html(this.feedback.$wrapper);
			return this;
		}

		/**
   * Prepare the form with a loading message
   * @returns {Form}
   * @private
   */

	}, {
		key: "_prepare",
		value: function _prepare() {
			this.toggleForm(false);
			this.feedback.show();
			this.feedback.setFeedback('processing', 'Getting data...');
			return this;
		}

		// form builder

		/**
   * Build inputs from cols
   * @param {object|object[]} data - data for a form input
   * @returns {Form}
   */

	}, {
		key: "build",
		value: function build(data) {
			this.formGoupManager.empty().build(data);
			return this;
		}

		// ready

		/**
   * Set the form to ready by hiding
   * feedback and showing the form components
   * @returns {Form}
   * @private
   */

	}, {
		key: "_ready",
		value: function _ready() {
			this.feedback.slideUp();
			this.slideToggleForm(true);
			return this;
		}

		// submit

		/**
   * Submits the form
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_submit",
		value: function _submit() {
			var self = this;

			this.trigger('beforeSubmit', this);

			if (this.feedback) this.feedback.setFeedback('processing', 'Processing...');

			return this._doSubmit().done(function (data) {
				self._done(data);
			}).fail(function (err) {
				self._fail(err);
			}).always(function () {
				self._always();
			});
		}

		/**
   * Actual submit function
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_doSubmit",
		value: function _doSubmit() {
			if (this.settings.submitRequest) return this.settings.submitRequest(this._serializedData);else return $.post(this.settings.submitUrl, this._serializedData);
		}

		// submit handlers

		/**
   * Form submission success handler
   * @param {object} data
   * @returns {Form}
   * @private
   */

	}, {
		key: "_done",
		value: function _done(data) {
			if (this.feedback) this.feedback.setFeedback('success', this.settings.feedbackSuccess);
			this.trigger('done', data);
			return this;
		}

		/**
   * Form submission fail handler
   * @param {object} err
   * @returns {Form}
   * @private
   */

	}, {
		key: "_fail",
		value: function _fail(err) {
			if (this.feedback) this.feedback.setFeedback('danger', this.settings.feedbackFail);
			this.trigger('fail', err);
			return this;
		}

		/**
   * Form submission always handler
   * @returns {Form}
   * @private
   */

	}, {
		key: "_always",
		value: function _always() {
			this.toggleButtons(true);
			this.trigger('always');
			return this;
		}

		// data

		/**
   * Get form data from the backend
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_getFormData",
		value: function _getFormData() {
			if (this.settings.getRequest) {
				return this.settings.getRequest();
			} else {
				return $.Deferred().resolve({}).promise();
			}
		}

		// public

		/**
   * Toggle the button states
   * @param {boolean} state
   * @returns {Form}
   */

	}, {
		key: "toggleButtons",
		value: function toggleButtons(state) {
			this.$cancel.prop('disabled', !state);
			this.$reset.prop('disabled', !state);
			this.$submit.prop('disabled', !state).toggleClass('disabled', !state);
			return this;
		}

		/**
   * Lock the submit button for some amount of ms
   * @param {number} ms - time to lock in milliseconds
   */

	}, {
		key: "lockSubmit",
		value: function lockSubmit(ms) {
			var self = this;
			var html = this.$submit.html();

			this.$submit.prop('disabled', true);
			setTimeout(function () {
				self.$submit.prop('disabled', false);
				self.$submit.html(html);
			}, ms);

			var c = 0;
			var timer = setInterval(setButtonHtml, 1000);
			setButtonHtml();

			/**
    * Set the button html to the time left on the lock
    */
			function setButtonHtml() {
				if (c >= ms) {
					clearInterval(timer);
				} else {
					var time = Math.floor((ms - c) / 1000);
					// don't show 0
					time = time || 1;
					var _html = html + " | " + time;
					self.$submit.html(_html);
					c += 1000;
				}
			}
		}

		/**
   * Toggle the form body
   * @param {boolean} state
   * @returns {Form}
   */

	}, {
		key: "toggleForm",
		value: function toggleForm(state) {
			this.$body.toggle(state);
			this.$footer.toggle(state);
			return this;
		}

		/**
   * Slide toggle the form body
   * @param {boolean} state
   * @returns {Form}
   */

	}, {
		key: "slideToggleForm",
		value: function slideToggleForm(state) {
			this.$body.slideToggleState(state);
			this.$footer.slideToggleState(state);
			return this;
		}

		/**
   * Populate form fields
   * @param {object} data - collection of properties whos
   * key match an input or select name, and
   * whos value is appropriate for that field
   * @returns {Form}
   */

	}, {
		key: "populateForm",
		value: function populateForm(data) {
			this._cacheData(data);
			this._processData(data);
			this.$form.populateChildren(this._processedData);
			return this;
		}

		/**
   * Public function to serialize the form,
   * as jQuery uses serialize already
   * @returns {Form}
   */

	}, {
		key: "serializeForm",
		value: function serializeForm() {
			this._serializedData = this.formSerializer.serialize(this.$form);
			return this;
		}

		/**
   * Append serialized data
   * @param {...} an object of data or k/v pair of data
   * @returns {Form}
   */

	}, {
		key: "appendSerializedData",
		value: function appendSerializedData() {
			if (arguments.length > 1) {
				this._serializedData[arguments[0]] = arguments[1];
			} else {
				$.extend(true, this._serializedData, arguments[0]);
			}
			return this;
		}

		/**
   * Reset the form, using populated data
   * or setting to default values
   * @returns {Form}
   */

	}, {
		key: "resetForm",
		value: function resetForm() {
			if (!$.isEmptyObject(this._processedData)) this.$form.populateChildren(this._processedData);else this.$form[0].reset();

			if (this.feedback) this.feedback.slideUp();

			this.toggleButtons(true);

			// todo: implement for alternative validators
			if (this.validator) {
				switch (this.settings.validator.api) {
					case 'formValidation':
						this.validator.resetForm();
						break;
				}
			}

			return this;
		}

		/**
   * Validate the form
   * @returns {boolean}
   */

	}, {
		key: "validate",
		value: function validate() {
			var isValid = false;
			if (this.validator) {
				// todo: implement for alternative validators
				switch (this.settings.validator.api) {
					case 'formValidation':
						this.validator.resetForm();
						this.validator.validateContainer(this.$form);
						isValid = this.validator.isValidContainer(this.$form);
						break;
				}
			}
			return isValid;
		}

		// initializers

		/**
   * Wipe the form.
   * Clear all data and set all inputs to blanks
   * @returns {Form}
   */

	}, {
		key: "wipe",
		value: function wipe() {
			this._cachedData = {};
			this._processedData = {};
			this.find('input, select').each(function (i, e) {
				$(e).val('');
			});
			return this;
		}

		/**
   * Remove all data from the form and reset it
   * @returns {Form}
   */

	}, {
		key: "clean",
		value: function clean() {
			this._cachedData = {};
			this.resetForm();
			this.toggleForm(true);
			return this;
		}

		/**
   * Initialize as a clean form with
   * default values from the DOM
   * @returns {Form}
   */

	}, {
		key: "initialize",
		value: function initialize() {
			this.clean();
			return this;
		}

		/**
   * Initialize by getting form data 
   * @returns {jQuery}
   */

	}, {
		key: "initializeWithGet",
		value: function initializeWithGet() {
			var self = this;
			this.clean();
			this._prepare();
			return this._getFormData().done(function (data) {
				self.populateForm(data);
				self._ready();
			}).fail(function (err) {
				self.feedback.setFeedback('danger', err.msg || 'Failed to get data');
			});
		}
	}]);

	return Form;
}(Template);

Form.validators = {

	/**
  * formValidation api
  */
	formValidation: {
		api: 'formValidation',
		options: {
			framework: 'bootstrap',
			excluded: [':disabled', ':hidden', ':not(:visible)'],
			icon: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			}
		},

		/**
   * formValidation setup
   * @param {Form} form
   * @param {jQuery} $form
   * @param {object} options
   */
		setup: function setup(form, $form, options) {
			$form.off('submit');
			// allows re-creation of the Form
			if ($form.data('formValidation')) $form.data('formValidation').destroy();
			$form.formValidation(options).on('success.form.fv', function (e) {
				e.preventDefault();
				form.toggleButtons(false);
				form.serializeForm()._submit();
			});
			form.validator = $form.data('formValidation');
		}
	}
};

/**
 * formValidation api bootstrap 4
 */
Form.validators.formValidationBootstrap4 = {
	api: 'formValidation',
	options: {
		framework: 'bootstrap4',
		excluded: [':disabled', ':hidden', ':not(:visible)'],
		icon: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh'
		}
	},
	setup: Form.validators.formValidation
};
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

var Wizard = function (_Form) {
	_inherits(Wizard, _Form);

	/**
  * Constructor
  * @param  {object} [options]
  * @param  {object} [options.struct]
  * @param  {string} [options.struct.$wrapper='.wizard'] - wizard wrapper
  * @param  {string} [options.struct.$nav='.nav'] - navigation list
  * @param  {string} [options.struct.$navs='.nav > li'] - navigation links
  * @param  {string} [options.struct.$tabs='.tab-pane'] - tab container
  * @param  {string} [options.struct.$next='.pager .next'] - next button
  * @param  {string} [options.struct.$pager='.pager'] - pager container
  * @param  {string} [options.struct.$previous='.pager .previous'] - previous button
  * @returns {Wizard}
  */
	function Wizard(options) {
		var _ret15;

		_classCallCheck(this, Wizard);

		var defaults = {
			struct: {
				$wrapper: '.wizard',
				$nav: '.nav',
				$navs: '.nav > li',
				$tabs: '.tab-pane',
				$next: '.pager .next',
				$pager: '.pager',
				$previous: '.pager .previous'
			}
		};

		var _this15 = _possibleConstructorReturn(this, (Wizard.__proto__ || Object.getPrototypeOf(Wizard)).call(this, $Util.opts(defaults, options)));

		_this15.stepCount = _this15.$tabs.length;
		_this15.step = 0;

		// show or hide pagination and form buttons
		_this15.toggleSubmitButton(_this15.stepCount === 1);
		_this15.togglePreviousButton(false);
		_this15.toggleNextButton(_this15.stepCount > 1);

		_this15._setHandlers();

		return _ret15 = _this15, _possibleConstructorReturn(_this15, _ret15);
	}

	/**
  * Clear all handlers. Useful if
  * the wizard DOM is being re-used.
  * @private
  */


	_createClass(Wizard, [{
		key: "_clearHandlers",
		value: function _clearHandlers() {
			this.$next.off('click.wizard');
			this.$previous.off('click.wizard');
			this.$submit.off('click.wizard');
			this.$navs.each(function (i, e) {
				$(e).off('click.wizard');
			});
		}

		/**
   * Set pagination and form button handlers
   * @returns {Wizard}
   * @private
   */

	}, {
		key: "_setHandlers",
		value: function _setHandlers() {
			var self = this;

			this._clearHandlers();

			// next
			this.$next.on('click.wizard', function () {
				self._getNextNav().find('a').click();
				//self.validatePreviousTab();
			});
			// prev
			this.$previous.on('click.wizard', function () {
				self.validateTab(self._getTab(self.step));
				self._getPreviousNav().find('a').click();
			});
			// submit
			this.$submit.on('click.wizard', function () {
				self.validateAllTabs();
			});
			// navs
			this.$navs.each(function (i, e) {
				$(e).on('click.wizard', function () {
					self._setPagination(i);
					var x = i;
					// nav clicked is ahead
					if (i > self.step) {
						for (x = x - 1; x >= 0; x--) {
							self.validateTab(self._getTab(x));
						}
					}
					// nav clicked is behind
					else if (i < self.step) {
							for (x; x < self.step + 1; x++) {
								self.validateTab(self._getTab(x));
							}
						}
					self.step = i;

					// reset nav status when going to a tab
					self._toggleNavInvalid($(this), false);
				});
			});
			return this;
		}

		/**
   * Create an empty wizard
   * @returns {Wizard}
   * @private
   */

	}, {
		key: "_useDefaultTemplate",
		value: function _useDefaultTemplate() {
			_get2(Wizard.prototype.__proto__ || Object.getPrototypeOf(Wizard.prototype), "_useDefaultTemplate", this).call(this);

			// to avoid duplicate $wrapper's (Wizard inherits Form)
			// set this.$form to Form's $wrapper
			this.$form = this.$wrapper;

			// components
			this.$wrapper = $('<div class="wizard"></div>');
			this.$nav = $('<ul class="nav"></ul>');
			this.$tabs = $('<div class="tab-pane"></div>');
			this.$pager = $('<ul class="pager"></ul>');
			this.$next = $('<li class="next"><a href="#">Next</a></li>');
			this.$previous = $('<li class="previous"><a href="#">Previous</a></li>');

			// build
			this.$pager.append(this.$previous, this.$next, this.$submit);
			this.$footer.append(this.$pager);
			this.$form.append(this.$tabs, this.$footer);
			this.$wrapper.append(this.$nav, this.$form);

			return this;
		}

		/**
   * Attaches a validator to the form
   * @returns {Form}
   * @private
   */

	}, {
		key: "_setupValidator",
		value: function _setupValidator() {
			var v = this.settings.validator;
			switch (v.api) {
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
   * Setup the feedback
   * @returns {Form}
   * @private
   */

	}, {
		key: "_setupFeedback",
		value: function _setupFeedback() {
			this.feedback = new Feedback();
			if (!this.$feedback.length) {
				this.$feedback = $('<div class="form-feedback"></div>');
				this.$wrapper.prepend(this.$feedback);
			}
			this.$feedback.html(this.feedback.$wrapper);
			return this;
		}

		// control

		/**
   * Show or hide pagination 
   * buttons according to step
   * @param {number} step - the step 
   * @private
   */

	}, {
		key: "_setPagination",
		value: function _setPagination(step) {
			// simply hide everything first
			this.togglePreviousButton(false);
			this.toggleNextButton(false);
			this.toggleSubmitButton(false);

			switch (step) {
				// first step
				case 0:
					this.togglePreviousButton(false);
					if (this.stepCount === 1) this.toggleSubmitButton();else if (this.stepCount > 1) this.toggleNextButton();
					break;
				// last step
				case this.stepCount - 1:
					this.toggleSubmitButton();
					if (this.stepCount > 1) this.togglePreviousButton();
					break;
				// inbetween steps
				default:
					if (this.stepCount > 1) {
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

	}, {
		key: "_getNav",
		value: function _getNav(index) {
			return $(this.$navs.get(index));
		}

		/**
   * Get a nav from a tab element
   * @param {jQuery} $tab
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_getNavFromTab",
		value: function _getNavFromTab($tab) {
			var index = this.$tabs.index($tab);
			return this._getNav(index);
		}

		/**
   * Get the previous nav
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_getPreviousNav",
		value: function _getPreviousNav() {
			return $(this.$navs.get(this.step - 1));
		}

		/**
   * Get the current nav
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_getCurrentNav",
		value: function _getCurrentNav() {
			return $(this.$navs.get(this.step));
		}

		/**
   * Get the next nav
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_getNextNav",
		value: function _getNextNav() {
			return $(this.$navs.get(this.step + 1));
		}

		/**
   * Toggle a nav as invalid
   * @param {jQuery} $nav
   * @param {boolean} state
   * @returns {Wizard}
   * @private
   */

	}, {
		key: "_toggleNavInvalid",
		value: function _toggleNavInvalid($nav) {
			var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			$nav.toggleClass('wizard-tab invalid', state);
			return this;
		}

		// tabs

		/**
   * Get a tab based on index
   * @param {number} index
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_getTab",
		value: function _getTab(index) {
			return $(this.$tabs.get(index));
		}

		/**
   * Get the current tab
   * @returns {jQuery}
   * @private
   */

	}, {
		key: "_getCurrentTab",
		value: function _getCurrentTab() {
			return $(this.$tabs.get(this.step));
		}

		/**
   * Get the next tab
   * @returns {jQuery|null}
   * @private
   */

	}, {
		key: "_getNextTab",
		value: function _getNextTab() {
			return this.step !== this.stepCount ? $(this.$tabs.get(this.step + 1)) : null;
		}

		/**
   * Get the previous tab
   * @returns {jQuery|null}
   * @private
   */

	}, {
		key: "_getPreviousTab",
		value: function _getPreviousTab() {
			return this.step > 0 ? $(this.$tabs.get(this.step - 1)) : null;
		}

		// validation

		/**
   * Validate a tab
   * @param {jQuery} $tab
   * @returns {boolean}
   */

	}, {
		key: "validateTab",
		value: function validateTab($tab) {
			var api = this.settings.validator.api;
			var valid = true;

			// todo: add support for other validators
			switch (api) {
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

	}, {
		key: "validateCurrentTab",
		value: function validateCurrentTab() {
			var $tab = this._getCurrentTab();
			return this.validateTab($tab);
		}

		/**
   * Validate the previous tab
   * @returns {boolean}
   */

	}, {
		key: "validatePreviousTab",
		value: function validatePreviousTab() {
			var $tab = this._getPreviousTab();
			return this.validateTab($tab);
		}

		/**
   * Validate the next tab
   * @returns {boolean}
   */

	}, {
		key: "validateNextTab",
		value: function validateNextTab() {
			var $tab = this._getNextTab();
			return this.validateTab($tab);
		}

		/**
   * Validate all tabs
   * @returns {boolean}
   */

	}, {
		key: "validateAllTabs",
		value: function validateAllTabs() {
			var self = this;
			var valid = true;
			$.each(this.$tabs, function (i, e) {
				var $tab = $(e);
				self.validator.validateContainer($tab);

				var validTab = self.validator.isValidContainer($tab);
				self._toggleNavInvalid(self._getNav(i), !validTab);

				// set overal validity
				// should be invalid if any tab is invalid
				if (!validTab) {
					valid = false;
				}
			});
			return valid;
		}

		// buttons

		/**
   * Toggle the next button
   * @param {boolean} state
   * @returns {Wizard}
   */

	}, {
		key: "toggleNextButton",
		value: function toggleNextButton() {
			var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			this.$next.toggle(state);
			return this;
		}

		/**
   * Toggle the previous button
   * @param {boolean} state
   * @returns {Wizard}
   */

	}, {
		key: "togglePreviousButton",
		value: function togglePreviousButton() {
			var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			this.$previous.toggle(state);
			return this;
		}

		/**
   * Toggle the submit button
   * @param {boolean} state
   * @returns {Wizard}
   */

	}, {
		key: "toggleSubmitButton",
		value: function toggleSubmitButton() {
			var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			this.$submit.toggle(state);
			return this;
		}

		/**
   * Toggle wizard components
   * @param {boolean} state
   * @returns {Wizard}
   */

	}, {
		key: "toggleForm",
		value: function toggleForm(state) {
			_get2(Wizard.prototype.__proto__ || Object.getPrototypeOf(Wizard.prototype), "toggleForm", this).call(this, state);
			this.$nav.toggle(state);
			return this;
		}

		/**
   * Toggle wizard components
   * @param {boolean} state
   * @returns {Wizard}
   */

	}, {
		key: "slideToggleForm",
		value: function slideToggleForm(state) {
			_get2(Wizard.prototype.__proto__ || Object.getPrototypeOf(Wizard.prototype), "slideToggleForm", this).call(this, state);
			this.$nav.slideToggleState(state);
			return this;
		}

		// resets

		/**
   * Reset nav validation
   * @returns {Wizard}
   */

	}, {
		key: "resetNavValidation",
		value: function resetNavValidation() {
			for (var i = 0; i < this.$navs.length; i++) {
				var $nav = $(this.$navs[i]);
				this._toggleNavInvalid($nav, false);
			}
			return this;
		}

		/**
   * Reset the form
   * @returns {Wizard}
   */

	}, {
		key: "resetForm",
		value: function resetForm() {
			var $nav = $(this.$navs[0]);
			$nav.find('a').click();
			this.resetNavValidation();
			_get2(Wizard.prototype.__proto__ || Object.getPrototypeOf(Wizard.prototype), "resetForm", this).call(this);
			return this;
		}
	}]);

	return Wizard;
}(Form);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*!
 * crudRow
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * CRUD row with read/update/delete buttons.
 * A virtual class to extend from.
 * @extends Template
 */
var CrudRow = function (_Template) {
	_inherits(CrudRow, _Template);

	/**
  * Constructor
  * @returns {CrudRow}
  */
	function CrudRow(options) {
		var _ret;

		_classCallCheck(this, CrudRow);

		var defaults = {
			struct: {
				$wrapper: 'tr',
				$deleteButton: '[name="deleteButton"]',
				$updateButton: '[name="updateButton"]',
				$viewButton: '[name="viewButton"]'
			}
		};

		// properties
		var _this = _possibleConstructorReturn(this, (CrudRow.__proto__ || Object.getPrototypeOf(CrudRow)).call(this, $Util.opts(defaults, options)));

		_this._cachedData = {};
		_this._processedData = {};

		return _ret = _this, _possibleConstructorReturn(_this, _ret);
	}

	// data

	/**
  * Cache data
  * @param {object} data
  * @returns {CrudRow}
  * @private
  */


	_createClass(CrudRow, [{
		key: '_cacheData',
		value: function _cacheData(data) {
			this._cachedData = $.extend(true, {}, data);
			return this;
		}

		/**
   * Process data
   * @param {object} data
   * @returns {CrudRow}
   * @private
   */

	}, {
		key: '_processData',
		value: function _processData(data) {
			this._processedData = $.extend(true, {}, data);
			return this;
		}

		/**
   * Populate children override.
   * Cache and process data first.
   * @param {object} data
   * @returns {CrudRow}
   */

	}, {
		key: 'populateChildren',
		value: function populateChildren(data) {
			this._cacheData(data);
			this._processData(data);
			this.$wrapper.populateChildren(this._processedData);
			return this;
		}

		// delete

		/**
   * Attach delete button handlers
   * @returns {CrudRow}
   * @private
   */

	}, {
		key: '_attachDeleteButtonHandlers',
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
		key: '_deleteButtonAction',
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
		key: '_attachUpdateButtonHandlers',
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
		key: '_updateButtonAction',
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
		key: '_attachViewButtonHandlers',
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
		key: '_viewButtonAction',
		value: function _viewButtonAction() {
			throw new Error("CrudRow._viewButtonAction: must be implemented in child class");
		}

		/**
   * Initialize the row
   * @returns {CrudRow}
   */

	}, {
		key: 'initialize',
		value: function initialize() {
			this._attachDeleteButtonHandlers()._attachUpdateButtonHandlers()._attachViewButtonHandlers();
			return this;
		}
	}]);

	return CrudRow;
}(Template);
/*!
 * table
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates and creates tables
 * @extends Template
 */


var Table = function (_Template2) {
	_inherits(Table, _Template2);

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
		var _ret2;

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
		var _this2 = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, $Util.opts(defaults, options)));

		_this2.$rows = [];
		_this2._cachedData = {};
		_this2._processedData = {};

		// states
		_this2.isFirstBuild = true;

		// provide a default empty msg
		_this2.$empty = $('<tr class="table-empty"><td>There is no data to display.</td></tr>');

		return _ret2 = _this2, _possibleConstructorReturn(_this2, _ret2);
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
		key: '_useTemplate',
		value: function _useTemplate() {
			var $template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_get(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), '_useTemplate', this).call(this, $template);
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
		key: '_useDefaultTemplate',
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
		key: '_cacheData',
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
		key: '_processData',
		value: function _processData(data) {
			var self = this;
			if (isArray(data)) this._processedData = data;else this._processedData = $.extend(true, {}, data);

			$.each(data, function (i, e) {
				// add a private _id for objects
				if (isObject(e)) {
					self._processedData[i]._id = i;
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
		key: '_processRow',
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
		key: '_render',
		value: function _render(data) {
			var self = this;
			var useTemplate = !isNull(this.settings.template);
			var dataIsArray = Array.isArray(data);

			// empty the <tbody>
			this.wipe();

			if (!$.isEmptyObject(data) || dataIsArray && data.length) this.toggleEmpty(false);else return this;

			// run through data and create rows
			Util.each(data, function (i, e) {
				var $row = createRow();

				// if data is an object and a template is used
				if (useTemplate && !Array.isArray(e)) $row.populateChildren(e);
				// if data is an array
				else populateRow($row, e);

				addRow($row);
			});
			return this;

			// rows

			/**
    * Create a new row
    * @returns {jQuery}
    */
			function createRow() {
				return self.$tr.clone();
			}

			/**
    * Add the row to the <tobdy>
    * @param {jQuery} $row
    */
			function addRow($row) {
				$row.appendTo(self.$tbody);
				self.$rows.push($row);
			}

			/**
    * Populate a row with data
    * The <td> elements will be populated
    * @param {jQuery} $row - row to populate
    * @param {object[]} data - array of data
    */
			function populateRow($row, data) {
				var dataArr = [];
				Util.each(data, function (i, e) {
					dataArr.push(e);
				});

				var $tds = $row.find('td');
				$.each($tds, function (i, e) {
					$(e).html(dataArr[i]);
				});
			}
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
		key: '_isEmptyTable',
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
		key: 'build',
		value: function build(data) {
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
		key: 'wipe',
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
		key: 'deleteRow',
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
		key: 'toggleEmpty',
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
		var _ret3;

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
		var _this3 = _possibleConstructorReturn(this, (RenderTable.__proto__ || Object.getPrototypeOf(RenderTable)).call(this, $Util.opts(defaults, options)));

		_this3.rowManager = new TemplateManager({
			identifier: _this3.settings.identifier,
			useObjectNames: _this3.settings.useObjectNames,
			template: _this3.settings.rowTemplate || _this3.$tr,
			$wrapper: _this3.$tbody
		});

		_this3.$wrapper.addClass('renderTable');

		return _ret3 = _this3, _possibleConstructorReturn(_this3, _ret3);
	}

	/**
  * Render via TemplateManager.manage.
  * Cannot use an array of non-object data
  * @param {object|object[]} data
  * @returns {RenderTable}
  * @private
  */


	_createClass(RenderTable, [{
		key: '_render',
		value: function _render(data) {
			var dataIsArray = Array.isArray(data);

			if ($.isEmptyObject(data) || !data || dataIsArray && !data.length) this.toggleEmpty(true);else if (dataIsArray && !isObject(data[0])) throw new ReferenceError("RenderTable._render: data must be an object, or an array of objects");

			this.rowManager.build(data);
			return this;
		}

		/**
   * Empty the tbody and clear cached data
   * @returns {RenderTable}
   */

	}, {
		key: 'wipe',
		value: function wipe() {
			_get(RenderTable.prototype.__proto__ || Object.getPrototypeOf(RenderTable.prototype), 'wipe', this).call(this);
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
		key: 'deleteRow',
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
		var _ret4;

		_classCallCheck(this, ControlTable);

		var defaults = {
			buttons: {
				deleteButton: true,
				viewButton: true,
				updateButton: true
			}
		};

		var _this4 = _possibleConstructorReturn(this, (ControlTable.__proto__ || Object.getPrototypeOf(ControlTable)).call(this, $Util.opts(defaults, options)));

		_this4._setupButtons();
		_this4.$wrapper.addClass('controlTable');

		return _ret4 = _this4, _possibleConstructorReturn(_this4, _ret4);
	}

	// buttons

	/**
  * Add headers and tds for
  * each button that is enabled
  * @private
  */


	_createClass(ControlTable, [{
		key: '_setupButtons',
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
		key: '_processRow',
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
		key: '_addDeleteButton',
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
		key: '_createDeleteButton',
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
		key: '_addUpdateButton',
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
		key: '_createUpdateButton',
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
		key: '_addViewButton',
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
		key: '_createViewButton',
		value: function _createViewButton(data) {
			return $('<button type="button" title="View">View</button>');
		}
	}]);

	return ControlTable;
}(RenderTable);
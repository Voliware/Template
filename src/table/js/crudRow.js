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
class CrudRow extends Template {

	/**
	 * Constructor
	 * @returns {CrudRow}
	 */
	constructor(options){
		var defaults = {
			struct : {
				$deleteButton : '[name="deleteButton"]',
				$updateButton : '[name="updateButton"]',
				$viewButton : '[name="viewButton"]'
			}
		};
		super($Util.opts(defaults, options));

		// properties
		this._cachedData = {};
		this._processedData = {};

		return this;
	}

	// data

	/**
	 * Cache data
	 * @param {object} data
	 * @returns {CrudRow}
	 * @private
	 */
	_cacheData(data){
		this._cachedData = $.extend(true, {}, data);
		return this;
	}

	/**
	 * Process data
	 * @param {object} data
	 * @returns {CrudRow}
	 * @private
	 */
	_processData(data){
		this._processedData = $.extend(true, {}, data);
		return this;
	}

	/**
	 * Populate children override.
	 * Cache and process data first.
	 * @param {object} data
	 * @returns {CrudRow}
	 */
	populateChildren(data){
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
	_attachDeleteButtonHandlers(){
		var self = this;
		this.$deleteButton.click(function(){
			self._deleteButtonAction();
		});
		return this;
	}

	/**
	 * Action that occurs when delete button is clicked
	 * @private
	 */
	_deleteButtonAction(){
		throw new Error("CrudRow._deleteButtonAction: must be implemented in child class");
	}

	// update

	/**
	 * Attach update button handlers
	 * @virtual
	 * @private
	 */
	_attachUpdateButtonHandlers(){
		var self = this;
		this.$updateButton.click(function(){
			self._updateButtonAction();
		});
		return this;
	}

	/**
	 * Action that occurs when update button is clicked
	 * @private
	 */
	_updateButtonAction(){
		throw new Error("CrudRow._updateButtonAction: must be implemented in child class");
	}

	// view

	/**
	 * Attach view button handlers
	 * @virtual
	 * @private
	 */
	_attachViewButtonHandlers(){
		var self = this;
		this.$viewButton.click(function(){
			self._viewButtonAction();
		});
		return this;
	}

	/**
	 * Action that occurs when view button is clicked
	 * @private
	 */
	_viewButtonAction(){
		throw new Error("CrudRow._viewButtonAction: must be implemented in child class");
	}

	/**
	 * Initialize the row
	 * @returns {CrudRow}
	 */
	initialize(){
		this._attachDeleteButtonHandlers()
			._attachUpdateButtonHandlers()
			._attachViewButtonHandlers();
		return this;
	}
}
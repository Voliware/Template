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
class CrudRow extends Row {

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
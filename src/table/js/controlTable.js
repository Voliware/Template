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
 */
class ControlTable extends RenderTable {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.buttons]
	 * @param {boolean} [options.buttons.deleteButton=true]
	 * @param {boolean} [options.buttons.updateButton=true]
	 * @param {boolean} [options.buttons.viewButton=true]
	 * @returns {ControlTable}
	 */
	constructor(options){
		var defaults = {
			buttons : {
				deleteButton : true,
				viewButton : true,
				updateButton : true
			}
		};
		super($Util.opts(defaults, options));

		this._setupButtons();
		this.$wrapper.addClass('controlTable');

		return this;
	}

	// buttons

	/**
	 * Add headers and tds for
	 * each button that is enabled
	 * @private
	 */
	_setupButtons(){
		var self = this;

		$.each(this.settings.buttons, function(i, e){
			if(e){
				addHeader();
				addTd(i);
			}
		});

		/**
		 * Add a blank header
		 */
		function addHeader(){
			self.$thead.find('tr').append('<th></th>');
		}

		/**
		 * Add a td for a button
		 * @param {string} dataName - the data-name attr
		 */
		function addTd(dataName){
			self.$tr.append('<td data-name="'+dataName+'"></td>');
		}
	}

	/**
	 * Add each enabled button
	 * @param {object} data
	 * @returns {object}
	 * @private
	 */
	_processRow(data){
		if(this.settings.buttons.deleteButton)
			this._addDeleteButton(data);
		if(this.settings.buttons.updateButton)
			this._addUpdateButton(data);
		if(this.settings.buttons.viewButton)
			this._addViewButton(data);
		return data;
	}

	// delete button

	/**
	 * Add a delete button
	 * @param {object} data
	 * @returns {ControlTable}
	 * @private
	 */
	_addDeleteButton(data){
		data.deleteButton = this._createDeleteButton(data);
		return this;
	}

	/**
	 * Create a delete button
	 * @param {object} data
	 * @returns {jQuery}
	 * @private
	 */
	_createDeleteButton(data){
		var self = this;
		var $btn = $('<button type="button" title="Delete">Delete</button>');
		$btn.click(function(){
			self.deleteRow(data[self.settings.identifier]);
		});
		return $btn;
	}

	// update button

	/**
	 * Add an update button
	 * @param {object} data
	 * @returns {ControlTable}
	 * @private
	 */
	_addUpdateButton(data){
		data.updateButton = this._createUpdateButton(data);
		return this;
	}

	/**
	 * Create an update button
	 * @param {object} data
	 * @returns {jQuery}
	 * @private
	 */
	_createUpdateButton(data){
		return $('<button type="button" title="Update">Update</button>');
	}

	// view button

	/**
	 * Add a view button
	 * @param {object} data
	 * @returns {ControlTable}
	 * @private
	 */
	_addViewButton(data){
		data.viewButton = this._createViewButton(data);
		return this;
	}

	/**
	 * Create a view button
	 * @param {object} data
	 * @returns {jQuery}
	 * @private
	 */
	_createViewButton(data){
		return $('<button type="button" title="View">View</button>');
	}
}
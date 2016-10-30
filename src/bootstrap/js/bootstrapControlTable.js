/*!
 * bootstrapControlTable
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Control table with bootstrap buttons
 * @extends ControlTable
 */
class BootstrapControlTable extends ControlTable {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {BootstrapControlTable}
	 */
	constructor(options){
		super(options);
		return this;
	}

	/**
	 * Create a delete button
	 * @param {object} data
	 * @returns {jQuery}
	 * @private
	 */
	_createDeleteButton(data){
		var $btn = super._createDeleteButton(data);
		$btn.addClass('btn btn-default');
		$btn.html('<span class="glyphicon glyphicon-trash"></span>');
		return $btn;
	}

	/**
	 * Create an update button
	 * @param {object} data
	 * @returns {jQuery}
	 * @private
	 */
	_createUpdateButton(data){
		var $btn = super._createUpdateButton(data);
		$btn.addClass('btn btn-default');
		$btn.html('<span class="glyphicon glyphicon-edit"></span>');
		return $btn;
	}

	/**
	 * Create a view button
	 * @param {object} data
	 * @returns {jQuery}
	 * @private
	 */
	_createViewButton(data){
		var $btn = super._createViewButton(data);
		$btn.addClass('btn btn-default');
		$btn.html('<span class="glyphicon glyphicon-info-sign"></span>');
		return $btn;
	}
}
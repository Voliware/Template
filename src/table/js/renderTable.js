/*!
 * renderTable
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Updates tables without redrawing them
 * @extends Table
 */
class RenderTable extends Table {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {string} [options.identifier='id'] - required for TemplateManager
	 * @param {boolean} [options.useObjectNames=false] - required for TemplateManager
	 * @returns {RenderTable}
	 */
	constructor(options){
		var defaults = {
			// to manage objects, they must have
			// a unique id before they get to Manager.
			// this is their id property name
			identifier: 'id',
			// OR instead of using an identifier,
			// use the name of the object.
			// this only works when passing
			// objects of objects to manage()
			useObjectNames : false
		};
		super($Util.opts(defaults, options));

		// row manager to re-build rows instead
		// of wiping the <tbody> each time
		this.rowManager = new TemplateManager({
			identifier : this.settings.identifier,
			useObjectNames : this.settings.useObjectNames,
			template : this.$tr,
			$wrapper  : this.$tbody
		});

		this.$wrapper.addClass('renderTable');

		return this;
	}

	/**
	 * Render via TemplateManager.manage.
	 * Cannot use an array of non-object data
	 * @param {object|object[]} data
	 * @returns {RenderTable}
	 * @private
	 */
	_render(data){
		var dataIsArray = $.isArray(data);

		if(dataIsArray && !isObject(data[0]))
			throw new ReferenceError("RenderTable._render: data must be an object, or an array of objects");

		if($.isEmptyObject(data) || !data || (dataIsArray && !data.length))
			this.toggleEmpty(true);

		this.rowManager.build(data);
		return this;
	}

	/**
	 * Empty the tbody and clear cached data
	 * @returns {RenderTable}
	 */
	wipe(){
		super.wipe();
		this.rowManager.deleteObjects();
		return this;
	}

	/**
	 * Delete a row based on its identifier
	 * in the TemplateManager collection of rows
	 * or simply pass the row data object itself
	 * @returns {RenderTable}
	 */
	deleteRow(){
		this.rowManager.deleteObject(...arguments);
		// check if all rows were deleted
		if(this._isEmptyTable()){
			this.toggleEmpty();
		}
		return this;
	}
}
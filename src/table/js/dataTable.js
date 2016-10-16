/*!
 * dataTable
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Updates tables without redrawing them
 * @extends Table
 */
class DataTable extends Table {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {string} [options.rowIdentifier='id'] - required for TemplateManager
	 * @param {boolean} [options.useObjectNames=false] - required for TemplateManager
	 * @returns {DataTable}
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

		return this;
	}

	/**
	 * Render via TemplateManager.manage.
	 * Cannot use an array of non-object data
	 * @param {object|object[]} data
	 * @returns {DataTable}
	 * @private
	 */
	_render(data){
		if($.isArray(data) && !isObject(data[0]))
			throw new ReferenceError("DataTable._render: data must be an object, or an array of objects");
		this.rowManager.build(data);
		return this;
	}

	/**
	 * Empty the tbody and clear cached data
	 * @returns {DataTable}
	 */
	wipe(){
		super.wipe();
		this.rowManager._empty();
		return this;
	}

	/**
	 * Delete a row based on its identifier
	 * in the TemplateManager collection of rows
	 * @param {number|string} id
	 * @returns {DataTable}
	 */
	deleteRow(id){
		String(id);
		this.rowManager.deleteObject(id);
		return this;
	}
}
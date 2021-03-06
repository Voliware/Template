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
			useObjectNames : false,
			// instead of using a jquery object
			// such as a tr, use a Template class
			rowTemplate : null
		};
		super($Util.opts(defaults, options));
		
		// components
		// row manager to re-build rows instead
		// of wiping the <tbody> each time
		this.rowManager = new TemplateManager({
			identifier : this.settings.identifier,
			useObjectNames : this.settings.useObjectNames,
			template : this.settings.rowTemplate || this.$tr,
			$wrapper  : this.$tbody
		});

		this.$wrapper.addClass('renderTable');

		return this;
	}

	/**
	 * Set the table and rowManager's identifier
	 * @param {string} identifier
	 * @returns {RenderTable}
	 * @private
	 */
	setIdentifier(identifier){
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
	_render(data){
		var dataIsArray = Array.isArray(data);

		if($.isEmptyObject(data) || !data || (dataIsArray && !data.length))
			this.toggleEmpty(true);
		else if(dataIsArray && !isObject(data[0]))
			throw new ReferenceError("RenderTable._render: data must be an object, or an array of objects");

		this.rowManager.build(data);
		return this;
	}

	/**
	 * Set the row template settings property
	 * as well as the row manager's row template.
	 * @param {Row|Template} template
	 * @returns {RenderTable}
	 */
	setRowTemplate(template){
		this.settings.rowTemplate = template;
		this.rowManager.settings.rowTemplate = template;
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
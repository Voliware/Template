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
class TemplateManager extends Manager {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @param {jQuery|string|Template} [options.template=null] - the template object to create
	 * when the manager creates new objects
	 * @param {object} [options.$wrapper=$('<div class="manager"></div>')] - the
	 * TemplateManager's $wrapper property, where all managed Templates are appended
	 * @returns {TemplateManager}
	 */
	constructor(options = {}){
		super(options);

		this.$wrapper = options.$wrapper ? options.$wrapper : $('<div class="manager"></div>');
		$Util.jQuerify(this);

		this.template = isString(options.template)
			? $(options.template)
			: options.template;

		// alias
		this.templates = this.objects;

		// current active template if applicable
		this.current = null;

		return this;
	}

	/**
	 * Add an object to the collection
	 * and append it to the $wrapper.
	 * Accepts a Template object or jQuery
	 * @returns {jQuery|Template}
	 * @private
	 */
	_add() {
		var obj = super._add(...arguments);
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
	_update(data) {
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
	_delete() {
		var template = this._get(...arguments);
		if(template){
			template.remove();
			super._delete(template);
		}
		else {
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
	_create(id, data = {}){
		if(!this.template)
			throw new ReferenceError("TemplateManager._create: no template option was passed to constructor");

		// create a new template if it is a Template class
		// or clone it if it is a jquery object
		var template;
		if(this.template.prototype instanceof Template)
			template = new this.template(data);
		else if(isJquery(this.template))
			template = this.template.clone();

		this._populateTemplate(template, data);

		return this._add(template, id);
	}

	/**
	 * Deletes all objects from the collection
	 * @returns {Manager}
	 * @private
	 */
	_empty(){
		for(var i in this.objects){
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
	_populateTemplate(template, data){
		template.populateChildren(data);
		return this;
	}

	/**
	 * Redirect manage to build
	 * @param {object|object[]} data
	 * @returns {TemplateManager}
	 */
	manage(data){
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
	build(data){
		this._cacheData(data);
		this._processData(data);

		if(!isObject(this._processedData) && this.settings.useObjectNames)
			throw new Error("TemplateManager.build: to use option useObjectNames, object passed to build() must be an object.");

		var self = this;
		var id = this.settings.identifier;
		// maintain an array of ids found in data
		// then xreference this to see which objects
		// no longer exist (data is the master here)
		var dataIds = [];

		// add or update objects
		for(var i in this._processedData){
			var e = this._processedData[i];

			if(this.settings.useObjectNames)
				e[id] = i;

			// ids must be defined within objects
			// there is no other way to know if an
			// object is new or old otherwise
			if(!isDefined(e[id]))
				return console.error("TemplateManager.build: cannot manage objects with no ids");

			// objectIds will always be strings
			var objId = e[id].toString();
			var obj = self.objects[objId];
			if (isDefined(obj))
				self._update(e);
			else
				self._create(objId, e);
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
	setCurrent(name){
		var self = this;
		var t = this.templates[name];
		if(isDefined(t)){
			if(!isNull(this.current)){
				this.current.slideUp(function(){
					show();
					self.current = t;
				});
			}
			else{
				show();
				this.current = t;
			}
		}
		else
			console.error("TemplateManager.setCurrent: object not found.");

		return this;

		/**
		 * Slidedown the object
		 */
		function show(){
			t.slideDown();
		}
	}

	/**
	 * Public method to create a template
	 * @returns {*}
	 */
	createTemplate(){
		return this._create(...arguments);
	}

	/**
	 * Add many templates to the collection
	 * @param {...object} arguments - one or more objects
	 * @returns {TemplateManager}
	 */
	addTemplates(){
		return super.addObjects(...arguments);
	}

	/**
	 * Public method to add a template
	 * @returns {*}
	 */
	addTemplate() {
		return this._add(...arguments);
	}

	/**
	 * Public method to get a template
	 * @returns {*}
	 */
	getTemplate(){
		return this._get(...arguments);
	}

	/**
	 * Public method to update a template
	 * @returns {*}
	 */
	updateTemplate() {
		return this._update(...arguments);
	}

	/**
	 * Public method to delete a template
	 * @returns {*}
	 */
	deleteTemplate() {
		return this._delete(...arguments);
	}

	/**
	 * Public method to delete all templates
	 * @returns {*}
	 */
	deleteTemplates() {
		return this._empty();
	}
}
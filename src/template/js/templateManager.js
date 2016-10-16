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
	 * @param {jQuery|string} [options.template=null] - the template object to create
	 * when the manager creates new objects
	 * @param {object} [options.$wrapper=$('<div class="manager"></div>')] - the
	 * TemplateManager's $wrapper property, where all managed Templates are appended
	 * @returns {TemplateManager}
	 */
	constructor(options){
		if(!isDefined(options.template))
			throw new ReferenceError("TemplateManager.constructor: options must have a template property");

		super(options);

		this.template = options.template;
		this.$wrapper = options.$wrapper ? options.$wrapper : $('<div class="manager"></div>');
		$Util.jQuerify(this);

		this.$template = isString(options.template)
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
		this.$wrapper.append(arguments[0].$wrapper || arguments[0]);
		return obj;
	}

	/**
	 * Update a template by simply re-populating it
	 * @param {object} template - template data
	 * @returns {TemplateManager}
	 * @private
	 */
	_update(template) {
		var id = this.getId(template);
		var $template = this.templates[id];
		this.populateTemplate($template, template);
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
	_delete(id) {
		this.templates[id].remove();
		super._delete(id);
		return this;
	}

	/**
	 * Create a template object that this manager manages
	 * @param {object} data - data to populate the template with
	 * Contains keys whos names are identical with [data-name]
	 * or [name] attribute values within the template's elements,
	 * so $.fn.populate may appropriately populate html or inputs
	 * @returns {*|null|Template}
	 * @private
	 */
	_create(data){
		var id = this.getId(data);
		if(!id)
			throw new Error("TemplateManager._add: templates must have a " + this.settings.identifier + " property");

		// clone the template and populate it with data
		var $template = this.$template.clone();
		// add a flag for first updates
		$template.isFirstUpdate = true;
		this.populateTemplate($template, data);

		return this._add($template, id);
	}

	/**
	 * Given a set of data, create or update existing Templates
	 * @param {object} data - a collection of objects
	 * that have keys whos names are identical with [data-name]
	 * or [name] attribute values within the template's elements,
	 * so $.fn.populate may appropriately populate html or inputs
	 * todo: this is literally a clone of manage with no process, and a _create call
	 * @returns {TemplateManager}
	 */
	build(data){
		if(!isObject(data) && this.settings.useObjectNames)
			throw new Error("TemplateManager.build: to use option useObjectNames, object passed to build() must be an object.");

		var self = this;
		var id = this.settings.identifier;
		// maintain an array of ids found in data
		// then xreference this to see which objects
		// no longer exist (data is the master here)
		var dataIds = [];

		// add or update objects
		for(var i in data){
			var e = data[i];

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
				self._create(e);
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
	 * Populate a Template with data.
	 * If any child elements have [data-update] set to
	 * false, set a new attr [data-populate] to false. This way, the
	 * element is only updated the first time.
	 * This prevents controls, like selects from "popping"
	 * @param {jQuery} $template - Template to populate
	 * @param {object} data - template data.
	 * @returns {TemplateManager}
	 */
	populateTemplate($template, data){
		$template.populateChildren(data);

		// set elements that don't want to be updated
		// to have data-populate="false"
		// the isFirstUpdate flag was added in _add
		if($template.isFirstUpdate){
			$template.find('[data-update="false"]').attr('data-populate', false);
			$template.isFirstUpdate = false;
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
}
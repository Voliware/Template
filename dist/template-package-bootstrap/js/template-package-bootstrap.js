'use strict';var _get2=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if("value"in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}/*!
 * util
 * https://github.com/Voliware/Util
 * Licensed under the MIT license.
 *//**
 * General utility functions
 */var Util=function(){function Util(){_classCallCheck(this,Util);}_createClass(Util,null,[{key:'each',/**
	 * Wraps a for in loop.
	 * For each object it will pass the
	 * property name and value to a callback.
	 * @param {object} data - data to loop through
	 * @param {function} cb - callback
	 */value:function each(data,cb){for(var i in data){var e=data[i];cb(i,e);}}}]);return Util;}();// helpers
if(typeof isDefined==='undefined'){window.isDefined=function(x){return typeof x!=='undefined';};}if(typeof isNull==='undefined'){window.isNull=function(x){return x===null;};}if(typeof isNullOrUndefined==='undefined'){window.isNullOrUndefined=function(x){return x===null||x==='undefined';};}if(typeof isFunction==='undefined'){window.isFunction=function(x){return typeof x==='function';};}if(typeof isString==='undefined'){window.isString=function(x){return typeof x==='string';};}if(typeof isNumber==='undefined'){window.isNumber=function(x){return typeof x==='number';};}if(typeof isObject==='undefined'){window.isObject=function(x){return x!==null&&(typeof x==='undefined'?'undefined':_typeof(x))==='object';};}if(typeof isArray==='undefined'){window.isArray=function(x){return x!==null&&Array.isArray(x);};}if(typeof getType==='undefined'){//http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
window.getType=function(x){if(x===null)return"[object Null]";return Object.prototype.toString.call(x);};}if(typeof createGuid==='undefined'){window.createGuid=function createGuid(){function s4(){return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);}return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();};}// array
if(typeof Array.diff==='undefined'){Array.diff=function(a,b){return a.filter(function(i){return b.indexOf(i)<0;});};}if(typeof Array.min==='undefined'){Array.min=function(array){return Math.min.apply(Math,array);};}if(typeof Array.max==='undefined'){Array.max=function(array){return Math.max.apply(Math,array);};}//https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if(typeof Object.assign!='function'){Object.assign=function(target){'use strict';if(target==null){throw new TypeError('Cannot convert undefined or null to object');}target=Object(target);for(var index=1;index<arguments.length;index++){var source=arguments[index];if(source!=null){for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}}return target;};}/**
 * Deep copy an object (make copies of all its object properties, sub-properties, etc.)
 * An improved version of http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
 * that doesn't break if the constructor has required parameters
 *
 * It also borrows some code from http://stackoverflow.com/a/11621004/560114
 */function deepCopy(src,/* INTERNAL */_visited,_copiesVisited){if(src===null||(typeof src==='undefined'?'undefined':_typeof(src))!=='object'){return src;}//Honor native/custom clone methods
if(typeof src.clone=='function'){return src.clone(true);}//Special cases:
//Date
if(src instanceof Date){return new Date(src.getTime());}//RegExp
if(src instanceof RegExp){return new RegExp(src);}//DOM Element
if(src.nodeType&&typeof src.cloneNode=='function'){return src.cloneNode(true);}// Initialize the visited objects arrays if needed.
// This is used to detect cyclic references.
if(_visited===undefined){_visited=[];_copiesVisited=[];}// Check if this object has already been visited
var i,len=_visited.length;for(i=0;i<len;i++){// If so, get the copy we already made
if(src===_visited[i]){return _copiesVisited[i];}}//Array
if(Object.prototype.toString.call(src)=='[object Array]'){//[].slice() by itself would soft clone
var ret=src.slice();//add it to the visited array
_visited.push(src);_copiesVisited.push(ret);i=ret.length;while(i--){ret[i]=deepCopy(ret[i],_visited,_copiesVisited);}return ret;}//If we've reached here, we have a regular object
//make sure the returned object has the same prototype as the original
var proto=Object.getPrototypeOf?Object.getPrototypeOf(src):src.__proto__;if(!proto){proto=src.constructor.prototype;//this line would probably only be reached by very old browsers
}var dest=object_create(proto);//add this object to the visited array
_visited.push(src);_copiesVisited.push(dest);for(var key in src){//Note: this does NOT preserve ES5 property attributes like 'writable', 'enumerable', etc.
//For an example of how this could be modified to do so, see the singleMixin() function
dest[key]=deepCopy(src[key],_visited,_copiesVisited);}return dest;}//If Object.create isn't already defined, we just do the simple shim,
//without the second argument, since that's all we need here
var object_create=Object.create;if(typeof object_create!=='function'){object_create=function object_create(o){function F(){}F.prototype=o;return new F();};}/*!
 * util-jquery
 * https://github.com/Voliware/Util
 * Licensed under the MIT license.
 */if(!isDefined($))throw new ReferenceError("util-jquery requires jquery 2.2.2 or greater");// helpers
if(typeof isJquery==='undefined'){window.isJquery=function(x){return x instanceof $;};}(function($){/**
	 * Checks if an element has an attribute
	 * @param {string} attr - attribute name
	 * @returns {boolean} - true if it does, false otherwise
	 */$.fn.hasAttr=function(attr){return $(this).is('['+attr+']');};/**
	 * Populate a DOM object in the appropriate way.
	 * Extend with $Util.populate object
	 * @param {string|number|jQuery} data
	 * @param {boolean} [trigger=true] - whether to call change and input events
	 */$.fn.populate=function(data){var trigger=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var $this=$(this);// don't popualte if data-populate=false
if($this.data('populate')===false)return this;var tag=$this.prop("tagName").toLowerCase();var type=$this.attr('type');// populate using extensions or defaults
var extension=getExtension(tag);if(extension)extension.call(this,data);else defaultPopulate(tag,type,data);// prevent further populates if update is set to false
if($this.data('update')===false)this.attr('data-populate',false);// trigger input and change events
if(trigger)$this.trigger('change').trigger('input');return this;/**
		 * Default populate switch
		 * @param {string} tag - element tag
		 * @param {string} type - element type
		 * @param {*} data - data to populate with
		 */function defaultPopulate(tag,type,data){switch(tag){case'input':_populateInput(type,data);break;case'select':case'textarea':$this.val(data);break;case'img':$this.attr('src',data);break;case"button":$this.prop('disabled',data===0);break;default:$this.html(data);break;}}/**
		 * Get the extension for this tag,
		 * or for a data-tag attribute
		 * @param {string} tag - element tag
		 * @returns {function|null}
		 */function getExtension(tag){if($Util.populate[tag])return $Util.populate[tag];if($this.hasAttr('data-tag'))return $Util.populate[$this.attr('data-tag')];return null;}/**
		 * Populate an input according to type
		 */function _populateInput(type,data){switch(type){case"checkbox":var checkedValue=$this.data('checked');if(data.toString()===checkedValue||data.toString()==="1"||data===true)$this.prop('checked',true);break;case"radio":var dataStr=data.toString();$this.filter('[value="'+dataStr+'"]').prop('checked',true);break;default:$this.val(data);break;}}};/**
	 * Populates the children of an object such as a form
	 * by matching data keys with DOM elements that have the
	 * attribute [data-name="key"] or [name="key"]. Uses
	 * $.populate(data) to appropriately fill in the found element.
	 * @param {object} data
	 * @param {boolean} [trigger=true] - whether to call change and input events
	 * @returns {jQuery}
	 */$.fn.populateChildren=function(data){var trigger=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var $this=$(this);$.each(data,function(i,e){var $elInput=$this.find('[name="'+i+'"]');var $el=$this.find('[data-name="'+i+'"]');if($elInput.length>0&&$elInput.data('populate')!==false)$elInput.populate(e,trigger);if($el.length>0&&$el.data('populate')!==false)$el.populate(e,trigger);});return this;};/**
	 * Populate an elements attributes by matching
	 * data keys with attributes of the same name.
	 * @param {object} data
	 * @returns {jQuery}
	 */$.fn.populateAttr=function(data){var $this=$(this);$.each(data,function(i,e){$this.attr('i',e);});return this;};/**
	 * Slide toggle who's first arg is a toggle state
	 * @param {boolean} state - true to slide down
	 * @param {string} [options=""]
	 * @param {function} [cb=null]
	 */$.fn.slideToggleState=function(state){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';var cb=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(state)$(this).slideDown(options,cb);else $(this).slideUp(options,cb);return this;};/**
	 * Append option(s) to a select
	 * @param {*} arguments - Either an object of key/value pairs, where the key is the
	 * option value and the value is the string within the tags,
	 * or a key and value as two parameters to add one option
	 * @returns {jQuery}
	 */$.fn.addToSelect=function(){var data={};if(arguments.length>1)data[arguments[0]]=arguments[1];else data=arguments[0];var $this=$(this);if($this.is('select')){Util.each(data,function(i,e){var opt='<option value="'+i+'">'+e+'</option>';$this.append(opt);});}return this;};/**
	 * Disable/enable an option/set of options based on value attribute
	 * @param {*} [arguments] - Pass a boolean to toggle all options,
	 * pass an array and boolean to toggle some options,
	 * pass a string and boolean to toggle one option
	 * @returns {jQuery}
	 */$.fn.toggleOption=function(){var $this=$(this);if(!$this.is('select'))return this;var state;var value;// toggle specific options
if(arguments.length>1){value=arguments[0];if(!$.isArray(value))value=[value];state=arguments[1];for(var i=0;i<value.length;i++){$this.find('option[value="'+value[i]+'"]').prop('disabled',!state);}}// toggle all <option>s
else{state=arguments[0];$this.find('option').prop('disabled',!state);}return this;};})(jQuery);/**
 * jQuery utility functions
 */var $Util=function(){function $Util(){_classCallCheck(this,$Util);}_createClass($Util,null,[{key:'jQuerify',/**
	 * Attaches all jQuery functions to a
	 * $wrapper property of an object, but
	 * always returns the base object
	 * @param {*} obj - some object that has a $wrapper property
	 * @param {boolean} [override=false] - whether to override any already-named properties
	 * @param {jQuery} obj.$wrapper
	 */value:function jQuerify(obj){var override=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(!obj.$wrapper)throw new ReferenceError('$Util.jQuerify: $wrapper must be a property of the first argument');Util.each($Util.jqueryPrototype,function(i,e){// continue if override is false
if(isDefined(obj[e])&&!override)return true;obj[e]=function(){var _obj$$wrapper;(_obj$$wrapper=obj.$wrapper)[e].apply(_obj$$wrapper,arguments);return obj;};});}/**
	 * Convenient wrapper for merging defaults
	 * and options object with jquery deep $.extend
	 * @param {object} defaults - the default settings
	 * @param {object} options - set options
     */},{key:'opts',value:function opts(defaults,options){return $.extend(true,defaults,options);}}]);return $Util;}();$Util.jqueryPrototype=Object.getOwnPropertyNames($.prototype);// extensions for $.fn.populate
// specificy tag name as object name
// and a prop called populate that is a
// function that takes some data argument
$Util.populate={};/*!
 * eventSystem
 * https://github.com/Voliware/Util
 * Licensed under the MIT license.
 *//**
 * Basic event system.
 * Uses the on/off/trigger or emit methods.
 */var EventSystem=function(){/**
	 * Constructor
	 * @returns {EventSystem}
	 */function EventSystem(){_classCallCheck(this,EventSystem);this.events={};return this;}/**
	 * Create an event an object
	 * with an array of callbacks
	 * @param {string} name - name of the event
	 * @returns {{callbacks: Array}}
	 * @private
	 */_createClass(EventSystem,[{key:'_createEvent',value:function _createEvent(name){return this.events[name]={callbacks:[]};}/**
	 * Destroy an event
	 * @param {string} name - name of the event
	 * @returns {EventSystem}
	 * @private
	 */},{key:'_destroy',value:function _destroy(name){if(isDefined(this.event[name]))delete this.event[name];return this;}/**
	 * Attaches a callback to an event
	 * @param {string} name - name of the event
	 * @param {function} callback - the callback function
	 * @returns {EventSystem}
	 */},{key:'on',value:function on(name,callback){var event=this.events[name];if(!isDefined(event))event=this._createEvent(name);event.callbacks.push(callback);return this;}/**
	 * Detach a callback from an event.
	 * This will only work if the callback is not anonymous
	 * @param {string} name - name of the event
	 * @param {function} callback - the callback function
	 * @returns {EventSystem}
	 */},{key:'off',value:function off(name,callback){var event=this.events[name];if(isDefined(event)){var i=event.callbacks.indexOf(callback);if(i>-1)event.callbacks.splice(i,1);}return this;}/**
	 * Remove all callbacks for an event
	 * @param {string} name - name of the event
	 * @returns {EventSystem}
	 */},{key:'offAll',value:function offAll(name){var event=this.events[name];if(isDefined(event))event[name].callbacks=[];return this;}/**
	 * Run all callbacks attached to an event
	 * @returns {EventSystem}
	 */},{key:'trigger',value:function trigger(){// grab the name of the event and remove it from arguments
var shift=[].shift;var name=shift.apply(arguments);var event=this.events[name];// there's no need to trigger if no one is listening
if(!isDefined(event))return this;for(var i=0;i<event.callbacks.length;i++){var _event$callbacks;(_event$callbacks=event.callbacks)[i].apply(_event$callbacks,arguments);}return this;}/**
	 * Alias to trigger method
	 * @returns {EventSystem}
	 */},{key:'emit',value:function emit(){return this.trigger();}}]);return EventSystem;}();/*!
 * manager
 * https://github.com/Voliware/Util
 * Licensed under the MIT license.
 */if(!isDefined(EventSystem))throw new ReferenceError("Manager requires EventSystem");/**
 * Generic object manager.
 * Adds/updates/deletes objects in a collection.
 * Can accept an array or object of
 * data and determine which objects
 * are new, old, or no longer exist
 * @extends EventSystem
 */var Manager=function(_EventSystem){_inherits(Manager,_EventSystem);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {string} [options.identifier='id'] - the property name that identifies
	 * each object, which is a property of each object, managed by this manager
	 * @param {boolean} [options.useObjectNames=false] - whether to use the names
	 * of objects passed to manage() as their object identifiers
	 * @returns {Manager}
	 */function Manager(options){var _ret;_classCallCheck(this,Manager);var _this=_possibleConstructorReturn(this,(Manager.__proto__||Object.getPrototypeOf(Manager)).call(this));var defaults={// to manage objects, they must have
// a unique id before they get to Manager.
// this is their id property name
identifier:'id',// OR instead of using an identifier,
// use the name of the object.
// this only works when passing
// objects of objects to manage()
useObjectNames:false,// max number of objs to manage
max:0};_this.settings=Object.assign(defaults,options);// all child classes will use
// a more friendly name for objects
// so any mutations must be done
// to the object itself, not this ref
_this.objects={};_this.count=0;// cached and processed data passed to manage()
_this._cachedData={};_this._processedData={};// last serialized collection
_this.serializedObjects=[];// a flag that is set to true when the add/edit/delete
// functions are called, to indicate that the
// previously serialized data is now old
_this.requiresNewSerialize=false;return _ret=_this,_possibleConstructorReturn(_this,_ret);}/**
	 * Check if an object exists in the collection
	 * @param {...(number|object|string)} arguments - the object or the id of the object
	 * @returns {boolean}
	 * @private
	 */_createClass(Manager,[{key:'_exists',value:function _exists(){var arg=arguments[0];if(isString(arg)||isNumber(arg))return isDefined(this.objects[arg]);else return isDefined(this.objects[arg[this.settings.identifier]]);}/**
	 * Get an object in the managed collection
	 * by id (string/number) or by an object's
	 * property as set in this.settings.identifier
	 * @param {...(number|object|string)} arguments - the object or the id of the object
	 * @returns {*|null}
	 * @private
	 */},{key:'_get',value:function _get(){var arg=arguments[0];var obj=null;var identifier=this.settings.identifier;// an object id was passed
if(isString(arg)||isNumber(arg)){String(arg);if(this.objects[arg])obj=this.objects[arg];}// an object was passed
else if(this.objects[arg[identifier]]){obj=this.objects[arg[identifier]];}return obj;}/**
	 * Adds an object to the collection.
	 * Replaces any existing object with the same identifier.
	 * @param {object} obj - the object to add
	 * @param {string} [id] - the id of the object
	 * @returns {*}
	 * @private
	 */},{key:'_add',value:function _add(obj,id){var self=this;var identifier=this.settings.identifier;// if an id is passed, add it to
// the object as the identifier property
if(isDefined(id)){String(id);obj[identifier]=id;this.objects[id]=obj;postAdd();}// if no id is passed, check that it has
// an identifier property already
else if(!isNullOrUndefined(obj[identifier])){this.objects[obj[identifier]]=obj;postAdd();}// otherwise, it cannot be managed
else{console.warn('Manager._add: cannot add an object with no identifier');}return obj;/**
		 * After a successful add, trigger
		 * the event and increase the counter
		 */function postAdd(){self.requiresNewSerialize=true;self.trigger('add',obj);self.count++;obj._count=self.count;}}/**
	 * Replaces or adds an object
	 * @param {object} obj - the object to update
	 * @param {string} [id] - the id of the object
	 * @returns {*}
	 * @private
	 */},{key:'_update',value:function _update(obj,id){var self=this;var identifier=this.settings.identifier;if(isDefined(id)){String(id);this.objects[id]=obj;postUpdate();}else if(!isNullOrUndefined(obj[identifier])){this.objects[obj[identifier]]=obj;postUpdate();}else{console.warn('Manager._update: cannot update an object with no identifier');}return obj;/**
		 * After a successful update, trigger
		 * the event and reset the serialize flag
		 */function postUpdate(){self.requiresNewSerialize=true;self.trigger('update',obj);self.count++;obj._count=self.count;}}/**
	 * Deletes an object from the collection
	 * @param {...(number|object|string)} arguments - the object or the id of the object
	 * @returns {Manager}
	 * @private
	 */},{key:'_delete',value:function _delete(){var arg=arguments[0];var obj=null;var identifier=this.settings.identifier;obj=this._get.apply(this,arguments);if(obj){var id=obj[identifier];this.trigger('delete',id);delete this.objects[id];this.requiresNewSerialize=true;if(this.count>0)this.count--;}else{console.error('Manager._delete: cannot delete an object with no identifier');}return this;}/**
	 * Deletes all objects from the collection
	 * @returns {Manager}
	 * @private
	 */},{key:'_empty',value:function _empty(){// ..in likely case there are references
for(var i in this.objects){delete this.objects[i];}return this;}/**
	 * Cache data
	 * @param {*} data
	 * @returns {Manager}
	 * @private
	 */},{key:'_cacheData',value:function _cacheData(data){this._cachedData=deepCopy(data);return this;}/**
	 * Process all incoming data to manage
	 * @param {object} data
	 * @returns {Manager}
	 * @private
	 */},{key:'_processData',value:function _processData(data){this._processedData=deepCopy(data);return this;}/**
	 * Get the ids of all objects
	 * @returns {string[]}
	 */},{key:'getIds',value:function getIds(){var ids=[];for(var i in this.objects){var id=this.getId(this.objects[i]);ids.push(id);}return ids;}/**
	 * Get the id of an object
	 * @param {object} obj
	 * @returns {string|undefined}
	 */},{key:'getId',value:function getId(obj){return obj[this.settings.identifier].toString();}/**
	 * Given a collection of objects in an array, 
	 * or in an object, add and update them 
	 * in the manager's own collection.
	 * Then delete any objects still in the manager's
	 * collection that are not in the data
	 * @param {object|object[]} data
	 * @returns {Manager}
	 */},{key:'manage',value:function manage(data){this._cacheData(data);this._processData(data);if(!isObject(this._processedData)&&this.settings.useObjectNames)throw new Error("Manager.manage: to use option useObjectNames, object passed to manage() must be an object.");var self=this;var id=this.settings.identifier;// maintain an array of ids found in data
// then xreference this to see which objects
// no longer exist (data is the master here)
var dataIds=[];// add or update objects
for(var i in this._processedData){var e=this._processedData[i];if(this.settings.useObjectNames)e[id]=i;// ids must be defined within objects
// there is no other way to know if an
// object is new or old
if(!isDefined(e[id]))return console.error("Manager.manage: cannot manage objects with no ids");// objectIds will always be strings
var objId=e[id].toString();var obj=self.objects[objId];if(isDefined(obj))self._update(e);else self._add(e);dataIds.push(objId);}// diff the array of object ids
// with the array of data ids
var objectIds=this.getIds();var diff=Array.diff(objectIds,dataIds);// delete any objects that are
// no longer found in data
for(i=0;i<diff.length;i++){this._delete(diff[i]);}return this;}/**
	 * Public method to see if an object exists
	 * @returns {boolean}
	 */},{key:'exists',value:function exists(){return this._exists.apply(this,arguments);}/**
	 * Add many objects to the collection
	 * @param {...object} arguments - one or more objects
	 * @returns {Manager}
	 */},{key:'addObjects',value:function addObjects(){var data=arguments.length>1?[].slice.call(arguments).sort():arguments[0];for(var i in data){var e=data[i];this.addObject(e);}return this;}/**
	 * Public method to add an object
	 * @returns {*}
	 */},{key:'addObject',value:function addObject(){return this._add.apply(this,arguments);}/**
	 * Public method to get an object
	 * @returns {*}
	 */},{key:'getObject',value:function getObject(){return this._get.apply(this,arguments);}/**
	 * Public method to update an object
	 * @returns {*}
	 */},{key:'updateObject',value:function updateObject(){return this._update.apply(this,arguments);}/**
	 * Public method to delete an object
	 * @returns {*}
	 */},{key:'deleteObject',value:function deleteObject(){return this._delete.apply(this,arguments);}/**
	 * Public method to delete all objects
	 * @returns {*}
	 */},{key:'deleteObjects',value:function deleteObjects(){return this._empty();}/**
	 * Serialize all objects that have a serializer method
	 * @param {number} [index=0] - index to start at
	 * @param {number} [max=0] - max amount to return
	 * @returns {object[]}
	 */},{key:'serializer',value:function serializer(){var index=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var max=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;if(this.requiresNewSerialize){var self=this;this.serializedObjects=[];$.each(this.objects,function(i,e){if(e.serializer)self.serializedObjects.push(e.serializer());});this.requiresNewSerialize=false;}max=max>0?max:this.serializedObjects.length;return this.serializedObjects.slice(index,max);}}]);return Manager;}(EventSystem);/*!
 * template
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * A re-useable DOM generator that can
 * create new jQuery objects using the
 * 'new' keyword. All jQuery functions
 * are applied to this object's $wrapper property
 */var Template=function(){/**
	 * Constructor
	 * @param {object} [options]
	 * @param {jQuery} [options.template=null] - if passed, this
	 * jquery object will be deconstructed into a template
	 * @param {boolean} [options.consumeTemplate=false] - whether to remove the
	 * template from the dom, if it exists there
	 * @param {boolean} [options.useTemplate=false] - whether to use the template
	 * itself as this object, bound to $wrapper
	 * @param {object} [options.struct]
	 * @param {object} [options.struct.$wrapper] - any css class that indicates
	 * what the $wrapper element should be for the template
	 * @returns {Template}
	 */function Template(options){_classCallCheck(this,Template);var defaults={template:null,consumeTemplate:false,useTemplate:false,// jquery elements for components
struct:{$wrapper:''}};this.settings=$Util.opts(defaults,options);this._template();return this;}/**
	 * Uses the provided template to create
	 * the DOM structure, or if no template
	 * was passed, calls _useDefaultTemplate
	 * @returns {Template}
	 * @private
	 */_createClass(Template,[{key:'_template',value:function _template(){if(this.settings.template)this._useTemplate();else this._useDefaultTemplate();this.$wrapper.removeClass('template');// attach all jquery functions to Template
$Util.jQuerify(this);return this;}/**
	 * Deconstructs the template into object
	 * properties based on this.settings.struct
	 * @param {jQuery|string} [$template=null] - a string or jquery object to use as the template.
	 * If null, will use what is set in this.settings.template
	 * @returns {Template}
	 * @private
	 */},{key:'_useTemplate',value:function _useTemplate(){var $template=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;$template=$template||this.settings.template;// conver string to jquery
if(isString($template)){$template=$($template);}else if($template instanceof $){// remove the templates id attr
if(!this.settings.useTemplate)$template=$template.clone().removeAttr('id');// remove the template from the DOM
if(this.settings.consumeTemplate)$template.remove();}else if($template instanceof $===false){throw new ReferenceError("Template._useTemplate: first argument must be a string or jquery");}// search for the HTML components
// then add them to this object
// eg this.$image
var self=this;for(var i in this.settings.struct){var struct=this.settings.struct[i];self[i]=$template.find(struct);}this.$wrapper=$($template.get(0));return this;}/**
	 * Optionally provide a default
	 * way to construct the DOM object
	 * @returns {Template}
	 * @private
	 */},{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){return this;}}]);return Template;}();/*!
 * templateManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Manage DOM elements/Templates and appends
 * them to the $wrapper property.
 * Provides a function to swap the
 * active DOM element with another
 * @extends Manager
 */var TemplateManager=function(_Manager){_inherits(TemplateManager,_Manager);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {jQuery|string|Template} [options.template=null] - the template object to create
	 * when the manager creates new objects
	 * @param {object} [options.$wrapper=$('<div class="manager"></div>')] - the
	 * TemplateManager's $wrapper property, where all managed Templates are appended
	 * @returns {TemplateManager}
	 */function TemplateManager(){var _ret2;var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,TemplateManager);var _this2=_possibleConstructorReturn(this,(TemplateManager.__proto__||Object.getPrototypeOf(TemplateManager)).call(this,options));_this2.$wrapper=options.$wrapper?options.$wrapper:$('<div class="manager"></div>');$Util.jQuerify(_this2);_this2.template=isString(options.template)?$(options.template):options.template;// alias
_this2.templates=_this2.objects;// current active template if applicable
_this2.current=null;return _ret2=_this2,_possibleConstructorReturn(_this2,_ret2);}/**
	 * Add an object to the collection
	 * and append it to the $wrapper.
	 * Accepts a Template object or jQuery
	 * @returns {jQuery|Template}
	 * @private
	 */_createClass(TemplateManager,[{key:'_add',value:function _add(){var obj=_get2(TemplateManager.prototype.__proto__||Object.getPrototypeOf(TemplateManager.prototype),'_add',this).apply(this,arguments);// arguments[0].$wrapper for Template objects
// arguments[0] for native jQuery objects
this.$wrapper.append(arguments[0].$wrapper||arguments[0]);return obj;}/**
	 * Update a template by simply re-populating it
	 * @param {object} data - template data
	 * @returns {TemplateManager}
	 * @private
	 */},{key:'_update',value:function _update(data){var id=this.getId(data);var $template=this.templates[id];this._populateTemplate($template,data);this.trigger('update',$template);return this;}/**
	 * Deletes an object from the collection
	 * and removes it from the dom.
	 * Accepts a Template object or jQuery
	 * @returns {TemplateManager}
	 * @private
	 */},{key:'_delete',value:function _delete(){var template=this._get.apply(this,arguments);if(template){template.remove();_get2(TemplateManager.prototype.__proto__||Object.getPrototypeOf(TemplateManager.prototype),'_delete',this).call(this,template);}else{console.error("TemplateManager._delete: could not find template object");}return this;}/**
	 * Create a template object that this manager manages
	 * @param {string} id - id of the object to create and then manage
	 * @param {object} [data={}] - data to populate a jquery template with or construct a Template with
	 * @returns {*|null|Template}
	 * @private
	 */},{key:'_create',value:function _create(id){var data=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};if(!this.template)throw new ReferenceError("TemplateManager._create: no template option was passed to constructor");// create a new template if it is a Template class
// or clone it if it is a jquery object
var template;if(this.template.prototype instanceof Template)template=new this.template(data);else if(isJquery(this.template))template=this.template.clone();this._populateTemplate(template,data);return this._add(template,id);}/**
	 * Deletes all objects from the collection
	 * @returns {Manager}
	 * @private
	 */},{key:'_empty',value:function _empty(){for(var i in this.objects){this.objects[i].remove();delete this.objects[i];}return this;}/**
	 * Populate the template
	 * @param {jQuery|Template} template
	 * @param {*} data
	 * @returns {TemplateManager}
	 * @private
	 */},{key:'_populateTemplate',value:function _populateTemplate(template,data){template.populateChildren(data);return this;}/**
	 * Redirect manage to build
	 * @param {object|object[]} data
	 * @returns {TemplateManager}
	 */},{key:'manage',value:function manage(data){return this.build(data);}/**
	 * Given a set of data, create or update existing Templates
	 * @param {object} data - a collection of objects
	 * that have keys whos names are identical with [data-name]
	 * or [name] attribute values within the template's elements,
	 * so $.fn.populate may appropriately populate html or inputs
	 * todo: this is literally a clone of manage with a _create call
	 * @returns {TemplateManager}
	 */},{key:'build',value:function build(data){this._cacheData(data);this._processData(data);if(!isObject(this._processedData)&&this.settings.useObjectNames)throw new Error("TemplateManager.build: to use option useObjectNames, object passed to build() must be an object.");var self=this;var id=this.settings.identifier;// maintain an array of ids found in data
// then xreference this to see which objects
// no longer exist (data is the master here)
var dataIds=[];// add or update objects
for(var i in this._processedData){var e=this._processedData[i];if(this.settings.useObjectNames)e[id]=i;// ids must be defined within objects
// there is no other way to know if an
// object is new or old otherwise
if(!isDefined(e[id]))return console.error("TemplateManager.build: cannot manage objects with no ids");// objectIds will always be strings
var objId=e[id].toString();var obj=self.objects[objId];if(isDefined(obj))self._update(e);else self._create(objId,e);dataIds.push(objId);}// diff the array of object ids
// with the array of data ids
var objectIds=this.getIds();var diff=Array.diff(objectIds,dataIds);// delete any objects that are
// no longer found in data
for(i=0;i<diff.length;i++){this._delete(diff[i]);}return this;}/**
	 * If managing hidden objects - where
	 * only one should be shown at a time -
	 * hides the current object dom and shows
	 * the requested one
	 * @param {string} name - name of the object in the collection
	 * @returns {TemplateManager}
	 */},{key:'setCurrent',value:function setCurrent(name){var self=this;var t=this.templates[name];if(isDefined(t)){if(!isNull(this.current)){this.current.slideUp(function(){show();self.current=t;});}else{show();this.current=t;}}else console.error("TemplateManager.setCurrent: object not found.");return this;/**
		 * Slidedown the object
		 */function show(){t.slideDown();}}/**
	 * Public method to create a template
	 * @returns {*}
	 */},{key:'createTemplate',value:function createTemplate(){return this._create.apply(this,arguments);}/**
	 * Add many templates to the collection
	 * @param {...object} arguments - one or more objects
	 * @returns {TemplateManager}
	 */},{key:'addTemplates',value:function addTemplates(){return _get2(TemplateManager.prototype.__proto__||Object.getPrototypeOf(TemplateManager.prototype),'addObjects',this).apply(this,arguments);}/**
	 * Public method to add a template
	 * @returns {*}
	 */},{key:'addTemplate',value:function addTemplate(){return this._add.apply(this,arguments);}/**
	 * Public method to get a template
	 * @returns {*}
	 */},{key:'getTemplate',value:function getTemplate(){return this._get.apply(this,arguments);}/**
	 * Public method to update a template
	 * @returns {*}
	 */},{key:'updateTemplate',value:function updateTemplate(){return this._update.apply(this,arguments);}/**
	 * Public method to delete a template
	 * @returns {*}
	 */},{key:'deleteTemplate',value:function deleteTemplate(){return this._delete.apply(this,arguments);}/**
	 * Public method to delete all templates
	 * @returns {*}
	 */},{key:'deleteTemplates',value:function deleteTemplates(){return this._empty();}}]);return TemplateManager;}(Manager);/*!
 * feedback
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Feedback template
 * @extends Template
 */var Feedback=function(_Template){_inherits(Feedback,_Template);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$wrapper='.feedback']
	 * @param {string} [options.struct.$text='.feedback-text']
	 * @param {string} [options.struct.$icon='.feedback-icon']
	 * @param {string} [options.struct.$close='button[name="close"]']
	 * @returns {Feedback}
	 */function Feedback(options){var _ret3;_classCallCheck(this,Feedback);var defaults={closeButton:true,struct:{$wrapper:'.feedback',$text:'.feedback-text',$icon:'.feedback-icon',$close:'button[name="close"]'}};var _this3=_possibleConstructorReturn(this,(Feedback.__proto__||Object.getPrototypeOf(Feedback)).call(this,$Util.opts(defaults,options)));var self=_this3;if(_this3.settings.closeButton){_this3.$close.click(function(){self.slideUp();});}return _ret3=_this3,_possibleConstructorReturn(_this3,_ret3);}/**
	 * Default feedback template
	 * @returns {Feedback}
	 * @private
	 */_createClass(Feedback,[{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){var template='<div class="feedback">'+'<span class="feedback-icon"></span>'+'<span class="feedback-text"></span>';if(this.settings.closeButton){template+='<button name="close" type="button">X</button>';}template+='</div>';this._useTemplate($(template));this.$wrapper.hide();return this;}/**
	 * Set the class of the feedback.
	 * Automatically removes other "feedback-" classes
	 * and prepends "feedback-" to the new class
	 * @param {string} cls - the feedback- class to set
	 * @returns {Feedback}
	 */},{key:'_setClass',value:function _setClass(cls){this.removeClass(function(index,css){return(css.match(/(^|\s)feedback-\S+/g)||[]).join(' ');});if('feedback-'.indexOf(cls)===-1)cls='feedback-'+cls;this.addClass(cls);return this;}/**
	 * Set the feedback with animation
	 * @param {string} cls - wrapper class to set
	 * @param {jQuery|string} text - text to show
	 * @param {jQuery|string} [icon] - icon to show
	 * @returns {Feedback}
	 */},{key:'_animateFeedback',value:function _animateFeedback(cls,text,icon){this._setClass(cls);this.$text.fadeOut(function(){$(this).html(text).fadeIn();});if(icon){this.$icon.fadeOut(function(){$(this).html(icon).fadeIn();});}return this;}/**
	 * Set the feedback and show the wrapper if
	 * it is hidden, or animate it if it is changing
	 * @param {string} cls - wrapper class to set
	 * @param {jQuery|string} text - text to show
	 * @param {jQuery|string} [icon] - icon to show
	 * @returns {Feedback}
	 */},{key:'setFeedback',value:function setFeedback(cls,text,icon){if(this.is(':hidden')){this._setClass(cls);this.$text.html(text);if(icon){this.$icon.html(icon);}this.slideDown();}else{this._animateFeedback(cls,text,icon);}return this;}}]);return Feedback;}(Template);/*!
 * crudRow
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * CRUD row with read/update/delete buttons.
 * A virtual class to extend from.
 * @extends Template
 */var CrudRow=function(_Template2){_inherits(CrudRow,_Template2);/**
	 * Constructor
	 * @returns {CrudRow}
	 */function CrudRow(options){var _ret4;_classCallCheck(this,CrudRow);var defaults={struct:{$deleteButton:'[name="deleteButton"]',$updateButton:'[name="updateButton"]',$viewButton:'[name="viewButton"]'}};// properties
var _this4=_possibleConstructorReturn(this,(CrudRow.__proto__||Object.getPrototypeOf(CrudRow)).call(this,$Util.opts(defaults,options)));_this4._cachedData={};_this4._processedData={};return _ret4=_this4,_possibleConstructorReturn(_this4,_ret4);}// data
/**
	 * Cache data
	 * @param {object} data
	 * @returns {CrudRow}
	 * @private
	 */_createClass(CrudRow,[{key:'_cacheData',value:function _cacheData(data){this._cachedData=$.extend(true,{},data);return this;}/**
	 * Process data
	 * @param {object} data
	 * @returns {CrudRow}
	 * @private
	 */},{key:'_processData',value:function _processData(data){this._processedData=$.extend(true,{},data);return this;}/**
	 * Populate children override.
	 * Cache and process data first.
	 * @param {object} data
	 * @returns {CrudRow}
	 */},{key:'populateChildren',value:function populateChildren(data){this._cacheData(data);this._processData(data);this.$wrapper.populateChildren(this._processedData);return this;}// delete
/**
	 * Attach delete button handlers
	 * @returns {CrudRow}
	 * @private
	 */},{key:'_attachDeleteButtonHandlers',value:function _attachDeleteButtonHandlers(){var self=this;this.$deleteButton.click(function(){self._deleteButtonAction();});return this;}/**
	 * Action that occurs when delete button is clicked
	 * @private
	 */},{key:'_deleteButtonAction',value:function _deleteButtonAction(){throw new Error("CrudRow._deleteButtonAction: must be implemented in child class");}// update
/**
	 * Attach update button handlers
	 * @virtual
	 * @private
	 */},{key:'_attachUpdateButtonHandlers',value:function _attachUpdateButtonHandlers(){var self=this;this.$updateButton.click(function(){self._updateButtonAction();});return this;}/**
	 * Action that occurs when update button is clicked
	 * @private
	 */},{key:'_updateButtonAction',value:function _updateButtonAction(){throw new Error("CrudRow._updateButtonAction: must be implemented in child class");}// view
/**
	 * Attach view button handlers
	 * @virtual
	 * @private
	 */},{key:'_attachViewButtonHandlers',value:function _attachViewButtonHandlers(){var self=this;this.$viewButton.click(function(){self._viewButtonAction();});return this;}/**
	 * Action that occurs when view button is clicked
	 * @private
	 */},{key:'_viewButtonAction',value:function _viewButtonAction(){throw new Error("CrudRow._viewButtonAction: must be implemented in child class");}/**
	 * Initialize the row
	 * @returns {CrudRow}
	 */},{key:'initialize',value:function initialize(){this._attachDeleteButtonHandlers()._attachUpdateButtonHandlers()._attachViewButtonHandlers();return this;}}]);return CrudRow;}(Template);/*!
 * table
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Templates and creates tables
 * @extends Template
 */var Table=function(_Template3){_inherits(Table,_Template3);/**
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
	 */function Table(options){var _ret5;_classCallCheck(this,Table);var defaults={struct:{$wrapper:'table',$thead:'thead',$tbody:'tbody',$tfoot:'tfoot',$tr:'tbody > tr'},rowHeaders:[]};// properties
var _this5=_possibleConstructorReturn(this,(Table.__proto__||Object.getPrototypeOf(Table)).call(this,$Util.opts(defaults,options)));_this5.$rows=[];_this5._cachedData={};_this5._processedData={};// states
_this5.isFirstBuild=true;// provide a default empty msg
_this5.$empty=$('<tr class="table-empty"><td>There is no data to display.</td></tr>');return _ret5=_this5,_possibleConstructorReturn(_this5,_ret5);}/**
	 * Use the provided template and remove
	 * the remplate row from the <tbody>
	 * @param {jQuery|string} [$template=null] - a string or jquery object to use as the template.
	 * If null, will use what is set in this.settings.template
	 * @returns {Table}
	 * @private
	 */_createClass(Table,[{key:'_useTemplate',value:function _useTemplate(){var $template=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;_get2(Table.prototype.__proto__||Object.getPrototypeOf(Table.prototype),'_useTemplate',this).call(this,$template);// remove template row from the DOM
this.$tr.remove();return this;}/**
	 * Build a default table structure
	 * @returns {Table}
	 * @private
	 */},{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){var template='<table class="table">'+'<thead></thead>'+'<tbody>'+'<tr></tr>'+'</tbody>'+'<tfoot></tfoot>'+'</table>';this._useTemplate($(template));// todo: this is a patch for render 
this.settings.template=null;// setup row headers
var rh=this.settings.rowHeaders;var $theadRow=$('<tr></tr>');for(var i=0;i<rh.length;i++){var header=rh[i]||'';var $header='<th>'+header+'</th>';var $col='<td></td>';this.$tr.append($col);$theadRow.append($header);}this.$thead.append($theadRow);return this;}// data
/**
	 * Cache originally fed data
	 * @param {object} data
	 * @returns {Table}
	 * @private
	 */},{key:'_cacheData',value:function _cacheData(data){if(isArray(data))this._cachedData=data;else this._cachedData=$.extend(true,{},data);return this;}/**
	 * Optionally process data
	 * @param {number[]|object|object[]|string[]} data
	 * @returns {Table}
	 * @private
	 */},{key:'_processData',value:function _processData(data){var self=this;if(isArray(data))this._processedData=data;else this._processedData=$.extend(true,{},data);$.each(data,function(i,e){// add a private _id for objects
if(isObject(e)){self._processedData[i]._id=i;}self._processedData[i]=self._processRow(e);});return this;}/**
	 * Optionally process row
	 * @param {*} data
	 * @returns {*}
	 * @private
	 */},{key:'_processRow',value:function _processRow(data){return data;}// render
/**
	 * Reneder/build the table rows from supplied data.
	 * This will empty the <tbody> element
	 * @param {object} data
	 * @returns {Table}
	 * @private
	 */},{key:'_render',value:function _render(data){var self=this;var useTemplate=!isNull(this.settings.template);var dataIsArray=Array.isArray(data);// empty the <tbody>
this.wipe();if(!$.isEmptyObject(data)||dataIsArray&&data.length)this.toggleEmpty(false);else return this;// run through data and create rows
Util.each(data,function(i,e){var $row=createRow();// if data is an object and a template is used
if(useTemplate&&!Array.isArray(e))$row.populateChildren(e);// if data is an array
else populateRow($row,e);addRow($row);});return this;// rows
/**
		 * Create a new row
		 * @returns {jQuery}
		 */function createRow(){return self.$tr.clone();}/**
		 * Add the row to the <tobdy>
		 * @param {jQuery} $row
		 */function addRow($row){$row.appendTo(self.$tbody);self.$rows.push($row);}/**
		 * Populate a row with data
		 * The <td> elements will be populated
		 * @param {jQuery} $row - row to populate
		 * @param {object[]} data - array of data
		 */function populateRow($row,data){var dataArr=[];Util.each(data,function(i,e){dataArr.push(e);});var $tds=$row.find('td');$.each($tds,function(i,e){$(e).html(dataArr[i]);});}}/**
	 * Check if the table is empty based
	 * on the number of trs in the tbody.
	 * This may be useful if rows were
	 * delete from the DOM and not data
	 * @returns {boolean}
	 * @private
	 */},{key:'_isEmptyTable',value:function _isEmptyTable(){return this.$tbody.find('tr').length===0;}/**
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
	 */},{key:'build',value:function build(data){this._cacheData(data);this._processData(data);this.toggleEmpty(false);this._render(this._processedData);this.isFirstBuild=false;return this;}/**
	 * Empty the <tbody> and the cached data
	 * @returns {Table}
	 */},{key:'wipe',value:function wipe(){this.$tbody.empty();this.toggleEmpty(true);this.$rows=[];this._cachedData={};return this;}/**
	 * Delete a row based on
	 * its index in this.$tr
	 * @param {number} index
	 * @returns {Table}
	 */},{key:'deleteRow',value:function deleteRow(index){if(this.$rows[index]){this.$rows[index].remove();this.$rows.splice(index,1);}// check if all rows were deleted
if(this._isEmptyTable()){this.toggleEmpty();}return this;}/**
	 * Toggle the empty table message
	 * and hide the thead and tfoot
	 * @param {boolean} [state=true]
	 * @returns {Table}
	 */},{key:'toggleEmpty',value:function toggleEmpty(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;this.$thead.toggle(!state);this.$tfoot.toggle(!state);if(state){this.$tbody.append(this.$empty);this.$empty.show();}else{this.$empty.remove();}return this;}}]);return Table;}(Template);/*!
 * renderTable
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Updates tables without redrawing them
 * @extends Table
 */var RenderTable=function(_Table){_inherits(RenderTable,_Table);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {string} [options.identifier='id'] - required for TemplateManager
	 * @param {boolean} [options.useObjectNames=false] - required for TemplateManager
	 * @returns {RenderTable}
	 */function RenderTable(options){var _ret6;_classCallCheck(this,RenderTable);var defaults={// to manage objects, they must have
// a unique id before they get to Manager.
// this is their id property name
identifier:'id',// OR instead of using an identifier,
// use the name of the object.
// this only works when passing
// objects of objects to manage()
useObjectNames:false,// instead of using a jquery object
// such as a tr, use a Template class
rowTemplate:null};// components
// row manager to re-build rows instead
// of wiping the <tbody> each time
var _this6=_possibleConstructorReturn(this,(RenderTable.__proto__||Object.getPrototypeOf(RenderTable)).call(this,$Util.opts(defaults,options)));_this6.rowManager=new TemplateManager({identifier:_this6.settings.identifier,useObjectNames:_this6.settings.useObjectNames,template:_this6.settings.rowTemplate||_this6.$tr,$wrapper:_this6.$tbody});_this6.$wrapper.addClass('renderTable');return _ret6=_this6,_possibleConstructorReturn(_this6,_ret6);}/**
	 * Render via TemplateManager.manage.
	 * Cannot use an array of non-object data
	 * @param {object|object[]} data
	 * @returns {RenderTable}
	 * @private
	 */_createClass(RenderTable,[{key:'_render',value:function _render(data){var dataIsArray=Array.isArray(data);if($.isEmptyObject(data)||!data||dataIsArray&&!data.length)this.toggleEmpty(true);else if(dataIsArray&&!isObject(data[0]))throw new ReferenceError("RenderTable._render: data must be an object, or an array of objects");this.rowManager.build(data);return this;}/**
	 * Empty the tbody and clear cached data
	 * @returns {RenderTable}
	 */},{key:'wipe',value:function wipe(){_get2(RenderTable.prototype.__proto__||Object.getPrototypeOf(RenderTable.prototype),'wipe',this).call(this);this.rowManager.deleteObjects();return this;}/**
	 * Delete a row based on its identifier
	 * in the TemplateManager collection of rows
	 * or simply pass the row data object itself
	 * @returns {RenderTable}
	 */},{key:'deleteRow',value:function deleteRow(){var _rowManager;(_rowManager=this.rowManager).deleteObject.apply(_rowManager,arguments);// check if all rows were deleted
if(this._isEmptyTable()){this.toggleEmpty();}return this;}}]);return RenderTable;}(Table);/*!
 * controlTable
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * A table that has view/update/delete support.
 * Buttons are added to the incoming data objects
 * as if they were part of the data.
 * @extends RenderTable
 * @deprecated Use RenderTable
 */var ControlTable=function(_RenderTable){_inherits(ControlTable,_RenderTable);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.buttons]
	 * @param {boolean} [options.buttons.deleteButton=true]
	 * @param {boolean} [options.buttons.updateButton=true]
	 * @param {boolean} [options.buttons.viewButton=true]
	 * @returns {ControlTable}
	 */function ControlTable(options){var _ret7;_classCallCheck(this,ControlTable);var defaults={buttons:{deleteButton:true,viewButton:true,updateButton:true}};var _this7=_possibleConstructorReturn(this,(ControlTable.__proto__||Object.getPrototypeOf(ControlTable)).call(this,$Util.opts(defaults,options)));_this7._setupButtons();_this7.$wrapper.addClass('controlTable');return _ret7=_this7,_possibleConstructorReturn(_this7,_ret7);}// buttons
/**
	 * Add headers and tds for
	 * each button that is enabled
	 * @private
	 */_createClass(ControlTable,[{key:'_setupButtons',value:function _setupButtons(){var self=this;$.each(this.settings.buttons,function(i,e){if(e&&!findTd(i)){addHeader();addTd(i);}});/**
		 * Determine if an element has already been
		 * created in the template for this button
		 * @param {string} i - button name
		 */function findTd(i){var $btnName=self.$tr.find('[data-name="'+i+'"]');var $btnDataName=self.$tr.find('[name="'+i+'"]');return $btnName.length||$btnDataName.length;}/**
		 * Add a blank header
		 */function addHeader(){self.$thead.find('tr').append('<th></th>');}/**
		 * Add a td for a button
		 * @param {string} dataName - the data-name attr
		 */function addTd(dataName){self.$tr.append('<td data-name="'+dataName+'"></td>');}}/**
	 * Add each enabled button
	 * @param {object} data - row data
	 * @returns {object}
	 * @private
	 */},{key:'_processRow',value:function _processRow(data){if(this.settings.buttons.deleteButton)this._addDeleteButton(data);if(this.settings.buttons.updateButton)this._addUpdateButton(data);if(this.settings.buttons.viewButton)this._addViewButton(data);return data;}// delete button
/**
	 * Add a delete button
	 * @param {object} data - row data
	 * @returns {ControlTable}
	 * @private
	 */},{key:'_addDeleteButton',value:function _addDeleteButton(data){data.deleteButton=this._createDeleteButton(data);return this;}/**
	 * Create a delete button
	 * @param {object} data - row data
	 * @returns {jQuery}
	 * @private
	 */},{key:'_createDeleteButton',value:function _createDeleteButton(data){var self=this;var $btn=$('<button type="button" title="Delete">Delete</button>');$btn.click(function(){self.deleteRow(data);});return $btn;}// update button
/**
	 * Add an update button
	 * @param {object} data - row data
	 * @returns {ControlTable}
	 * @private
	 */},{key:'_addUpdateButton',value:function _addUpdateButton(data){data.updateButton=this._createUpdateButton(data);return this;}/**
	 * Create an update button
	 * @param {object} data - row data
	 * @returns {jQuery}
	 * @private
	 */},{key:'_createUpdateButton',value:function _createUpdateButton(data){return $('<button type="button" title="Update">Update</button>');}// view button
/**
	 * Add a view button
	 * @param {object} data - row data
	 * @returns {ControlTable}
	 * @private
	 */},{key:'_addViewButton',value:function _addViewButton(data){data.viewButton=this._createViewButton(data);return this;}/**
	 * Create a view button
	 * @param {object} data - row data
	 * @returns {jQuery}
	 * @private
	 */},{key:'_createViewButton',value:function _createViewButton(data){return $('<button type="button" title="View">View</button>');}}]);return ControlTable;}(RenderTable);/*!
 * form
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Templates, serializes, and submits forms
 * @extends Template
 */var Form=function(_Template4){_inherits(Form,_Template4);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {boolean} [options.feedback=true] - whether to show feedback during submissions
	 * @param {string} [options.submitUrl] - the submitUrl or path to submit the form to
	 * @param {function} [options.submitRequest=null] - if set, ignores submitUrl and uses this function to submit data
	 * @param {number} [options.serializeMode=0] - the mode in which to serialize data
	 * @param {number} [options.checkboxMode=0] - the mode in which to serialize checkboxes
	 * @param {object} [options.validator] - validator setttings
	 * @param {string} [options.validator.api] - the validator api to use
	 * @param {object} [options.validator.options] - the validator options
	 * @param {object} [options.struct] - the template struct to build the form from, if using a template
	 * @param {string} [options.struct.$wrapper='form'] - the form element
	 * @param {string} [options.struct.$header='.form-header'] - the header selector
	 * @param {string} [options.struct.$body='.form-body'] - the body selector
	 * @param {string} [options.struct.$footer='.form-footer'] - the footer selector
	 * @param {string} [options.struct.$cancel='.form-cancel'] - the cancel button selector
	 * @param {string} [options.struct.$reset='.form-reset'] - the reset button selector
	 * @param {string} [options.struct.$submit='button[type="submit"]'] - the submit button selector
	 * @returns {Form}
	 */function Form(options){var _ret8;_classCallCheck(this,Form);var defaults={feedback:true,useTemplate:true,submitUrl:"",submitRequest:null,serializeMode:FormSerializer.serializeMode.toString,checkboxMode:FormSerializer.checkboxMode.number,// css classes for each form component
struct:{$wrapper:'form',$feedback:'.form-feedback',$header:'.form-header',$body:'.form-body',$footer:'.form-footer',$cancel:'.form-cancel',$reset:'.form-reset',$submit:'button[type="submit"]'},validator:null};var _this8=_possibleConstructorReturn(this,(Form.__proto__||Object.getPrototypeOf(Form)).call(this,$Util.opts(defaults,options)));var self=_this8;// store serialized data
_this8._serializedData={};// cache raw incoming data
_this8._cachedData={};// processed form data
_this8._processedData={};// alias
// this exists solely for Wizard !!
var $form=_this8.$wrapper.find('form');_this8.$form=$form.length>0?$form:_this8.$wrapper;// components
_this8.formSerializer=new FormSerializer({serializeMode:_this8.settings.serializeMode,checkboxMode:_this8.settings.checkboxMode});_this8.validator=null;_this8.feedback=null;// handlers
// default submit handler
_this8.$form.on('submit',function(e){e.preventDefault();self.serializeForm()._submit();});// cancel
_this8.$cancel.click(function(){self.resetForm();});// reset
_this8.$reset.click(function(){self.resetForm();});// set up validator
if(_this8.settings.validator)_this8._setupValidator();// set up feedback
if(_this8.settings.feedback)_this8._setupFeedback();return _ret8=_this8,_possibleConstructorReturn(_this8,_ret8);}// setup
/**
	 * Default form template
	 * @returns {Form}
	 * @private
	 */_createClass(Form,[{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){var template='<form class="form">'+'<div class="form-feedback"></div>'+'<div class="form-header"></div>'+'<div class="form-body"></div>'+'<div class="form-footer">'+'<button type="submit" class="form-submit">Submit</button>'+'<button type="button" class="form-reset">Reset</button>'+'<button type="button" class="form-cancel">Cancel</button>'+'</div>'+'</form>';this._useTemplate($(template));return this;}/**
	 * Attaches a validator to the form
	 * @returns {Form}
	 * @private
	 */},{key:'_setupValidator',value:function _setupValidator(){var v=this.settings.validator;switch(v.api){case'formValidation':Form.validators.formValidation.setup(this,this.$form,v.options);break;}return this;}/**
	 * Setup the feedback
	 * @returns {Form}
	 * @private
	 */},{key:'_setupFeedback',value:function _setupFeedback(){this.feedback=new Feedback();if(!this.$feedback.length){this.$feedback=$('<div class="form-feedback"></div>');this.$form.prepend(this.$feedback);}this.$feedback.html(this.feedback.$wrapper);return this;}/**
	 * Prepare the form with a loading message
	 * @returns {Form}
	 * @private
	 */},{key:'_prepare',value:function _prepare(){this.toggleForm(false);this.feedback.show();this.feedback.setFeedback('processing','Getting data...');return this;}// ready
/**
	 * Set the form to ready by hiding
	 * feedback and showing the form components
	 * @returns {Form}
	 * @private
	 */},{key:'_ready',value:function _ready(){this.feedback.slideUp();this.slideToggleForm(true);return this;}// submit
/**
	 * Submits the form
	 * @returns {jQuery}
	 * @private
	 */},{key:'_submit',value:function _submit(){var self=this;this.trigger('beforeSubmit');if(this.feedback)this.feedback.setFeedback('processing','Processing...');return this._doSubmit().done(function(data){self._done(data);}).fail(function(err){self._fail(err);}).always(function(){self._always();});}/**
	 * Actual submit function
	 * @returns {jQuery}
	 * @private
	 */},{key:'_doSubmit',value:function _doSubmit(){var s=this.settings;if(s.submitRequest)return s.submitRequest(this._serializedData);else return $.post(s.submitUrl,this._serializedData);}// submit handlers
/**
	 * Form submission success handler
	 * @param {object} data
	 * @returns {Form}
	 * @private
	 */},{key:'_done',value:function _done(data){if(this.feedback)this.feedback.setFeedback('success',' Operation was successful');this.trigger('done',data);return this;}/**
	 * Form submission fail handler
	 * @param {object} err
	 * @returns {Form}
	 * @private
	 */},{key:'_fail',value:function _fail(err){if(this.feedback)this.feedback.setFeedback('danger','Operation has failed');this.trigger('fail',err);return this;}/**
	 * Form submission always handler
	 * @returns {Form}
	 * @private
	 */},{key:'_always',value:function _always(){this.toggleButtons(true);this.trigger('always');return this;}// data
/**
	 * Get form data from the backend
	 * @returns {jQuery}
	 * @private
	 */},{key:'_getFormData',value:function _getFormData(){return $.Deferred().resolve().promise();}/**
	 * Cache incoming form data
	 * @param {object} data
	 * @returns {Form}
	 * @private
	 */},{key:'_cacheFormData',value:function _cacheFormData(data){this._cachedData=$.extend(true,{},data);return this;}/**
	 * Process incoming form data
	 * @param {object} data
	 * @returns {Form}
	 * @private
	 */},{key:'_processData',value:function _processData(data){this._processedData=$.extend(true,{},data);return this;}// public
/**
	 * Toggle the button states
	 * @param {boolean} state
	 * @returns {Form}
	 */},{key:'toggleButtons',value:function toggleButtons(state){this.$cancel.prop('disabled',!state);this.$reset.prop('disabled',!state);this.$submit.prop('disabled',!state).toggleClass('disabled',!state);return this;}/**
	 * Lock the submit button for some amount of ms
	 * @param {number} ms - time to lock in milliseconds
	 */},{key:'lockSubmit',value:function lockSubmit(ms){var self=this;var html=this.$submit.html();this.$submit.prop('disabled',true);setTimeout(function(){self.$submit.prop('disabled',false);self.$submit.html(html);},ms);var c=0;var timer=setInterval(setButtonHtml,1000);setButtonHtml();/**
		 * Set the button html to the time left on the lock
		 */function setButtonHtml(){if(c>=ms){clearInterval(timer);}else{var time=Math.floor((ms-c)/1000);// don't show 0
time=time||1;var _html=html+" | "+time;self.$submit.html(_html);c+=1000;}}}/**
	 * Toggle the form body
	 * @param {boolean} state
	 * @returns {Form}
	 */},{key:'toggleForm',value:function toggleForm(state){this.$body.toggle(state);this.$footer.toggle(state);return this;}/**
	 * Slide toggle the form body
	 * @param {boolean} state
	 * @returns {Form}
	 */},{key:'slideToggleForm',value:function slideToggleForm(state){this.$body.slideToggleState(state);this.$footer.slideToggleState(state);return this;}/**
	 * Populate form fields
	 * @param {object} data - collection of properties whos
	 * key match an input or select name, and
	 * whos value is appropriate for that field
	 * @returns {Form}
	 */},{key:'populateForm',value:function populateForm(data){this._cacheFormData(data);this._processData(data);this.$form.populateChildren(data);return this;}/**
	 * Public function to serialize the form,
	 * as jQuery uses serialize already
	 * @returns {Form}
	 */},{key:'serializeForm',value:function serializeForm(){this._serializedData=this.formSerializer.serialize(this.$form);return this;}/**
	 * Reset the form, using populated data
	 * or setting to default values
	 * @returns {Form}
	 */},{key:'resetForm',value:function resetForm(){if(!$.isEmptyObject(this._cachedData))this.populateForm(this._cachedData);else this.$form[0].reset();if(this.feedback)this.feedback.slideUp();// todo: implement for alternative validators
if(this.validator){switch(this.settings.validator.api){case'formValidation':this.validator.resetForm();break;}}return this;}/**
	 * Validate the form
	 * @returns {boolean}
	 */},{key:'validate',value:function validate(){var isValid=false;if(this.validator){// todo: implement for alternative validators
switch(this.settings.validator.api){case'formValidation':this.validator.resetForm();this.validator.validateContainer(this.$form);isValid=this.validator.isValidContainer(this.$form);break;}}return isValid;}// initializers
/**
	 * Remove all data from the form and reset it
	 * @returns {Form}
	 */},{key:'clean',value:function clean(){this._cachedData={};this.resetForm();this.toggleForm(true);return this;}/**
	 * Initialize as a clean form with
	 * default values from the DOM
	 * @returns {Form}
	 */},{key:'initialize',value:function initialize(){this.clean();return this;}}]);return Form;}(Template);Form.validators={/**
	 * formValidation api
	 */formValidation:{api:'formValidation',options:{framework:'bootstrap',excluded:[':disabled',':hidden',':not(:visible)'],icon:{valid:'glyphicon glyphicon-ok',invalid:'glyphicon glyphicon-remove',validating:'glyphicon glyphicon-refresh'}},/**
		 * formValidation setup
		 * @param {Form} form
		 * @param {jQuery} $form
		 * @param {object} options
		 */setup:function setup(form,$form,options){$form.off('submit');// allows re-creation of the Form
if($form.data('formValidation'))$form.data('formValidation').destroy();$form.formValidation(options).on('success.form.fv',function(e){e.preventDefault();form.toggleButtons(false);form.serializeForm()._submit();});form.validator=$form.data('formValidation');}}};/*!
 * formSerializer
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Serializes a form
 */var FormSerializer=function(){/**
	 * Construtor
	 * @param {object} [options]
	 * @param {number} [options.checkboxMode=0] - the mode in which to serialize checkboxes
	 * @param {number} [options.mode=0] - the mode in which to serialize data
	 * mode in which to serialize checkboxes
	 * @returns {FormSerializer}
	 */function FormSerializer(options){_classCallCheck(this,FormSerializer);var defaults={checkboxMode:FormSerializer.checkboxMode.number,serializeMode:FormSerializer.serializeMode.toString};this.settings=$Util.opts(defaults,options);return this;}/**
	 * Get either the [name]
	 * or [data-name] attr of an element
	 * @param {jQuery} $el
	 * @returns {string}
	 * @private
	 */_createClass(FormSerializer,[{key:'_getElName',value:function _getElName($el){if(typeof $el.attr('name')!=="undefined")return $el.attr('name');if(typeof $el.data('name')!=="undefined")return $el.data('name');console.error("FormSerializer._getElName: field has no name or data-name attribute");return'';}/**
	 * Convert a checkbox
	 * @param {jQuery} $checkbox
	 * @param {number} mode
	 * @returns {boolean|number|string}
	 * @private
	 */},{key:'_convertCheckbox',value:function _convertCheckbox($checkbox,mode){var checked=$checkbox.is(':checked');switch(mode){case FormSerializer.checkboxMode.boolean:return checked;break;case FormSerializer.checkboxMode.number:return checked?1:0;break;case FormSerializer.checkboxMode.string:return checked?'1':'0';break;case FormSerializer.checkboxMode.onOff:return checked?'on':'off';break;}}/**
	 * Serialize a form
	 * @param {jQuery} $form
	 * @returns {object|string}
	 */},{key:'serialize',value:function serialize($form){var self=this;var formData=new FormSerializerData();var data={};$form.find('input, select').each(function(i,e){var $el=$(e);var name="";var order=-1;var type="";var tag="";var val="";if($el.data('serialize')===false)return true;// get the tag (input or select)
tag=$el[0].nodeName.toLowerCase();// find the name
name=self._getElName($el);if(typeof name==='undefined')return true;// see if it needs to be serialized in some order
if(typeof $el.data('order')!=="undefined")order=$el.data('order');// handle <input>s
if(tag==='input'){type=$el.attr('type');if(typeof type==='undefined')return console.error("FormSerializer.serialize: input"+name+" must have a type");switch(type){case'checkbox':val=self._convertCheckbox($el,self.settings.checkboxMode);break;case'radio':if($el.is(':checked'))val=$el.val();else return true;break;case'file':var files=$el.get(0).files;if(files.length===0){return true;}val=files[0];break;default:val=$el.val();break;}}// handle <select>s
else if(tag==='select'){val=$el.val();}else{console.error('FormSerializer.serialize: only inputs and selects can be serialized');}data[name]={val:val,order:order};});formData.set(data);switch(this.settings.serializeMode){default:case FormSerializer.serializeMode.toString:return formData.toString();break;case FormSerializer.serializeMode.toOrderedString:return formData.toOrderedString();break;case FormSerializer.serializeMode.toObject:return formData.toObject();break;case FormSerializer.serializeMode.toValue:return formData.toValue();break;}}}]);return FormSerializer;}();/**
 * Mode in which to convert checkboxes
 */FormSerializer.checkboxMode={boolean:0,number:1,string:2,onOff:3};/**
 * Mode in which to serialize data
 */FormSerializer.serializeMode={toString:0,toOrderedString:1,toObject:2,toValue:3};/*!
 * formSerializerData
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * An object that holds form data
 * and can output it in different ways
 */var FormSerializerData=function(){/**
	 * Constructor
	 * @param {object} [data={}]
	 * @returns {FormSerializerData}
	 */function FormSerializerData(data){_classCallCheck(this,FormSerializerData);this.data=data||{};return this;}/**
	 * Set the data
	 * @param {object} data
	 * @returns {FormSerializerData}
	 */_createClass(FormSerializerData,[{key:'set',value:function set(data){this.data=data;return this;}/**
	 * Convert the data to a serialized string
	 * @returns {string}
	 */},{key:'toString',value:function toString(){var data="";var c=0;var len=Object.keys(this.data).length;Util.each(this.data,function(i,e){data+=i+"="+e.val;if(c++<len-1)data+="&";});return data;}/**
	 * Convert the data to an
	 * ordered serialized string
	 * @returns {string}
	 */},{key:'toOrderedString',value:function toOrderedString(){var data="";var ordered=[];var unordered=[];Util.each(this.data,function(i,e){var obj={name:i,val:e.val};if(e.order>-1)ordered[e.order]=obj;else unordered.push(obj);});var len=ordered.length;for(var i=0;i<len;i++){data+=ordered[i].name+'='+ordered[i].val;if(i<len)data+="&";}len=unordered.length;for(i=0;i<len;i++){data+=unordered[i].name+'='+unordered[i].val;if(i<len-1)data+="&";}return data;}/**
	 * Convert the data to an object
	 * @returns {object}
	 */},{key:'toObject',value:function toObject(){var data={};Util.each(this.data,function(i,e){// convert string numbers to real numbers
data[i]=e.val!==""&&!isNaN(e.val)?parseInt(e.val):data[i]=e.val;});return data;}/**
	 * Convert the data into a single value.
	 * This is only useful if the form only has one input.
	 * @returns {*}
	 */},{key:'toValue',value:function toValue(){var data=null;// data will be the last iterated object value
// using this function though, the form is
// expected to only have one input anyway
Util.each(this.data,function(i,e){// convert string numbers to real numbers
data=isNaN(e.val)?e.val:parseInt(e.val);});return data;}}]);return FormSerializerData;}();/*!
 * wizard
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Templates, serializes, submits,
 * and controls a form wizard
 * @extends Form
 */var Wizard=function(_Form){_inherits(Wizard,_Form);/**
	 * Constructor
	 * @param  {object} [options]
	 * @param  {object} [options.struct]
	 * @param  {string} [options.struct.$wrapper='.wizard'] - wizard wrapper
	 * @param  {string} [options.struct.$nav='ul.nav'] - navigation list
	 * @param  {string} [options.struct.$navs='ul.nav > li'] - navigation links
	 * @param  {string} [options.struct.$tabs='.tab-pane'] - tab container
	 * @param  {string} [options.struct.$next='li.next'] - next button
	 * @param  {string} [options.struct.$pager='ul.pager'] - pager container
	 * @param  {string} [options.struct.$previous='li.previous'] - previous button
	 * @returns {Wizard}
	 */function Wizard(options){var _ret9;_classCallCheck(this,Wizard);var defaults={struct:{$wrapper:'.wizard',$nav:'ul.nav',$navs:'ul.nav > li',$tabs:'.tab-pane',$next:'li.next',$pager:'ul.pager',$previous:'li.previous'}};var _this9=_possibleConstructorReturn(this,(Wizard.__proto__||Object.getPrototypeOf(Wizard)).call(this,$Util.opts(defaults,options)));_this9.stepCount=_this9.$tabs.length;_this9.step=0;// show or hide pagination and form buttons
_this9.toggleSubmitButton(_this9.stepCount===1);_this9.togglePreviousButton(false);_this9.toggleNextButton(_this9.stepCount>1);_this9._setHandlers();return _ret9=_this9,_possibleConstructorReturn(_this9,_ret9);}/**
	 * Clear all handlers. Useful if
	 * the wizard DOM is being re-used.
	 * @private
	 */_createClass(Wizard,[{key:'_clearHandlers',value:function _clearHandlers(){this.$next.off('click.wizard');this.$previous.off('click.wizard');this.$submit.off('click.wizard');this.$navs.each(function(i,e){$(e).off('click.wizard');});}/**
	 * Set pagination and form button handlers
	 * @returns {Wizard}
	 * @private
	 */},{key:'_setHandlers',value:function _setHandlers(){var self=this;this._clearHandlers();// next
this.$next.on('click.wizard',function(){self._getNextNav().find('a').click();//self.validatePreviousTab();
});// prev
this.$previous.on('click.wizard',function(){self.validateTab(self._getTab(self.step));self._getPreviousNav().find('a').click();});// submit
this.$submit.on('click.wizard',function(){self.validateAllTabs();});// navs
this.$navs.each(function(i,e){$(e).on('click.wizard',function(){self._setPagination(i);var x=i;// nav clicked is ahead
if(i>self.step){for(x=x-1;x>=0;x--){self.validateTab(self._getTab(x));}}// nav clicked is behind
else if(i<self.step){for(x;x<self.step+1;x++){self.validateTab(self._getTab(x));}}self.step=i;// reset nav status when going to a tab
self._toggleNavInvalid($(this),false);});});return this;}/**
	 * Create an empty wizard
	 * @returns {Wizard}
	 * @private
	 */},{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){_get2(Wizard.prototype.__proto__||Object.getPrototypeOf(Wizard.prototype),'_useDefaultTemplate',this).call(this);// to avoid duplicate $wrapper's (Wizard inherits Form)
// set this.$form to Form's $wrapper
this.$form=this.$wrapper;// components
this.$wrapper=$('<div class="wizard"></div>');this.$nav=$('<ul class="nav"></ul>');this.$tabs=$('<div class="tab-pane"></div>');this.$pager=$('<ul class="pager"></ul>');this.$next=$('<li class="next"><a href="#">Next</a></li>');this.$previous=$('<li class="previous"><a href="#">Previous</a></li>');// build
this.$pager.append(this.$previous,this.$next,this.$submit);this.$footer.append(this.$pager);this.$form.append(this.$tabs,this.$footer);this.$wrapper.append(this.$nav,this.$form);return this;}/**
	 * Attaches a validator to the form
	 * @returns {Form}
	 * @private
	 */},{key:'_setupValidator',value:function _setupValidator(){var v=this.settings.validator;switch(v.api){case'formValidation':// clone to not affect Form refs
var options=$.extend(true,{},v.options);// must validate hidden tabs
options.excluded=[':disabled'];Wizard.validators.formValidation.setup(this,this.$form,options);break;}return this;}/**
	 * Setup the feedback
	 * @returns {Form}
	 * @private
	 */},{key:'_setupFeedback',value:function _setupFeedback(){this.feedback=new Feedback();if(!this.$feedback.length){this.$feedback=$('<div class="form-feedback"></div>');this.$wrapper.prepend(this.$feedback);}this.$feedback.html(this.feedback.$wrapper);return this;}// control
/**
	 * Show or hide pagination 
	 * buttons according to step
	 * @param {number} step - the step 
	 * @private
	 */},{key:'_setPagination',value:function _setPagination(step){// simply hide everything first
this.togglePreviousButton(false);this.toggleNextButton(false);this.toggleSubmitButton(false);switch(step){// first step
case 0:this.togglePreviousButton(false);if(this.stepCount===1)this.toggleSubmitButton();else if(this.stepCount>1)this.toggleNextButton();break;// last step
case this.stepCount-1:this.toggleSubmitButton();if(this.stepCount>1)this.togglePreviousButton();break;// inbetween steps
default:if(this.stepCount>1){this.toggleNextButton();this.togglePreviousButton();}break;}}// navs
/**
	 * Get a nav element by index
	 * @param {number} index
	 * @returns {jQuery}
	 * @private
	 */},{key:'_getNav',value:function _getNav(index){return $(this.$navs.get(index));}/**
	 * Get a nav from a tab element
	 * @param {jQuery} $tab
	 * @returns {jQuery}
	 * @private
	 */},{key:'_getNavFromTab',value:function _getNavFromTab($tab){var index=this.$tabs.index($tab);return this._getNav(index);}/**
	 * Get the previous nav
	 * @returns {jQuery}
	 * @private
	 */},{key:'_getPreviousNav',value:function _getPreviousNav(){return $(this.$navs.get(this.step-1));}/**
	 * Get the current nav
	 * @returns {jQuery}
	 * @private
	 */},{key:'_getCurrentNav',value:function _getCurrentNav(){return $(this.$navs.get(this.step));}/**
	 * Get the next nav
	 * @returns {jQuery}
	 * @private
	 */},{key:'_getNextNav',value:function _getNextNav(){return $(this.$navs.get(this.step+1));}/**
	 * Toggle a nav as invalid
	 * @param {jQuery} $nav
	 * @param {boolean} state
	 * @returns {Wizard}
	 * @private
	 */},{key:'_toggleNavInvalid',value:function _toggleNavInvalid($nav){var state=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;$nav.toggleClass('wizard-tab invalid',state);return this;}// tabs
/**
	 * Get a tab based on index
	 * @param {number} index
	 * @returns {jQuery}
	 * @private
	 */},{key:'_getTab',value:function _getTab(index){return $(this.$tabs.get(index));}/**
	 * Get the current tab
	 * @returns {jQuery}
	 * @private
	 */},{key:'_getCurrentTab',value:function _getCurrentTab(){return $(this.$tabs.get(this.step));}/**
	 * Get the next tab
	 * @returns {jQuery|null}
	 * @private
	 */},{key:'_getNextTab',value:function _getNextTab(){return this.step!==this.stepCount?$(this.$tabs.get(this.step+1)):null;}/**
	 * Get the previous tab
	 * @returns {jQuery|null}
	 * @private
	 */},{key:'_getPreviousTab',value:function _getPreviousTab(){return this.step>0?$(this.$tabs.get(this.step-1)):null;}// validation
/**
	 * Validate a tab
	 * @param {jQuery} $tab
	 * @returns {boolean}
	 */},{key:'validateTab',value:function validateTab($tab){var api=this.settings.validator.api;var valid=true;// todo: add support for other validators
switch(api){case'formValidation':this.validator.validateContainer($tab);valid=this.validator.isValidContainer($tab);break;}var $nav=this._getNavFromTab($tab);this._toggleNavInvalid($nav,!valid);return valid;}/**
	 * Validate the current tab
	 * @returns {boolean}
	 */},{key:'validateCurrentTab',value:function validateCurrentTab(){var $tab=this._getCurrentTab();return this.validateTab($tab);}/**
	 * Validate the previous tab
	 * @returns {boolean}
	 */},{key:'validatePreviousTab',value:function validatePreviousTab(){var $tab=this._getPreviousTab();return this.validateTab($tab);}/**
	 * Validate the next tab
	 * @returns {boolean}
	 */},{key:'validateNextTab',value:function validateNextTab(){var $tab=this._getNextTab();return this.validateTab($tab);}/**
	 * Validate all tabs
	 * @returns {boolean}
	 */},{key:'validateAllTabs',value:function validateAllTabs(){var self=this;var valid=true;$.each(this.$tabs,function(i,e){var $tab=$(e);self.validator.validateContainer($tab);var validTab=self.validator.isValidContainer($tab);self._toggleNavInvalid(self._getNav(i),!validTab);// set overal validity
// should be invalid if any tab is invalid
if(!validTab){valid=false;}});return valid;}// buttons
/**
	 * Toggle the next button
	 * @param {boolean} state
	 * @returns {Wizard}
	 */},{key:'toggleNextButton',value:function toggleNextButton(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;this.$next.toggle(state);return this;}/**
	 * Toggle the previous button
	 * @param {boolean} state
	 * @returns {Wizard}
	 */},{key:'togglePreviousButton',value:function togglePreviousButton(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;this.$previous.toggle(state);return this;}/**
	 * Toggle the submit button
	 * @param {boolean} state
	 * @returns {Wizard}
	 */},{key:'toggleSubmitButton',value:function toggleSubmitButton(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;this.$submit.toggle(state);return this;}/**
	 * Toggle wizard components
	 * @param {boolean} state
	 * @returns {Wizard}
	 */},{key:'toggleForm',value:function toggleForm(state){_get2(Wizard.prototype.__proto__||Object.getPrototypeOf(Wizard.prototype),'toggleForm',this).call(this,state);this.$nav.toggle(state);return this;}/**
	 * Toggle wizard components
	 * @param {boolean} state
	 * @returns {Wizard}
	 */},{key:'slideToggleForm',value:function slideToggleForm(state){_get2(Wizard.prototype.__proto__||Object.getPrototypeOf(Wizard.prototype),'slideToggleForm',this).call(this,state);this.$nav.slideToggleState(state);return this;}// resets
/**
	 * Reset nav validation
	 * @returns {Wizard}
	 */},{key:'resetNavValidation',value:function resetNavValidation(){for(var i=0;i<this.$navs.length;i++){var $nav=$(this.$navs[i]);this._toggleNavInvalid($nav,false);}return this;}/**
	 * Reset the form
	 * @returns {Wizard}
	 */},{key:'resetForm',value:function resetForm(){var $nav=$(this.$navs[0]);$nav.find('a').click();this.resetNavValidation();_get2(Wizard.prototype.__proto__||Object.getPrototypeOf(Wizard.prototype),'resetForm',this).call(this);return this;}}]);return Wizard;}(Form);/*!
 * bootstrap
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */(function($){/**
	 * Turns an input group's addon into a
	 * button that reveals a help dialog.
	 * Place '<div class="input-help"></div>'
	 * AFTER a '<div class="input-group"></div>'
	 */$.fn.inputHelp=function(){return this.each(function(){var $this=$(this);var $group=$this.prev('.input-group');$group.find('.input-group-addon-help').click(function(){$this.slideToggle();});});};/**
	 * Makes tabs responsive in responsive mode
	 * http://jsbin.com/befiqofemu
	 */$.fn.responsiveTabs=function(){return this.each(function(){var $this=$(this);$this.addClass('responsive-tabs');$this.append($('<span class="glyphicon glyphicon-triangle-bottom"></span>'));$this.append($('<span class="glyphicon glyphicon-triangle-top"></span>'));$this.on('click','li.active > a, span.glyphicon',function(){this.toggleClass('open');}.bind($this));$this.on('click','li:not(.active) > a',function(){this.removeClass('open');}.bind($this));});};})(jQuery);/*!
 * bootstrapControlTable
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Control table with bootstrap buttons
 * @extends ControlTable
 * @deprecated Use RenderTable
 */var BootstrapControlTable=function(_ControlTable){_inherits(BootstrapControlTable,_ControlTable);/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {BootstrapControlTable}
	 */function BootstrapControlTable(options){var _ret10;_classCallCheck(this,BootstrapControlTable);var _this10=_possibleConstructorReturn(this,(BootstrapControlTable.__proto__||Object.getPrototypeOf(BootstrapControlTable)).call(this,options));return _ret10=_this10,_possibleConstructorReturn(_this10,_ret10);}/**
	 * Create a delete button
	 * @param {object} data
	 * @returns {jQuery}
	 * @private
	 */_createClass(BootstrapControlTable,[{key:'_createDeleteButton',value:function _createDeleteButton(data){var $btn=_get2(BootstrapControlTable.prototype.__proto__||Object.getPrototypeOf(BootstrapControlTable.prototype),'_createDeleteButton',this).call(this,data);$btn.addClass('btn btn-default');$btn.html('<span class="glyphicon glyphicon-trash"></span>');return $btn;}/**
	 * Create an update button
	 * @param {object} data
	 * @returns {jQuery}
	 * @private
	 */},{key:'_createUpdateButton',value:function _createUpdateButton(data){var $btn=_get2(BootstrapControlTable.prototype.__proto__||Object.getPrototypeOf(BootstrapControlTable.prototype),'_createUpdateButton',this).call(this,data);$btn.addClass('btn btn-default');$btn.html('<span class="glyphicon glyphicon-edit"></span>');return $btn;}/**
	 * Create a view button
	 * @param {object} data
	 * @returns {jQuery}
	 * @private
	 */},{key:'_createViewButton',value:function _createViewButton(data){var $btn=_get2(BootstrapControlTable.prototype.__proto__||Object.getPrototypeOf(BootstrapControlTable.prototype),'_createViewButton',this).call(this,data);$btn.addClass('btn btn-default');$btn.html('<span class="glyphicon glyphicon-info-sign"></span>');return $btn;}}]);return BootstrapControlTable;}(ControlTable);/*!
 * bootstrapFeedback
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Feedback template styled with bootstrap
 * @extends Feedback
 */var BootstrapFeedback=function(_Feedback){_inherits(BootstrapFeedback,_Feedback);/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {BootstrapFeedback}
	 */function BootstrapFeedback(options){var _ret11;_classCallCheck(this,BootstrapFeedback);var _this11=_possibleConstructorReturn(this,(BootstrapFeedback.__proto__||Object.getPrototypeOf(BootstrapFeedback)).call(this,options));var self=_this11;if(_this11.settings.closeButton){_this11.$close.click(function(){self.slideUp();});}return _ret11=_this11,_possibleConstructorReturn(_this11,_ret11);}/**
	 * Use the default template and
	 * add an alert class to the feedback
	 * @returns {BootstrapFeedback}
	 * @private
	 */_createClass(BootstrapFeedback,[{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){var template='';if(this.settings.closeButton){template='<div class="feedback alert clearfix">'+'<div class="col-sm-10">'+'<div class="feedback-icon"></div>'+'<div class="feedback-text"></div>'+'</div>'+'<div class="col-sm-2">'+'<button type="button" name="close" class="close">&times;</button>'+'</div>'+'</div>';}else{template='<div class="feedback alert clearfix">'+'<div class="col-sm-12">'+'<div class="feedback-icon"></div>'+'<div class="feedback-text"></div>'+'</div>'+'</div>';}this._useTemplate($(template));this.$wrapper.hide();return this;}/**
	 * Create a default icon based on feedback class
	 * @param {string} cls - the alert- bootstrap class to set
	 * @returns {string}
	 * @private
	 */},{key:'_createDefaultIcon',value:function _createDefaultIcon(cls){return'<span class="glyphicon '+BootstrapFeedback.icon[cls]+'"></span>';}/**
	 * Set the class using of the feedback
	 * Automatically removes other "alert-" classes
	 * and prepends "alert-" to the new class
	 * @param {string} cls - the alert- bootstrap class to set
	 * @returns {BootstrapFeedback}
	 */},{key:'_setClass',value:function _setClass(cls){this.removeClass(function(index,css){return(css.match(/(^|\s)alert-\S+/g)||[]).join(' ');});if('alert-'.indexOf(cls)===-1)cls='alert-'+cls;this.addClass(cls);return this;}/**
	 * Set the feedback icon
	 * @param {*} $icon
	 * @returns {BootstrapFeedback}
	 * @private
	 */},{key:'_setIcon',value:function _setIcon($icon){this.$icon.html($icon);return this;}/**
	 * Set the feedback elegantly
	 * @param {string} cls - wrapper class to set
	 * @param {jQuery|string} text - text to show
	 * @param {jQuery|string} [icon] - icon to show.
	 * If not passed, uses a default glyphicon
	 * @returns {Feedback}
	 */},{key:'_animateFeedback',value:function _animateFeedback(cls,text,icon){var $icon=icon?icon:this._createDefaultIcon(cls);this._setClass(cls);this.$text.fadeOut(function(){$(this).html(text).fadeIn();});this.$icon.fadeOut(function(){$(this).html($icon).fadeIn();});return this;}/**
	 * Set the feedback and show the wrapper if it is hidden
	 * @param {string} cls - wrapper class to set
	 * @param {jQuery|string} text - text to show
	 * @param {jQuery|string} [icon] - icon to show
	 * @returns {Feedback}
	 */},{key:'setFeedback',value:function setFeedback(cls,text,icon){if(this.is(':hidden')){var $icon=icon?icon:this._createDefaultIcon(cls);this._setClass(cls);this.$text.html(text);this.$icon.html($icon);this.slideDown();}else{this._animateFeedback(cls,text,icon);}return this;}}]);return BootstrapFeedback;}(Feedback);BootstrapFeedback.icon={danger:'glyphicon-remove-sign',success:'glyphicon-ok-sign',warning:'glyphicon-exclamation-sign',info:'glyphicon-info-sign',processing:'glyphicon-refresh glyphicon-refresh-spin'};/*!
 * bootstrapForm
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * A form with bootstrap feedback
 * @extends Form
 */var BootstrapForm=function(_Form2){_inherits(BootstrapForm,_Form2);/**
	 * Constructor
	 * @param {object} options
	 * @returns {BootstrapForm}
	 */function BootstrapForm(options){var _ret12;_classCallCheck(this,BootstrapForm);var _this12=_possibleConstructorReturn(this,(BootstrapForm.__proto__||Object.getPrototypeOf(BootstrapForm)).call(this,options));return _ret12=_this12,_possibleConstructorReturn(_this12,_ret12);}/**
	 * Setup the feedback
	 * @returns {Form}
	 * @private
	 */_createClass(BootstrapForm,[{key:'_setupFeedback',value:function _setupFeedback(){this.feedback=new BootstrapFeedback();if(!this.$feedback.length){this.$feedback=$('<div class="form-feedback"></div>');this.$form.prepend(this.$feedback);}this.$feedback.html(this.feedback.$wrapper);return this;}}]);return BootstrapForm;}(Form);/*!
 * bootstrapModal
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Template for a bootstrap modal
 * @extends Template
 */var BootstrapModal=function(_Template5){_inherits(BootstrapModal,_Template5);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$wrapper='.modal'] - the main modal selector
	 * @param {string} [options.struct.$dialog='.modal-dialog'] - the dialog selector
	 * @param {string} [options.struct.$content='.modal-content'] - the content selector
	 * @param {string} [options.struct.$header='.modal-header'] - the header selector
	 * @param {string} [options.struct.$title='.modal-title'] - the title selector
	 * @param {string} [options.struct.$body='.modal-body'] - the body selector
	 * @param {string} [options.struct.$footer='.modal-footer'] - the footer selector
	 * @param {string} [options.struct.$close='button.close'] - the close button selector
	 * @returns {BootstrapModal}
	 */function BootstrapModal(options){var _ret13;_classCallCheck(this,BootstrapModal);var defaults={struct:{$wrapper:'.modal',$dialog:'.modal-dialog',$content:'.modal-content',$header:'.modal-header',$title:'.modal-title',$body:'.modal-body',$footer:'.modal-footer',$close:'button.close'}};var _this13=_possibleConstructorReturn(this,(BootstrapModal.__proto__||Object.getPrototypeOf(BootstrapModal)).call(this,$Util.opts(defaults,options)));return _ret13=_this13,_possibleConstructorReturn(_this13,_ret13);}/**
	 * Create a default template
	 * @returns {BootstrapModal}
	 * @private
	 */_createClass(BootstrapModal,[{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){var template='<div class="modal fade">'+'<div class="modal-dialog" role="document">'+'<div class="modal-content">'+'<div class="modal-header">'+'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+'<span aria-hidden="true">&times;</span>'+'</button>'+'<h4 class="modal-title"></h4>'+'</div>'+'<div class="modal-body"></div>'+'<div class="modal-footer"></div>'+'</div>'+'</div>'+'</div>';this._useTemplate($(template));$('body').append(this.$wrapper);return this;}}]);return BootstrapModal;}(Template);/*!
 * bootstrapModal
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Combines a form and a bootstrap modal
 * @extends BootstrapModal
 */var BootstrapModalForm=function(_BootstrapModal){_inherits(BootstrapModalForm,_BootstrapModal);/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {BootstrapModalForm}
	 */function BootstrapModalForm(options){var _ret14;_classCallCheck(this,BootstrapModalForm);// properties
var _this14=_possibleConstructorReturn(this,(BootstrapModalForm.__proto__||Object.getPrototypeOf(BootstrapModalForm)).call(this,options));_this14.form=null;return _ret14=_this14,_possibleConstructorReturn(_this14,_ret14);}/**
	 * Create and initialize the form
	 * @private
	 */_createClass(BootstrapModalForm,[{key:'_createForm',value:function _createForm(){throw new Error("BootstrapModalForm._createForm: must be implemented in child class");}/**
	 * Attach handlers to the form
	 * @returns {BootstrapModalForm}
	 * @private
	 */},{key:'_attachFormHandlers',value:function _attachFormHandlers(){var self=this;this.form.on('beforeSubmit',function(){self.form.slideToggleForm(false);}).on('done',function(){setTimeout(function(){self.modal('hide');},1500);}).on('fail',function(){if(self.form.feedback){self.form.feedback.setFeedback('danger','Failed to submit data');}self.form.slideToggleForm(true);});return this;}/**
	 * A function to call after the form is created
	 * @returns {BootstrapModalForm}
	 * @private
	 */},{key:'_onCreateForm',value:function _onCreateForm(){this._attachFormHandlers().modal('show');return this;}/**
	 * Initialize
	 * @returns {*}
	 */},{key:'initialize',value:function initialize(){return this._createForm();}}]);return BootstrapModalForm;}(BootstrapModal);/*!
 * bootstrapNav
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Templates a bootstrap nav
 * @extends Template
 */var BootstrapNav=function(_Template6){_inherits(BootstrapNav,_Template6);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$wrapper=".tab-pane"]
	 * @param {string} [options.struct.$link="a"]
	 * @returns {BootstrapNav}
	 */function BootstrapNav(options){var _ret15;_classCallCheck(this,BootstrapNav);var defaults={struct:{$wrapper:'li',$link:'a'}};var _this15=_possibleConstructorReturn(this,(BootstrapNav.__proto__||Object.getPrototypeOf(BootstrapNav)).call(this,$Util.opts(defaults,options)));return _ret15=_this15,_possibleConstructorReturn(_this15,_ret15);}/**
	 * Build default BootstrapNav
	 * @returns {BootstrapNav}
	 * @private
	 */_createClass(BootstrapNav,[{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){var template='<li class="nav-item">'+'<a class="nav-link" data-toggle="tab" href="#"></a>'+'</li>';this._useTemplate($(template));return this;}/**
	 * Populate the href and html
	 * @param {object} data
	 * @param {number|string} data.href
	 * @param {jQuery|string} [data.html]
	 * @returns {BootstrapNav}
	 */},{key:'populateChildren',value:function populateChildren(data){this.$link.attr('href','#'+data.href);if(data.html)this.$link.html(data.html);return this;}/**
	 * Set the tab to active by
	 * running click() event on it
	 * @returns {BootstrapNav}
	 */},{key:'setActive',value:function setActive(){this.$link.click();return this;}}]);return BootstrapNav;}(Template);/*!
 * bootstrapNavManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Manages bootstrap navs
 * @extends TemplateManager
 */var BootstrapNavManager=function(_TemplateManager){_inherits(BootstrapNavManager,_TemplateManager);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.template=BootstrapNav]
	 * @param {jQuery} [options.$wrapper=$('<div class="nav nav-tabs"></div>')] - manager wrapper
	 * @returns {BootstrapNavManager}
	 */function BootstrapNavManager(options){var _ret16;_classCallCheck(this,BootstrapNavManager);var defaults={$wrapper:$('<ul class="nav nav-tabs"></ul>'),template:BootstrapNav};// alias
var _this16=_possibleConstructorReturn(this,(BootstrapNavManager.__proto__||Object.getPrototypeOf(BootstrapNavManager)).call(this,$Util.opts(defaults,options)));_this16.navs=_this16.objects;return _ret16=_this16,_possibleConstructorReturn(_this16,_ret16);}/**
	 * Create and add a new Nav
	 * @param {string} id - id of the object to create and then manage
	 * @param {object} data
	 * @param {object} data.href - href for the nav
	 * @param {object} [data.html] - html for the nav
	 * @returns {BootstrapNav}
	 * @private
	 */_createClass(BootstrapNavManager,[{key:'_create',value:function _create(id,data){if(!isDefined(data)||!isDefined(data.href))throw new ReferenceError("BootstrapNavManager.create: an 'href' property is required to create a Nav");else return _get2(BootstrapNavManager.prototype.__proto__||Object.getPrototypeOf(BootstrapNavManager.prototype),'_create',this).call(this,id,data);}/**
	 * Get the first nav
	 * @returns {jQuery}
	 */},{key:'getFirst',value:function getFirst(){return $(this.$wrapper.find('a').get(0));}}]);return BootstrapNavManager;}(TemplateManager);/*!
 * bootstrapPanel
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Template for bootstrap panels
 * @extends Template
 */var BootstrapPanel=function(_Template7){_inherits(BootstrapPanel,_Template7);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {boolean} [options.closeable=false] - whether to attach a close button to the panel
	 * @param {boolean} [options.collapsible=false] - whether to attach a collapse button to the panel
	 * @param {object} [options.struct] - panel structure for templates
	 * @param {string} [options.struct.$wrapper='.panel'] - the panel selector
	 * @param {string} [options.struct.$header='.panel-header'] - the panel header selector
	 * @param {string} [options.struct.$title='.panel-title'] - the panel title selector
	 * @param {string} [options.struct.$collapse='.panel-collapse'] - the panel collapse selector
	 * @param {string} [options.struct.$close='.panel-close'] - the panel close selector
	 * @param {string} [options.struct.$body='.panel-body'] - the panel body selector
	 * @param {string} [options.struct.$footer='.panel-footer'] - the panel footer selector
	 * @returns {BootstrapPanel}
	 */function BootstrapPanel(options){var _ret17;_classCallCheck(this,BootstrapPanel);var defaults={closeable:false,collapsible:false,struct:{$wrapper:'.panel',$header:'.panel-heading',$title:'.panel-title',$collapse:'.panel-collapse',$close:'.panel-close',$body:'.panel-body',$content:'.panel-content',$footer:'.panel-footer'}};var _this17=_possibleConstructorReturn(this,(BootstrapPanel.__proto__||Object.getPrototypeOf(BootstrapPanel)).call(this,$Util.opts(defaults,options)));var self=_this17;// properties
_this17.isCollapsed=false;_this17.isClosed=false;_this17._attachHandlers();return _ret17=_this17,_possibleConstructorReturn(_this17,_ret17);}/**
	 * Creates a default template
	 * @returns {BootstrapPanel}
	 * @private
	 */_createClass(BootstrapPanel,[{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){var template='<div class="panel panel-default">'+'<div class="panel-heading clearfix">'+'<h4 class="panel-title"></h4>'+'<a href="#" class="close panel-close" aria-label="close">&times;</a>'+'<a href="#" class="panel-collapse glyphicon glyphicon-chevron-up" aria-label="collapse"></a>'+'</div>'+'<div class="panel-content collapse in">'+'<div class="panel-body"></div>'+'</div>'+'<div class="panel-footer"></div>'+'</div>';this._useTemplate($(template));if(!this.settings.closeable)this.$close.remove();if(!this.settings.collapsible)this.$collapse.remove();return this;}/**
	 * Attach close and collapse handlers
	 * @returns {BootstrapPanel}
	 * @private
	 */},{key:'_attachHandlers',value:function _attachHandlers(){if(this.settings.closeable){this.$close.click(function(e){e.stopPropagation();self._onClose();self.trigger('close');});}if(this.settings.collapsible){this.$header.click(function(){self._collapse();self.trigger('collapse');});}return this;}/**
	 * Collapse the panel
	 * @returns {BootstrapPanel}
	 * @private
	 */},{key:'_collapse',value:function _collapse(){this.isCollapsed=!this.isCollapsed;this.$content.collapse("toggle");this.$collapse.toggleClass('glyphicon-chevron-up glyphicon-chevron-down');return this;}/**
	 * On close handler
	 * @returns {BootstrapPanel}
	 * @private
	 */},{key:'_onClose',value:function _onClose(){this.isClosed=!this.isClosed;this.slideUp();return this;}}]);return BootstrapPanel;}(Template);/*!
 * bootstrapPanelManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Manages panels
 * @extends TemplateManager
 */var BootstrapPanelManager=function(_TemplateManager2){_inherits(BootstrapPanelManager,_TemplateManager2);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.template=Panel]
	 * @param {jQuery} [options.$wrapper='$(<div class="panel-group"></div>}'] - manager wrapper
	 * @returns {BootstrapPanelManager}
	 */function BootstrapPanelManager(options){var _ret18;_classCallCheck(this,BootstrapPanelManager);var defaults={$wrapper:$('<div class="panel-group"></div>'),template:BootstrapPanel};// alias
var _this18=_possibleConstructorReturn(this,(BootstrapPanelManager.__proto__||Object.getPrototypeOf(BootstrapPanelManager)).call(this,$Util.opts(defaults,options)));_this18.panels=_this18.objects;return _ret18=_this18,_possibleConstructorReturn(_this18,_ret18);}return BootstrapPanelManager;}(TemplateManager);/*!
 * bootstrapCard
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Template for bootstrap cards
 * @extends BootstrapPanel
 */var BootstrapCard=function(_BootstrapPanel){_inherits(BootstrapCard,_BootstrapPanel);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {boolean} [options.closeable=false] - whether to attach a close button to the card
	 * @param {boolean} [options.collapsible=false] - whether to attach a collapse button to the card
	 * @param {object} [options.struct] - card structure for templates
	 * @param {string} [options.struct.$wrapper='.card'] - the card selector
	 * @param {string} [options.struct.$header='.card-header'] - the card header selector
	 * @param {string} [options.struct.$headerText='.card-header-text'] - the card header text selector
	 * @param {string} [options.struct.$close='.card-close'] - the card close selector
	 * @param {string} [options.struct.$collapse='.card-collapse'] - the card collapse selector
	 * @param {string} [options.struct.$content='.card-content'] - the card collapse selector
	 * @param {string} [options.struct.$block='.card-block'] - the card block selector
	 * @param {string} [options.struct.$title='.card-title'] - the card title selector
	 * @param {string} [options.struct.$text='.card-text'] - the card text selector
	 * @param {string} [options.struct.$footer='.card-footer'] - the card footer selector
	 * @returns {BootstrapCard}
	 */function BootstrapCard(options){var _ret19;_classCallCheck(this,BootstrapCard);var defaults={struct:{$wrapper:'.card',$header:'.card-header',$headerText:'.card-header-text',$close:'.card-close',$collapse:'.card-collapse',$content:'.card-content',$block:'.card-block',$title:'.card-title',$text:'.card-text',$footer:'.card-footer'}};var _this19=_possibleConstructorReturn(this,(BootstrapCard.__proto__||Object.getPrototypeOf(BootstrapCard)).call(this,$Util.opts(defaults,options)));return _ret19=_this19,_possibleConstructorReturn(_this19,_ret19);}/**
	 * Creates a default template
	 * @returns {BootstrapCard}
	 * @private
	 */_createClass(BootstrapCard,[{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){var template='<div class="card">'+'<h3 class="card-header clearfix">'+'<span class="card-header-text"></span>'+'<a href="#" class="close card-close" aria-label="close">&times;</a>'+'<a href="#" class="card-collapse" aria-label="collapse"></a>'+'</h3>'+'<div class="card-content collapse in">'+'<div class="card-block">'+'<h4 class="card-title"></h4>'+'<p class="card-text"></p>'+'</div>'+'</div>'+'<div class="card-footer"></div>'+'</div>';this._useTemplate($(template));if(!this.settings.closeable)this.$close.remove();if(!this.settings.collapsible)this.$collapse.remove();return this;}/**
	 * Collapse the card
	 * @returns {BootstrapCard}
	 * @private
	 */},{key:'_collapse',value:function _collapse(){this.isCollapsed=!this.isCollapsed;this.$content.collapse("toggle");//this.$collapse.toggleClass('glyphicon-chevron-up glyphicon-chevron-down');
return this;}}]);return BootstrapCard;}(BootstrapPanel);/*!
 * bootstrapCardManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Manages cards
 * @extends TemplateManager
 */var BootstrapCardManager=function(_TemplateManager3){_inherits(BootstrapCardManager,_TemplateManager3);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.template=card]
	 * @param {jQuery} [options.$wrapper='$(<div class="card-group"></div>}'] - manager wrapper
	 * @returns {BootstrapCardManager}
	 */function BootstrapCardManager(options){var _ret20;_classCallCheck(this,BootstrapCardManager);var defaults={$wrapper:$('<div class="card-group"></div>'),template:BootstrapCard};// alias
var _this20=_possibleConstructorReturn(this,(BootstrapCardManager.__proto__||Object.getPrototypeOf(BootstrapCardManager)).call(this,$Util.opts(defaults,options)));_this20.cards=_this20.objects;return _ret20=_this20,_possibleConstructorReturn(_this20,_ret20);}return BootstrapCardManager;}(TemplateManager);/*!
 * bootstrapProgress
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Template for bootstrap progress bar
 * @extends Template
 */var BootstrapProgress=function(_Template8){_inherits(BootstrapProgress,_Template8);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {boolean} [options.showPercent=true] - whether to show percent value
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$wrapper='.progress'] - the wrapper element
	 * @param {string} [options.struct.$progress='.progress'] - the bootstrap progress element
	 * @param {string} [options.struct.$bar='.progress-bar'] - the bootstrap progress bar
	 * @param {string} [options.struct.$percent='.progress-percent'] - the progress bar percent
	 * @returns {BootstrapProgress}
	 */function BootstrapProgress(options){var _ret21;_classCallCheck(this,BootstrapProgress);var defaults={struct:{$wrapper:'.progress-wrapper',$progress:'.progress',$bar:'.progress-bar',$percent:'.progress-percent'},showPercent:true};var _this21=_possibleConstructorReturn(this,(BootstrapProgress.__proto__||Object.getPrototypeOf(BootstrapProgress)).call(this,$Util.opts(defaults,options)));_this21.percent=0;return _ret21=_this21,_possibleConstructorReturn(_this21,_ret21);}/**
	 * Create a default template
	 * @returns {BootstrapProgress}
	 * @private
	 */_createClass(BootstrapProgress,[{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){var template='<div class="progress-wrapper">'+'<div class="progress">'+'<div class="progress-bar"></div>'+'<div class="progress-percent"></div>'+'</div>'+'</div>';this._useTemplate($(template));if(!this.settings.showPercent)this.$percent.remove();return this;}/**
	 * Set the percent text
	 * @param {number} percent
	 * @returns {BootstrapProgress}
	 * @private
	 */},{key:'_setPercent',value:function _setPercent(percent){this.percent=Math.floor(percent);this.$percent.html(percent+"%");this.$percent.toggleClass('progress-percent-white',percent>50);this._centerPercent();return this;}/**
	 * Center the percent text
	 * @returns {BootstrapProgress}
	 * @private
	 */},{key:'_centerPercent',value:function _centerPercent(){// 20 px is approx the text sie of "0%"
var w=this.$percent.width()||20;this.$percent.css('margin-left',w/2*-1+"px");return this;}/**
	 * Set the progress of the bar
	 * @param {number} percent
	 * @returns {BootstrapProgress}
	 */},{key:'setProgress',value:function setProgress(percent){percent=Math.floor(percent);this.$bar.css('width',percent+"%");this.$bar.toggleClass('progress-bar-success',percent===100);if(this.settings.showPercent)this._setPercent(percent);return this;}}]);return BootstrapProgress;}(Template);/*!
 * bootstrapLoader
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Page loader that has a set
 * of steps to move through
 * @extends BootstrapProgress
 */var BootstrapLoader=function(_BootstrapProgress){_inherits(BootstrapLoader,_BootstrapProgress);/**
	 * Constructor
	 * @param {object} options
	 * @param {object[]} options.steps - an array of steps. A step is a simple
	 * object with a 'text' and 'err' property that are simple strings
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$wrapper='.loader'] - the loader wrapper
	 * @param {string} [options.struct.$progressWrapper='.progress'] - the progress wrapper
	 * @param {string} [options.struct.$container='.loader-container'] - the progress bar container
	 * @param {string} [options.struct.$text='.loader-text'] - the loader text
	 * @returns {BootstrapLoader}
	 */function BootstrapLoader(options){var _ret22;_classCallCheck(this,BootstrapLoader);var defaults={struct:{$wrapper:'.loader',$container:'.loader-container',$text:'.loader-text'},steps:[]};// properties
var _this22=_possibleConstructorReturn(this,(BootstrapLoader.__proto__||Object.getPrototypeOf(BootstrapLoader)).call(this,$Util.opts(defaults,options)));_this22.stepCount=_this22.settings.steps.length;_this22.step=0;return _ret22=_this22,_possibleConstructorReturn(_this22,_ret22);}/**
	 * Create a default template
	 * @returns {BootstrapLoader}
	 * @private
	 */_createClass(BootstrapLoader,[{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){var template='<div class="loader" id="pageLoader">'+'<div class="loader-container">'+'<div class="loader-text"></div>'+'<div class="progress">'+'<div class="progress-bar"></div>'+'<div class="progress-percent"></div>'+'</div>'+'</div>'+'</div>';this._useTemplate($(template));return this;}/**
	 * Get a step object from
	 * its index in the steps array
	 * @param {number} id
	 * @returns {error|object}
	 * @private
	 */},{key:'_getStep',value:function _getStep(id){if(this.settings.steps.length>0&&this.settings.steps[id])return this.settings.steps[id];else throw new RangeError("BootstrapLoader.getStep: step not found in steps array");}/**
	 * Get the percent of the loader
	 * based on the step index
	 * @param {number} id
	 * @returns {number}
	 */},{key:'getPercent',value:function getPercent(id){return(id+1)/this.stepCount*100;}/**
	 * Set the progress of the loader
	 * @param {number} percent
	 * @returns {BootstrapLoader}
	 */},{key:'setProgress',value:function setProgress(percent){_get2(BootstrapLoader.prototype.__proto__||Object.getPrototypeOf(BootstrapLoader.prototype),'setProgress',this).call(this,percent);this.$text.toggleClass('success',percent===100);return this;}/**
	 * Set the text of the loader
	 * @param {string} text
	 * @returns {BootstrapLoader}
	 */},{key:'setText',value:function setText(text){this.$text.html(text);return this;}/**
	 * Move the loader to a step
	 * @param {number} id - step index
	 * @returns {BootstrapLoader}
	 */},{key:'setStep',value:function setStep(id){this.step=id;var step=this._getStep(id);var percent=this.getPercent(id);this.setText(step.text);this.setProgress(percent);return this;}/**
	 * Move the loader to an error
	 * Or set the current step to error state
	 * @param {number|string} [arguments] - optional arguments
	 * number - pass a step id to grab the error from
	 * string - pass a string error
	 * void - sets the error to the current step's error
	 * @returns {BootstrapLoader}
	 */},{key:'setErr',value:function setErr(){var arg=arguments?arguments[0]:null;var step;// arg is a step id
if(isNumber(arg)){step=this._getStep(arg);this.setText(step.err);}// arg is a string
if(isString(arg))this.setText(arg);// no arg
if(isNull(arg)){step=this._getStep(this.step);this.setText(step.err);}this.$text.addClass('err');this.$bar.addClass('progress-bar-danger');return this;}/**
	 * Move to the first step
	 * @returns {BootstrapLoader}
	 */},{key:'goStart',value:function goStart(){this.setStep(0);return this;}/**
	 * Move to the next step
	 * @returns {BootstrapLoader}
	 */},{key:'goNext',value:function goNext(){var id=this.step+1;this.setStep(id);return this;}/**
	 * Move to the previous step
	 * @returns {BootstrapLoader}
	 */},{key:'goPrev',value:function goPrev(){var id=this.step-1;if(id>0)this.setStep(id);return this;}/**
	 * Move to the last step
	 * @returns {BootstrapLoader}
	 */},{key:'goEnd',value:function goEnd(){var id=this.stepCount-1;this.setStep(id);return this;}}]);return BootstrapLoader;}(BootstrapProgress);/*!
 * bootstrapTab
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Templates a bootstrap tab
 * @extends Template
 */var BootstrapTab=function(_Template9){_inherits(BootstrapTab,_Template9);/**
	 * Constructor
	 * @param {object} [options]
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$wrapper=".tab-pane"] - the tab class
	 * @returns {BootstrapTab}
	 */function BootstrapTab(options){var _ret23;_classCallCheck(this,BootstrapTab);var defaults={struct:{$wrapper:'.tab-pane'}};var _this23=_possibleConstructorReturn(this,(BootstrapTab.__proto__||Object.getPrototypeOf(BootstrapTab)).call(this,$Util.opts(defaults,options)));return _ret23=_this23,_possibleConstructorReturn(_this23,_ret23);}/**
	 * Default template
	 * @returns {BootstrapTab}
	 * @private
	 */_createClass(BootstrapTab,[{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){this.$wrapper=$('<div class="tab-pane fade"></div>');return this;}/**
	 * Populate the id and html
	 * @param {object} data
	 * @param {number|string} data.id
	 * @param {jQuery|string} [data.html]
	 * @returns {BootstrapTab}
	 */},{key:'populateChildren',value:function populateChildren(data){this.attr('id',data.id);if(data.html)this.html(data.html);return this;}}]);return BootstrapTab;}(Template);/*!
 * bootstrapTabManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Manages bootstrap tabs
 * @extends TemplateManager
 */var BootstrapTabManager=function(_TemplateManager4){_inherits(BootstrapTabManager,_TemplateManager4);/**
	 * Constructor
	 * @param {object} options
	 * @param {object} [options.template=BootstrapTab]
	 * @param {jQuery} [options.$wrapper=$('<div class="tab-content"></div>')] - manager wrapper
	 * @returns {BootstrapTabManager}
	 */function BootstrapTabManager(options){var _ret24;_classCallCheck(this,BootstrapTabManager);var defaults={$wrapper:$('<div class="tab-content"></div>'),template:BootstrapTab};// alias
var _this24=_possibleConstructorReturn(this,(BootstrapTabManager.__proto__||Object.getPrototypeOf(BootstrapTabManager)).call(this,$Util.opts(defaults,options)));_this24.tabs=_this24.objects;return _ret24=_this24,_possibleConstructorReturn(_this24,_ret24);}/**
	 * Create and add a new Tab
	 * @param {string} id - id of the object to create and then manage
	 * @param {object} data
	 * @param {number|string} data.id
	 * @param {jQuery|string} [data.html]
	 * @returns {BootstrapNav}
	 * @private
	 */_createClass(BootstrapTabManager,[{key:'_create',value:function _create(id,data){if(!isDefined(data)||!isDefined(data.id))throw new ReferenceError("BootstrapTabManager.create: an 'id' property is required to create a Tab");else return _get2(BootstrapTabManager.prototype.__proto__||Object.getPrototypeOf(BootstrapTabManager.prototype),'_create',this).call(this,id,data);}/**
	 * Get the first tab in the wrapper
	 * @returns {jQuery}
	 */},{key:'getFirst',value:function getFirst(){return $(this.$wrapper.find('.tab-pane').get(0));}}]);return BootstrapTabManager;}(TemplateManager);/*!
 * bootstrapToggle
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * Templates a bootstrap toggle
 * @extends Template
 */var BootstrapToggle=function(_Template10){_inherits(BootstrapToggle,_Template10);/**
	 * Constructor.
	 * The input has to be put inside a container element
	 * for it to be able to move around after initialization
	 * @param {object} [options]
	 * @param {object} [options.struct]
	 * @param {string} [options.struct.$container=".toggle"] - an element to contain the toggle
	 * @param {string} [options.struct.$wrapper="$wrapper"] - the <input> element
	 * @param {object} [options.toggleOptions] - bootstrapToggle options
	 * @param {string} [options.name] - name of the <input>
	 * @returns {BootstrapToggle}
	 */function BootstrapToggle(options){var _ret25;_classCallCheck(this,BootstrapToggle);if(!isDefined($.fn.bootstrapToggle))throw new Error("BootstrapToggle.constructor: the bootstrap toggle file must be included before bootstrap.");var defaults={struct:{$container:'.toggle',$wrapper:'input'},toggleOptions:{},name:''};// redirect jquery dom events to container
var _this25=_possibleConstructorReturn(this,(BootstrapToggle.__proto__||Object.getPrototypeOf(BootstrapToggle)).call(this,$Util.opts(defaults,options)));_this25.after=_this25._after;_this25.append=_this25._append;_this25.appendTo=_this25._appendTo;_this25.before=_this25._before;_this25.prepend=_this25._prepend;_this25.prependTo=_this25._prependTo;return _ret25=_this25,_possibleConstructorReturn(_this25,_ret25);}/**
	 * Build a bootstrap toggle
	 * @returns {BootstrapToggle}
	 * @private
	 */_createClass(BootstrapToggle,[{key:'_useDefaultTemplate',value:function _useDefaultTemplate(){this.$wrapper=$('<input type="checkbox" name="'+this.settings.name+'"/>"').appendTo('body').bootstrapToggle(this.settings.toggleOptions);// bootstrap toggle has created some new DOM
// with the <input> inside an element. Grab that
this.$container=this.$wrapper.parent();return this;}// jquery redirects
},{key:'_after',value:function _after(){var _$container;(_$container=this.$container).after.apply(_$container,arguments);return this;}},{key:'_append',value:function _append(){var _$container2;(_$container2=this.$container).append.apply(_$container2,arguments);return this;}},{key:'_appendTo',value:function _appendTo(){var _$container3;(_$container3=this.$container).appendTo.apply(_$container3,arguments);return this;}},{key:'_before',value:function _before(){var _$container4;(_$container4=this.$container).before.apply(_$container4,arguments);return this;}},{key:'_prepend',value:function _prepend(){var _$container5;(_$container5=this.$container).prepend.apply(_$container5,arguments);return this;}},{key:'_prependTo',value:function _prependTo(){var _$container6;(_$container6=this.$container).prependTo.apply(_$container6,arguments);return this;}}]);return BootstrapToggle;}(Template);/*!
 * bootstrapWizard
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 *//**
 * A wizard with bootstrap feedback
 * @extends Wizard
 */var BootstrapWizard=function(_Wizard){_inherits(BootstrapWizard,_Wizard);/**
	 * Constructor
	 * @param {object} options
	 * @returns {BootstrapWizard}
	 */function BootstrapWizard(options){var _ret26;_classCallCheck(this,BootstrapWizard);var _this26=_possibleConstructorReturn(this,(BootstrapWizard.__proto__||Object.getPrototypeOf(BootstrapWizard)).call(this,options));return _ret26=_this26,_possibleConstructorReturn(_this26,_ret26);}/**
	 * Setup the feedback
	 * @returns {Form}
	 * @private
	 */_createClass(BootstrapWizard,[{key:'_setupFeedback',value:function _setupFeedback(){this.feedback=new BootstrapFeedback();if(!this.$feedback.length){this.$feedback=$('<div class="form-feedback"></div>');this.$wrapper.prepend(this.$feedback);}this.$feedback.html(this.feedback.$wrapper);return this;}}]);return BootstrapWizard;}(Wizard);
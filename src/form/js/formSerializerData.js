/*!
 * formSerializerData
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * An object that holds form data
 * and can output it in different ways
 */
class FormSerializerData {

	/**
	 * Constructor
	 * @param {object} [data={}]
	 * @returns {FormSerializerData}
	 */
	constructor(data){
		this.data = data || {};
		return this;
	}

	/**
	 * Set the data
	 * @param {object} data
	 * @returns {FormSerializerData}
	 */
	set(data){
		this.data = data;
		return this;
	}

	/**
	 * Convert the data to a serialized string
	 * @returns {string}
	 */
	toString(){
		var data = "";
		var c = 0;
		var len = Object.keys(this.data).length;
		Util.each(this.data, function(i, e){
			data += i + "=" + e.val;
			if(c++ < len - 1)
				data += "&";
		});
		return data;
	}

	/**
	 * Convert the data to an
	 * ordered serialized string
	 * @returns {string}
	 */
	toOrderedString(){
		var data = "";
		var ordered = [];
		var unordered = [];
		Util.each(this.data, function(i, e){
			var obj = {
				name : i,
				val : e.val
			};
			if(e.order > -1)
				ordered[e.order] = obj;
			else
				unordered.push(obj);
		});

		var len = ordered.length;
		for(var i = 0; i < len; i++){
			data += ordered[i].name + '=' + ordered[i].val;
			if(i < len)
				data += "&";
		}

		len = unordered.length;
		for(i = 0; i < len; i++){
			data += unordered[i].name + '=' + unordered[i].val;
			if(i < len - 1)
				data += "&";
		}

		return data;
	}

	/**
	 * Convert the data to an object
	 * @returns {object}
	 */
	toObject(){
		var data = {};
		Util.each(this.data, function(i, e){
			// convert string numbers to real numbers
			data[i] = isNaN(e.val)
				? e.val
				: parseInt(e.val);
		});
		return data;
	}

	/**
	 * Convert the data into a single value.
	 * This is only useful if the form only has one input.
	 * @returns {*}
	 */
	toValue(){
		var data = null;
		// data will be the last iterated object value
		// using this function though, the form is
		// expected to only have one input anyway
		Util.each(this.data, function(i, e){
			data = e.val;
		});
		return data;
	}
}
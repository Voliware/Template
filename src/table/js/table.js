/*!
 * table
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Templates and creates tables
 * @extends Template
 */
class Table extends Template {

	/**
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
	 */
	constructor(options){
		var defaults = {
			struct : {
				$wrapper : 'table',
				$thead : 'thead',
				$tbody : 'tbody',
				$tfoot : 'tfoot',
				$tr : 'tbody > tr'
			},
			rowHeaders : []
		};
		super($Util.opts(defaults, options));

		// properties
		this.$rows = [];

		// states
		this.isFirstBuild = true;

		// provide a default empty msg
		this.$empty = $('<tr class="table-empty"><td>There is no data to display.</td></tr>');

		return this;
	}

	/**
	 * Use the provided template and remove
	 * the remplate row from the <tbody>
	 * @param {jQuery|string} [$template=null] - a string or jquery object to use as the template.
	 * If null, will use what is set in this.settings.template
	 * @returns {Table}
	 * @private
	 */
	_useTemplate($template = null){
		super._useTemplate($template);
		// remove template row from the DOM
		this.$tr.remove();
		return this;
	}

	/**
	 * Build a default table structure
	 * @returns {Table}
	 * @private
	 */
	_useDefaultTemplate(){
		var template =
			'<table class="table">' +
				'<thead></thead>' +
				'<tbody>' +
					'<tr></tr>' +
				'</tbody>' +
				'<tfoot></tfoot>' +
			'</table>';

		this._useTemplate($(template));

		// todo: this is a patch for render 
		this.settings.template = null;

		// setup row headers
		var rh = this.settings.rowHeaders;
		var $theadRow = $('<tr></tr>');
		for(var i = 0; i < rh.length; i++){
			var header = rh[i] || '';
			var $header = '<th>'+header+'</th>';
			var $col = '<td></td>';

			this.$tr.append($col);
			$theadRow.append($header);
		}
		this.$thead.append($theadRow);

		return this;
	}

	// data

	/**
	 * Cache originally fed data
	 * @param {object} data
	 * @returns {Table}
	 * @private
	 */
	_cacheData(data){
		if(isArray(data))
			this._cachedData = data;
		else
			this._cachedData = $.extend(true, {}, data);
		return this;
	}

	/**
	 * Optionally process data
	 * @param {number[]|object|object[]|string[]} data
	 * @returns {Table}
	 * @private
	 */
	_processData(data){
		var self = this;
		if(isArray(data))
			this._processedData = data;
		else
			this._processedData = $.extend(true, {}, data);

		$.each(data, function(i, e){
			// add a private _id for objects
			if(isObject(e)){
				self._processedData[i]._id = i;
			}
			self._processedData[i] = self._processRow(e);
		});
		return this;
	}

	/**
	 * Optionally process row
	 * @param {*} data
	 * @returns {*}
	 * @private
	 */
	_processRow(data){
		return data;
	}

	// render

	/**
	 * Reneder/build the table rows from supplied data.
	 * This will empty the <tbody> element
	 * @param {object} data
	 * @returns {Table}
	 * @private
	 */
    _render(data){
		var self = this;
		var useTemplate = !isNull(this.settings.template);
		var dataIsArray = Array.isArray(data);

		// empty the <tbody>
        this.wipe();

		if(!$.isEmptyObject(data) || (dataIsArray && data.length))
			this.toggleEmpty(false);
		else
			return this;

		// run through data and create rows
		Util.each(data, function(i, e){
			var $row = createRow();

			// if data is an object and a template is used
			if(useTemplate && !Array.isArray(e))
				$row.populateChildren(e);
			// if data is an array
			else
				populateRow($row, e);

			addRow($row);
		});
        return this;

		// rows

		/**
		 * Create a new row
		 * @returns {jQuery}
		 */
		function createRow(){
			return self.$tr.clone();
		}

		/**
		 * Add the row to the <tobdy>
		 * @param {jQuery} $row
		 */
		function addRow($row){
			$row.appendTo(self.$tbody);
			self.$rows.push($row);
		}

		/**
		 * Populate a row with data
		 * The <td> elements will be populated
		 * @param {jQuery} $row - row to populate
		 * @param {object[]} data - array of data
		 */
		function populateRow($row, data){
			var dataArr = [];
			Util.each(data, function(i, e){
				dataArr.push(e);
			});

			var $tds = $row.find('td');
			$.each($tds, function(i, e){
				$(e).html(dataArr[i]);
			});
		}
    }

	/**
	 * Check if the table is empty based
	 * on the number of trs in the tbody.
	 * This may be useful if rows were
	 * delete from the DOM and not data
	 * @returns {boolean}
	 * @private
	 */
	_isEmptyTable(){
		return this.$tbody.find('tr').length === 0;
	}

	/**
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
	 */
	build(data){
		this._cacheData(data);
		this._processData(data);
		this.toggleEmpty(false);
		this._render(this._processedData);
		this.isFirstBuild = false;
		return this;
	}

	/**
	 * Empty the <tbody> and the cached data
	 * @returns {Table}
	 */
	wipe(){
		this.$tbody.empty();
		this.toggleEmpty(true);
		this.$rows = [];
		this._cachedData = {};
		return this;
	}

	/**
	 * Delete a row based on
	 * its index in this.$tr
	 * @param {number} index
	 * @returns {Table}
	 */
	deleteRow(index){
		if(this.$rows[index]){
			this.$rows[index].remove();
			this.$rows.splice(index, 1);
		}
		// check if all rows were deleted
		if(this._isEmptyTable()){
			this.toggleEmpty();
		}
		return this;
	}

	/**
	 * Toggle the empty table message
	 * and hide the thead and tfoot
	 * @param {boolean} [state=true]
	 * @returns {Table}
	 */
	toggleEmpty(state = true){
		this.$thead.toggle(!state);
		this.$tfoot.toggle(!state);
		
		if(state) {
			this.$tbody.append(this.$empty);
			this.$empty.show();
		}
		else {
			this.$empty.remove();
		}
		return this;
	}
}
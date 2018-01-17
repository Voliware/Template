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
		this.primaryKey = "id";

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
			// add a private _rowId_ for objects
			if(isObject(e)){
				self._processedData[i]._rowId_ = i;
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

		if(!$.isEmptyObject(data) || (Array.isArray(data) && data.length))
			this.toggleEmpty(false);
		else
			return this;

		// run through data and create rows
		Util.each(data, function(i, e){
			self.addRow(e);
		});
        return this;
    }

	// rows

	/**
	 * Create a new row
	 * @returns {jQuery}
	 */
	createRow(){
		return this.$tr.clone();
	}

	/**
	 * Add the row to the <tobdy>
	 * @param {jQuery} $row
	 * @returns {Table}
	 */
	appendRow($row){
		$row.appendTo(this.$tbody);
		this.$rows.push($row);
		return this;
	}

	/**
	 * Populate a row with data
	 * The <td> elements will be populated
	 * @param {jQuery} $row - row to populate
	 * @param {object[]} data - array of data
	 * @returns {Table}
	 */
	populateRow($row, data){
		var dataArr = [];
		Util.each(data, function(i, e){
			dataArr.push(e);
		});

		var $tds = $row.find('td');
		$.each($tds, function(i, e){
			$(e).html(dataArr[i]);
		});
		return this;
	}

	/**
	 * Add a new row and populate with data
	 * @param {object} data
	 * @returns {Table}
	 */
	addRow(data){
		var useTemplate = !isNull(this.settings.template);
		var $row = this.createRow();

		// if data is an object and a template is used
		if(useTemplate && !Array.isArray(data))
			$row.populateChildren(data);
		// if data is an array
		else
			this.populateRow($row, data);

		this.appendRow($row);
		if(!isDefined(data._rowId_)){
			data._rowId_ = this.$rows.length;
		}
		$row.attr('data-rowid', data._rowId_);
		if(data[this.primaryKey]){
			$row.attr('data-pkeyid', data[this.primaryKey]);
		}
		return this;
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
		this.wipe();
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
		// delete row html
		if(this.$rows[index]){
			this.$rows[index].remove();
			this.$rows[index] = null;
		}

		// delete cached data
		if(this._cachedData[index]){
			if(Array.isArray(this._cacheData)){
				this._cachedData.splice(index, 1);
			} 
			else {
				delete this._cachedData[index];
			}
		}

		// delete processed data 
		if(this._processedData[index]){
			if(Array.isArray(this._processedData)){
				this._processedData.splice(index, 1);
			} 
			else {
				delete this._processedData[index];
			}
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
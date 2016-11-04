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

		this.$rows = [];
		this._cachedData = {};

		return this;
	}

	/**
	 * Use the provided template and remove
	 * the remplate row from the <tbody>
	 * @returns {Table}
	 * @private
	 */
	_useTemplate(){
		super._useTemplate();
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

		this.settings.template = $(template);
		this.settings.useTemplate = true;
		this._useTemplate();

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
		this._cachedData = $.extend(true, {}, data);
		return this;
	}

	/**
	 * Optionally process data
	 * @param {object} data
	 * @returns {object}
	 * @private
	 */
	_processData(data){
		var self = this;
		var tData = $.extend(true, {}, data);
		$.each(data, function(i, e){
			// add a private _id
			tData[i]._id = i;
			tData[i] = self._processRow(e);
		});
		return tData;
	}

	/**
	 * Optionally process row
	 * @param {object} data
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
		var dataIsArray = $.isArray(data);

		// empty the <tbody>
        this.wipe();

		// run through data and create rows
		Util.each(data, function(i, e){
			var $row = createRow();

			// if data is an object and a template is used
			if(useTemplate && !dataIsArray)
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
	 * Build the entire table
	 * @param {object|object[]} data
	 * object: and object of objects, where each object is a row of data
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
		data = this._processData(data);
		this._render(data);
		return this;
	}

	/**
	 * Empty the <tbody> and the cached data
	 * @returns {Table}
	 */
	wipe(){
		this.$tbody.empty();
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
		return this;
	}
}
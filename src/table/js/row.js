/*!
 * row
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * A table row with inline editing support.
 * Used to build complex rows.
 * @extends Template
 */
class Row extends Template {

	/**
	 * Constructor
	 * @param {object} options
	 * @returns {Row}
	 */
	constructor(options){
		var defaults = {
			colIdentifier : 'name',
			struct : {
				$wrapper : 'tr'
			}
		};
		super($Util.opts(defaults, options));
		var self = this;

		// components
		this.colManager = new TemplateManager({
			identifier : this.settings.colIdentifier,
			useObjectNames : this.settings.useObjectNames,
			$wrapper  : this.$wrapper
		})
		.on('add', function(row){
			row.on('update', function(e, data){
				self.trigger('update', data);
			});
		});

		// save any template columns
		this.$cols = [];
		this.$wrapper.find('td').each(function(i, e){
			self.$cols.push($(e));
		});

		return this;
	}

	/**
	 * Default template
	 * @returns {Row}
	 * @private
	 */
	_useDefaultTemplate(){
		var template = '<tr></tr>';
		return this._useTemplate(template);
	}

	/**
	 * Generate columns for the row
	 * @param cols
	 * @returns {Row}
	 */
	generateColumns(cols){
		for(var i = 0; i < cols.length; i++){
			var fieldOptions = {
				fieldOptions: {
					name: cols[i].name
				}
			};
			var colData = $.extend(true, fieldOptions, cols[i]);
			var col = new Col(colData);
			this.colManager.addObject(col);
			this.$wrapper.append(col.$wrapper);
		}
		for(i = 0; i < this.$cols.length; i++){
			this.$wrapper.append(this.$cols[i]);
		}

		return this;
	}
}
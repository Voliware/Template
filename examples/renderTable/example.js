/*!
 * RenderTable example
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

// data
// object names are irrelevant unless
// option useObjectNames is set
var playerData1 = {
	Crosby : {
		name : "Sid the Kid",
		goals : 300,
		assists : 300,
		active : 1
	},
	1 : {
		name : "8 the Great",
		goals : 400,
		assists : 200,
		active : 1
	},
	abcd : {
		name : "Auston Matthews",
		goals : 6,
		assists : 4,
		active : 1
	}
};
// the second object of data has one 
// new row, one missing row, 
// and one updated row
var playerData2 = {
	Crosby : {
		name : "Sid the Kid",
		goals : 323,
		assists : 455,
		active : 1
	},
	abcd : {
		name : "Auston Matthews",
		goals : 6,
		assists : 4,
		active : 1
	},
	newGuy : {
		name : "New Player",
		goals : 0,
		assists : 1,
		active : 1
	}
};

// a custom table that uses bootstrapToggles
class CustomTable extends RenderTable {
	constructor(options){
		super(options);
		return this;
	}

	_processData(data){
		$.each(data, function(i, e){
			e.active = createSwitch(e.active === 1);
		});

		function createSwitch(state){
			var $wrapper = $('<div></div>');
			var active = new BootstrapToggle({
				switchOptions : {
					name : 'active',
					size : 'small'
				}
			})
				.change(function(){
					console.log("switch state is " + $(this).prop('checked'));
				})
				.appendTo($wrapper)
				.bootstrapToggle(state ? 'on' : 'off');
			return $wrapper;
		}
		return data;
	}
}


var playerTable;
var customTable;
$(document).on('ready', function(){

	// where to append the table
	var $basicTableContainer = $('#basicTableContainer');
	var $toggleTableContainer = $('#toggleTableContainer');
	// the table template found in the HTML
	var $playerTableTemplate = $('#playerTableTemplate');
	// the ControlTable
	playerTable = new RenderTable({
		template : $playerTableTemplate,
		// the property of each data object
		// that serves as its ID (must be unique)
		identifier : 'name'
	})
		.build(playerData1)
		.appendTo($basicTableContainer);
	
	setTimeout(function(){
		playerTable.build(playerData2);
	}, 2000);


	// custom table
	customTable = new CustomTable({
		template : $playerTableTemplate,
		identifier : 'name'
	})
		.appendTo($toggleTableContainer)
		.build(playerData1);

	setTimeout(function(){
		customTable.build(playerData2);
	}, 4000);
});
/*!
 * ControlTable example
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
		assists : 300
	},
	1 : {
		name : "8 the Great",
		goals : 400,
		assists : 200
	},
	abcd : {
		name : "Auston Matthews",
		goals : 6,
		assists : 4
	}
};

var playerTable;
$(document).on('ready', function(){

	// where to append the table
	var $playerTableContainer = $('#playerTableContainer');
	// the table template found in the HTML
	var $playerTableTemplate = $('#playerTableTemplate');
	// the ControlTable
	playerTable = new BootstrapControlTable({
		template : $playerTableTemplate,
		// the property of each data object
		// that serves as its ID (must be unique)
		identifier : 'name'
	})
		.build(playerData1)
		.appendTo($playerTableContainer)
});
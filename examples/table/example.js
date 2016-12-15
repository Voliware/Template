/*!
 * Table example
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

// object data
// object names are irrelevant unless
// option useObjectNames is set
var objectData = {
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

// array data
var arrayData = [
	['Sid the Kid', 311, 302],
	['8 the Greate', 440, 240],
	['Auston Matthews', 7, 5]
];

var objectTable;
var arrayTable;

$(document).on('ready', function(){

	// where to append the tables
	var $objectTableContainer = $('#objectTableContainer');
	var $arrayTableContainer = $('#arrayTableContainer');
	
	// the table object template found in the HTML
	var $objectTableTemplate = $('#objectTableTemplate');
	
	// the object table
	objectTable = new Table({
		template : $objectTableTemplate
	})
		.build(objectData)
		.appendTo($objectTableContainer);
	
	// the array table
	arrayTable = new Table({
		template : $objectTableTemplate,
		rowHeaders : ['Player', 'Goals', 'Asssts']
	})
		.build(arrayData)
		.appendTo($arrayTableContainer);
});
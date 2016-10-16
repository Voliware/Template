"use strict";

var expect = chai.expect;

// all

var tableDataObject = {
	"0" : {
		"fname" : "Bob",
		"lname" : "Dolle",
		"age" : 28
	},
	"1" : {
		"fname" : "Chris",
		"lname" : "Dolle",
		"age" : 25
	}
};

var tableDataObject2 = {
	"0" : {
		"fname" : "Bob",
		"lname" : "Hey",
		"age" : 28
	},
	"3" : {
		"fname" : "Harry",
		"lname" : "Garry",
		"age" : 44
	}
};

var tableDataArray = [
	["Bob", "Dolle", 22],
	["Chris", "Dolle", 33]
];

var playerData1 = {
	"0" : {
		player : "Joe",
		rank : 30
	},
	"1" : {
		player : "Sam",
		rank : 44
	}
};
var playerData2 = {
	"0" : {
		player : "Joe",
		rank : 31,
		active : 0
	},
	"1" : {
		player : "Grace",
		rank : 38,
		active : 0
	},
	"2" : {
		player : "Sam",
		rank : 44,
		active : 0
	}
};
var playerData3 = {
	"0" : {
		player : "Joe",
		rank : 31,
		active : 0
	},
	"1" : {
		player : "Grace",
		rank : 38,
		active : 1
	}
};

var tableTemplate =
'<table class="table">' +
	"<thead>" +
		"<tr>"+
			"<th>Frst Name</th>"+
			"<th>Last Name</th>"+
			"<th>Age</th>"+
		"</tr>"+
	"</thead>"+
	"<tbody>"+
		"<tr>"+
			'<td data-name="fname">V 1</td>'+
			'<td data-name="lname">V 2</td>'+
			'<td data-name="age">V 3</td>'+
		"</tr>"+
	"</tbody>"+
	"<tfoot>"+
		"<tr>"+
			"<th>F 1</th>"+
			"<th>F 2</th>"+
			"<th>F 3</th>"+
		"</tr>"+
	"</tfoot>"+
"</table>";

$(document).ready(function(){
	var $testTable = $('#testTable');
	var $dataTable = $('#dataTable');
	var $body = $('body');

	// templates

	var tableTemplate1 = new Table({
		template : $testTable
	})
		.build(tableDataArray)
		.appendTo($body)
		.fadeOut();

	var tableTemplate2 = new Table({
		template : tableTemplate
	})
		.appendTo($body)
		.build(tableDataObject);

	var tableTemplate3 = new Table({
		template : tableTemplate,
		identifier : 'age'
	})
		.appendTo($body)
		.build(tableDataObject)
		.build(tableDataObject2);

	// defaults

	var tableDefault1 = new Table({
		rowHeaders : ['first1','last2','age3']
	})
		.appendTo($body)
		.build(tableDataObject);

	// data tables
	var dataTable1 = new DataTable({
		template : $dataTable,
		identifier : 'player'
	})
		.appendTo($body)
		.build(playerData1);

	class CustomTable extends DataTable {
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

	var dataTable2 = new CustomTable({
		template : $dataTable,
		identifier : 'player'
	})
		.appendTo($body)
		.build(playerData3);

	setTimeout(function(){
		dataTable2.build(playerData1);
	}, 5000);

});

// Table

describe("Table", function() {
	describe("constructor", function(){
		it("should set a default rowHeaders setting", function(){
			var t = new Table();
			expect(t.settings.rowHeaders.length).to.equal(0);
		});
		it("should set a default '$wrapper' structure setting", function(){
			var t = new Table();
			expect(t.settings.struct.$wrapper).to.equal('table');
		});
		it("should set a default '$thead' structure setting", function(){
			var t = new Table();
			expect(t.settings.struct.$thead).to.equal('thead');
		});
		it("should set a default '$tbody' structure setting", function(){
			var t = new Table();
			expect(t.settings.struct.$tbody).to.equal('tbody');
		});
		it("should set a default '$tfoot' structure setting", function(){
			var t = new Table();
			expect(t.settings.struct.$tfoot).to.equal('tfoot');
		});
		it("should set a default '$tr' structure setting", function(){
			var t = new Table();
			expect(t.settings.struct.$tr).to.equal('tbody > tr');
		});
		it("should set the rowHeaders setting if provided", function(){
			var t = new Table({rowHeaders : ['a','b','c']});
			expect(t.settings.rowHeaders.length).to.equal(3);
		});
		it("should set the '$wrapper' structure setting if provided", function(){
			var t = new Table({struct : {$wrapper : 'myTable'}});
			expect(t.settings.struct.$wrapper).to.equal('myTable');
		});
		it("should set the '$thead' structure setting if provided", function(){
			var t = new Table({struct : {$thead : 'myHead'}});
			expect(t.settings.struct.$thead).to.equal('myHead');
		});
		it("should set the '$tbody' structure setting if provided", function(){
			var t = new Table({struct : {$tbody : 'myBody'}});
			expect(t.settings.struct.$tbody).to.equal('myBody');
		});
		it("should set the '$tfoot' structure setting if provided", function(){
			var t = new Table({struct : {$tfoot : 'myFoot'}});
			expect(t.settings.struct.$tfoot).to.equal('myFoot');
		});
		it("should set the '$tfoot' structure setting if provided", function(){
			var t = new Table({struct : {$tr : 'myTr'}});
			expect(t.settings.struct.$tr).to.equal('myTr');
		});
	});

	describe("build", function() {
		it("should add rows if data object is provided", function() {
			var t = new Table();
			t.build(tableDataObject);
			expect(t.$rows.length).to.be.above(0);
		});
		it("should add rows if data array is provided", function() {
			var t = new Table();
			t.build(tableDataArray);
			expect(t.$rows.length).to.be.above(0);
		});
	});

	describe("wipe", function() {
		it("should empty row manager", function() {
			var t = new DataTable({
				template : tableTemplate,
				identifier : 'age'
			})
				.build(tableDataObject)
				.wipe();
			expect(Object.keys(t.rowManager.templates).length).to.equal(0);
		});
		it("should empty all $rows", function() {
			var t = new Table();
			t.wipe();
			expect(t.$rows.length).to.equal(0);
		});
	});
});

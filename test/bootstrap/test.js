"use strict";

var expect = chai.expect;

var steps = [
	{
		text : 'Doing it',
		err : 'Failed'
	},
	{
		text : 'Did it',
		err : 'Super failed'
	},
	{
		text : 'Still doing it?',
		err : 'Mega failed'
	},
	{
		text : 'Ok last one',
		err : 'Or is it?'
	}
];

$(document).on('ready', function(){
	var $body = $('body');

	var tg = new BootstrapToggle({
		name : 'test',
		toggleOptions : {
			on : "It's on"
		}
	})
		.change(function(){
			console.log("switch state is " + $(this).prop('checked'));
		})
		.appendTo('body').bootstrapToggle('on');

	// panels
	var pm = new BootstrapPanelManager();
	pm.appendTo($body);

	var pan1 = new BootstrapPanel({
		html : {
			class : 'panel-danger',
			title : "Great panel",
			footer : 'Great footer',
			body : 'Great body'
		},
		id : 0
	});
	var pan2 = new BootstrapPanel({
		html : {
			class : 'panel-success',
			title : "Even greater panel",
			footer : 'Even greater footer',
			body : 'Even greater body'
		},
		id : 1
	});

	pm.add(pan1).add(pan2);

	// feedback
	var fbbs = new BootstrapFeedback().appendTo('body').setFeedback('info', 'This is some information. Or is it?');


	// progress
	var p1 =  new BootstrapProgress()
		.appendTo($body)
		.setProgress(48);

	// loader
	var l1 = new BootstrapLoader({
		showPercent : false,
		steps : steps
	}).appendTo($body).setStep(0);
	var l2 = new BootstrapLoader({
		steps : steps
	}).appendTo($body).goStart();
	var l3 = new BootstrapLoader({
		steps : steps
	}).appendTo($body).goStart().goNext().goNext();
	var l4 = new BootstrapLoader({
		steps : steps
	}).appendTo($body).goStart().goNext().goPrev();
	var l5 = new BootstrapLoader({
		steps : steps
	}).appendTo($body).goEnd();
	var l6 = new BootstrapLoader({
		steps : steps
	}).appendTo($body).setStep(0).setErr();
});

// Feedback

describe("Feedback", function() {
});

// PageLoader

describe("BootstrapLoader", function() {
	describe("create", function() {
		it("should set the step count to the number of supplied steps", function() {
			var p = new BootstrapLoader({
				steps : steps
			});
			expect(p.stepCount).to.equal(4);
		});
	});
});
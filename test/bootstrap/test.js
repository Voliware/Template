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
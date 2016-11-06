var feedback;

$(document).on('ready', function(){

	feedback = new Feedback()
		.appendTo('body')
		.setFeedback('warning', "Operation Failed")

});
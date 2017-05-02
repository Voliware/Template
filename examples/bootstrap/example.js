var p1;
var form;
$(document).on('ready', function(){
	var $toggle = $('#toggle');
	var $panel = $('#panel');
	var $feedback = $('#feedback');
	var $progress = $('#progress');
	var $tabManager = $('#tabManager');

	var tg = new BootstrapToggle({
		name : 'test',
		toggleOptions : {
			on : "It's on"
		}
	})
		.change(function(){
			console.log("switch state is " + $(this).prop('checked'));
		})
		.appendTo($toggle).bootstrapToggle('on');

	// panels
	var pm = new BootstrapPanelManager();
	pm.appendTo($panel);

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
	var fbbs = new BootstrapFeedback()
		.appendTo($feedback)
		.setFeedback('info', 'This is some information. Or is it?');


	// progress
	p1 =  new BootstrapProgress()
		.appendTo($progress)
		.setProgress(48);

	var navManager = new BootstrapNavManager({
		useObjectNames : true
	}).appendTo($tabManager);

	var tabManager = new BootstrapTabManager({
		useObjectNames : true
	}).appendTo($tabManager);

	var tabs = {
		tab1 : {
			id : 'tab1',
			html : 'tab 1 html'
		},
		tab2 : {
			id : 'tab2',
			html : 'tab 2 html'
		}
	};
	var navs = {
		nav1 : {
			href : 'tab1',
			html : 'nav 1 html'
		},
		nav2 : {
			href : 'tab2',
			html : 'nav 2 html'
		}
	};
	tabManager.build(tabs);
	navManager.build(navs);


	form = new BootstrapForm({
		validator : Form.validators.formValidation,
		template : $('#buildForm'),
		submitRequest : function(data){
			console.log(data);
		}
	})
	.build({
		0 : {
			label : 'TEST',
			input : {
				tag : 'input',
				name: 'asd',
				type: 'text'
			}
		},
		1 : {
			label : 'select',
			input : {
				tag : 'select',
				name : 'dada'
			}
		}
	})
});
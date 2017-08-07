/*! gulpfile.js */

var exec = require('child_process').exec;
var webbuild = require('gulp-webbuild');
var gulp = webbuild.gulp;
var buildJs = webbuild.buildJs;
var buildCss = webbuild.buildCss;
var buildMove = webbuild.buildMove;
var buildInject = webbuild.buildInject;
var buildFileSys = webbuild.buildFileSys;

// project
var proj = 'C:/Voliware/Web/Template/';

// source
var src = {};
src.root = proj + 'src/';
buildFileSys(src, 'bootstrap');
buildFileSys(src, 'feedback');
buildFileSys(src, 'form');
buildFileSys(src, 'table');
buildFileSys(src, 'template');

// dist
var dist = {};
dist.root = proj + 'dist/';
buildFileSys(dist, 'bootstrap');
buildFileSys(dist, 'feedback');
buildFileSys(dist, 'form');
buildFileSys(dist, 'table');
buildFileSys(dist, 'template');
buildFileSys(dist, 'template-package');
buildFileSys(dist, 'template-package-bootstrap');

// WebUtil
var webUtilJs = 'C:/Voliware/Web/WebUtil/src/js/';
var webUtilCss = 'C:/Voliware/Web/WebUtil/src/css/';

// collections
var collections = {
	bootstrap : {
		js : [
			src.bootstrap.js + 'bootstrap.js',
			src.bootstrap.js + 'bootstrapControlTable.js',
			src.bootstrap.js + 'bootstrapFeedback.js',
			src.bootstrap.js + 'bootstrapFormGroup.js',
			src.bootstrap.js + 'bootstrapFormGroupManager.js',
			src.bootstrap.js + 'bootstrapFormInput.js',
			src.bootstrap.js + 'bootstrapFormSelect.js',
			src.bootstrap.js + 'bootstrapForm.js',
			src.bootstrap.js + 'bootstrapModal.js',
			src.bootstrap.js + 'bootstrapModalForm.js',
			src.bootstrap.js + 'bootstrapNav.js',
			src.bootstrap.js + 'bootstrapNavManager.js',
			src.bootstrap.js + 'bootstrapPanel.js',
			src.bootstrap.js + 'bootstrapPanelManager.js',
			src.bootstrap.js + 'bootstrapCard.js',
			src.bootstrap.js + 'bootstrapCardManager.js',
			src.bootstrap.js + 'bootstrapProgress.js',
			src.bootstrap.js + 'bootstrapLoader.js',
			src.bootstrap.js + 'bootstrapTab.js',
			src.bootstrap.js + 'bootstrapTabManager.js',
			src.bootstrap.js + 'bootstrapToggle.js',
			src.bootstrap.js + 'bootstrapWizard.js'
		],
		css : [
			src.bootstrap.css + 'bootstrap.css',
			src.bootstrap.css + 'bootstrapFeedback.css',
			src.bootstrap.css + 'bootstrapLoader.css',
			src.bootstrap.css + 'bootstrapPanel.css',
			src.bootstrap.css + 'bootstrapProgress.css',
			src.bootstrap.css + 'bootstrapTab.css',
			src.bootstrap.css + 'bootstrapTable.css'
		]
	},
	feedback : {
		js : [
			src.feedback.js + 'feedback.js'
		],
		css : [
			src.feedback.css + 'feedback.css'
		]
	},
	form : {
		js : [
			src.form.js + 'formInput.js',
			src.form.js + 'formSelect.js',
			src.form.js + 'formGroup.js',
			src.form.js + 'formGroupManager.js',
			src.form.js + 'formSerializer.js',
			src.form.js + 'formSerializerData.js',
			src.form.js + 'form.js',
			src.form.js + 'wizard.js'
		],
		css : [
			src.form.css + 'wizard.css'
		]
	},
	table : {
		js : [
			src.table.js + 'col.js',
			src.table.js + 'row.js',
			src.table.js + 'crudRow.js',
			src.table.js + 'table.js',
			src.table.js + 'renderTable.js',
			src.table.js + 'controlTable.js'
		],
		css : [
			src.table.css + 'table.css'
		]
	},
	template : {
		js : [
			src.template.js + 'template.js',
			src.template.js + 'templateManager.js'
		],
		css : [
			src.template.css + 'template.css'
		]
	},
	util : {
		js : [
			webUtilJs + 'extendext.js',
			webUtilJs + 'util.js',
			webUtilJs + 'util-jquery.js',
			webUtilJs + 'eventSystem.js',
			webUtilJs + 'manager.js'
		],
		css : [
			webUtilCss + 'util.css'
		]
	}
};


/**
 * Build the bootstrap module
 * @returns {*}
 */
function buildBootstrap(){
	buildJs(collections.bootstrap.js, dist.bootstrap.js, 'bootstrap');
	return buildCss(collections.bootstrap.css, dist.bootstrap.css, 'bootstrap');
}

/**
 * Build the form module
 * @returns {*}
 */
function buildForm(){
	buildJs(collections.form.js, dist.form.js, 'form');
	return buildCss(collections.form.css, dist.form.css, 'form');
}

/**
 * Build the feedback module
 * @returns {*}
 */
function buildFeedback(){
	buildJs(collections.feedback.js, dist.feedback.js, 'feedback');
	return buildCss(collections.feedback.css, dist.feedback.css, 'feedback');
}

/**
 * Build the table module
 * @returns {*}
 */
function buildTable(){
	buildJs(collections.table.js, dist.table.js, 'table');
	return buildCss(collections.table.css, dist.table.css, 'table');
}

/**
 * Built the template library
 * @returns {*}
 */
function buildTemplate(){
	var js = [].concat(collections.util.js, collections.template.js);
	buildJs(js, dist.template.js, 'template');
	var css = [].concat(collections.util.css, collections.template.css);
	return buildCss(css, dist.template.css, 'template');
}

/**
 * Build as a packaged library
 * @returns {*}
 */
function buildPackage(){
	var js = [].concat(
		collections.util.js,
		collections.template.js,
		collections.feedback.js,
		collections.table.js,
		collections.form.js);
	buildJs(js, dist['template-package'].js, 'template-package');

	var css = [].concat(
		collections.util.css,
		collections.template.css,
		collections.feedback.css,
		collections.table.css,
		collections.form.css);
	return buildCss(css, dist['template-package'].css, 'template-package');
}

/**
 * Build as a packaged library with bootstrap
 * @returns {*}
 */
function buildPackageBootstrap(){
	var js = [].concat(
		collections.util.js,
		collections.template.js,
		collections.feedback.js,
		collections.table.js,
		collections.form.js,
		collections.bootstrap.js);
	buildJs(js, dist['template-package-bootstrap'].js, 'template-package-bootstrap');

	var css = [].concat(
		collections.util.css,
		collections.template.css,
		collections.feedback.css,
		collections.table.css,
		collections.form.css,
		collections.bootstrap.css);
	return buildCss(css, dist['template-package-bootstrap'].css, 'template-package-bootstrap');
}

/**
 * Build js doc
 */
function buildJsDoc(){
	var cmd = 'jsdoc -c conf.json';
	return exec(cmd, function(error, stdout, stderr) {
		console.log('js doc done');
	});
}

// tasks
gulp.task('all', function(){
	buildBootstrap();
	buildFeedback();
	buildForm();
	buildTable();
	buildTemplate();
	buildPackage();
	return buildPackageBootstrap();
});

// individual tasks

gulp.task('bootstrap', function(){
	return buildBootstrap()();
});

gulp.task('feedback', function(){
	return buildFeedback()();
});

gulp.task('form', function(){
	return buildForm()();
});

gulp.task('table', function(){
	return buildTable()();
});

gulp.task('template', function(){
	return buildTemplate();
});

gulp.task('package', function(){
	return buildPackage();
});

gulp.task('packageBootstrap', function(){
	return buildPackageBootstrap();
});

gulp.task('jsdoc', function(){
	return buildJsDoc();
});
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

// WebUtil
var webUtilJs = 'C:/Voliware/Web/WebUtil/src/js/';
var webUtilCss = 'C:/Voliware/Web/WebUtil/src/css/';

/**
 * Build the bootstrap module
 * @returns {*}
 */
function buildBootstrap(){
	var js = [
		src.bootstrap.js + 'bootstrap.js',
		src.bootstrap.js + 'bootstrapToggle.js',
		src.bootstrap.js + 'bootstrapFeedback.js',
		src.bootstrap.js + 'bootstrapProgress.js',
		src.bootstrap.js + 'bootstrapLoader.js',
		src.bootstrap.js + 'bootstrapModal.js',
		src.bootstrap.js + 'bootstrapNav.js',
		src.bootstrap.js + 'bootstrapNavManager.js',
		src.bootstrap.js + 'bootstrapTab.js',
		src.bootstrap.js + 'bootstrapTabManager.js',
		src.bootstrap.js + 'bootstrapPanel.js',
		src.bootstrap.js + 'bootstrapPanelManager.js'
	];
	buildJs(js, dist.bootstrap.js, 'bootstrap');

	var css = [
		src.bootstrap.css + 'bootstrap.css',
		src.bootstrap.css + 'bootstrapFeedback.css',
		src.bootstrap.css + 'bootstrapLoader.css',
		src.bootstrap.css + 'bootstrapPanel.css',
		src.bootstrap.css + 'bootstrapProgress.css',
		src.bootstrap.css + 'bootstrapTab.css'
	];
	return buildCss(css, dist.bootstrap.css, 'bootstrap');
}

/**
 * Build the form module
 * @returns {*}
 */
function buildForm(){
	var js = [
		src.form.js + 'form.js',
		src.form.js + 'formSerializer.js',
		src.form.js + 'formSerializerData.js',
		src.form.js + 'wizard.js'
	];
	buildJs(js, dist.form.js, 'form');

	var css = [
		src.form.css + 'wizard.css'
	];
	return buildCss(css, dist.form.css, 'form');
}

/**
 * Build the feedback module
 * @returns {*}
 */
function buildFeedback(){
	var js = [
		src.feedback.js + 'feedback.js'
	];
	return buildJs(js, dist.feedback.js, 'feedback');
}

/**
 * Build the table module
 * @returns {*}
 */
function buildTable(){
	var js = [
		src.table.js + 'table.js',
		src.table.js + 'renderTable.js'
	];
	return buildJs(js, dist.table.js, 'table');
}

/**
 * Built the template library
 * @returns {*}
 */
function builtTemplate(){
	var js = [
		webUtilJs + 'util.js',
		webUtilJs + 'util-jquery.js',
		webUtilJs + 'eventSystem.js',
		webUtilJs + 'manager.js',
		src.template.js + 'template.js',
		src.template.js + 'templateManager.js'
	];
	buildJs(js, dist.template.js, 'template');
	
	var css = [
		webUtilCss + 'util.css'
	];
	return buildCss(css, dist.template.css, 'template');
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
	buildJsDoc();
	buildBootstrap();
	buildFeedback();
	buildForm();
	buildTable();
	return builtTemplate();
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

gulp.task('util-jquery', function(){
	return builtTemplate();
});

gulp.task('jsdoc', function(){
	buildJsDoc();
});
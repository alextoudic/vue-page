webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  template: __webpack_require__(9),
	  replace: true,
	  data: function () {
	    return {
	      msg: 'This is page A.',
	      leftName: 'Bruce Lee',
	      rightName: 'Chuck Norris'
	    }
	  },
	  components: {
	    'app-header': __webpack_require__(7),
	    'app-pane': __webpack_require__(8)
	  }
	}

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(25)

	module.exports = {
	  template: __webpack_require__(27),
	  paramAttributes: ['msg']
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(28)

	module.exports = {
	  template: __webpack_require__(30),
	  replace: true,
	  paramAttributes: ['side', 'name']
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div>\n  <app-header msg=\"{{msg}}\"></app-header>\n  <app-pane side=\"left\" name=\"{{leftName}}\"></app-pane>\n  <app-pane side=\"right\" name=\"{{rightName}}\"></app-pane>\n</div>";

/***/ },
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/node_modules/css-loader/index.js!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/node_modules/stylus-loader/index.js!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/src/components/header/style.styl", function() {
			var newContent = require("!!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/node_modules/css-loader/index.js!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/node_modules/stylus-loader/index.js!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/src/components/header/style.styl");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	exports.push([module.id, "app-header {\n  color: #bada55;\n}\n", ""]);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<h1>{{msg}}</h1>";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/node_modules/css-loader/index.js!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/node_modules/stylus-loader/index.js!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/src/components/pane/style.styl", function() {
			var newContent = require("!!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/node_modules/css-loader/index.js!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/node_modules/stylus-loader/index.js!/Users/alex/Work/Vue/vue-page/dev/examples/webpack/src/components/pane/style.styl");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	exports.push([module.id, ".pane {\n  display: inline-block;\n  width: 300px;\n  height: 300px;\n  box-sizing: border-box;\n  padding: 15px 30px;\n  border: 2px solid #f3f3f3;\n  margin: 10px;\n}\n", ""]);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"pane\">\n  <p>This is the {{side}} pane!</p>\n  <p>{{name}}</p>\n</div>";

/***/ }
]);
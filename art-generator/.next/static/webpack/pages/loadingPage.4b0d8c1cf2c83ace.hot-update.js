"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/loadingPage",{

/***/ "./src/pages/loadingPage.js":
/*!**********************************!*\
  !*** ./src/pages/loadingPage.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_src_assert_this_initialized_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @swc/helpers/src/_assert_this_initialized.mjs */ \"./node_modules/@swc/helpers/src/_assert_this_initialized.mjs\");\n/* harmony import */ var _swc_helpers_src_class_call_check_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @swc/helpers/src/_class_call_check.mjs */ \"./node_modules/@swc/helpers/src/_class_call_check.mjs\");\n/* harmony import */ var _swc_helpers_src_create_class_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @swc/helpers/src/_create_class.mjs */ \"./node_modules/@swc/helpers/src/_create_class.mjs\");\n/* harmony import */ var _swc_helpers_src_define_property_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @swc/helpers/src/_define_property.mjs */ \"./node_modules/@swc/helpers/src/_define_property.mjs\");\n/* harmony import */ var _swc_helpers_src_inherits_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swc/helpers/src/_inherits.mjs */ \"./node_modules/@swc/helpers/src/_inherits.mjs\");\n/* harmony import */ var _swc_helpers_src_create_super_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swc/helpers/src/_create_super.mjs */ \"./node_modules/@swc/helpers/src/_create_super.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Components_TestPhotos_Loading_icon_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/TestPhotos/Loading_icon.gif */ \"./src/Components/TestPhotos/Loading_icon.gif\");\n/* harmony import */ var _Components_dalleComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Components/dalleComponent */ \"./src/Components/dalleComponent.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar finalDalleAssembled = (__webpack_require__(/*! ../Components/assembler_Obj */ \"./src/Components/assembler_Obj.js\").finalDalleAssembled);\nvar Facts = (__webpack_require__(/*! ../Components/dataFile.js */ \"./src/Components/dataFile.js\").Facts);\n/***\n * \n * The loading page keeps the user pre-occupied \n * while waiting for the image to be generated.\n * \n * It can either showcase previous examples of artworks,\n * or provide fun facts about the artistic process.\n * \n */ var LoadingPage = /*#__PURE__*/ function(_Component) {\n    \"use strict\";\n    (0,_swc_helpers_src_inherits_mjs__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(LoadingPage, _Component);\n    var _super = (0,_swc_helpers_src_create_super_mjs__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(LoadingPage);\n    function LoadingPage() {\n        (0,_swc_helpers_src_class_call_check_mjs__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(this, LoadingPage);\n        var _this;\n        _this = _super.apply(this, arguments);\n        (0,_swc_helpers_src_define_property_mjs__WEBPACK_IMPORTED_MODULE_10__[\"default\"])((0,_swc_helpers_src_assert_this_initialized_mjs__WEBPACK_IMPORTED_MODULE_11__[\"default\"])(_this), \"state\", {\n            funFact: Facts.funFacts[0]\n        });\n        (0,_swc_helpers_src_define_property_mjs__WEBPACK_IMPORTED_MODULE_10__[\"default\"])((0,_swc_helpers_src_assert_this_initialized_mjs__WEBPACK_IMPORTED_MODULE_11__[\"default\"])(_this), \"updateFact\", function() {\n            //every 5 seconds, update the fact\n            setInterval(function() {\n                var randomFact = Facts.funFacts[Math.floor(Math.random() * Facts.funFacts.length)];\n                _this.setState({\n                    funFact: randomFact\n                });\n                _this.state.funFact = randomFact;\n            }, 5000);\n        });\n        return _this;\n    }\n    (0,_swc_helpers_src_create_class_mjs__WEBPACK_IMPORTED_MODULE_12__[\"default\"])(LoadingPage, [\n        {\n            key: \"componentDidMount\",\n            value: function componentDidMount() {\n                this.updateFact();\n            }\n        },\n        {\n            key: \"render\",\n            value: function render() {\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                            children: \"Creating your new artwork: \"\n                        }, void 0, false, {\n                            fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/loadingPage.js\",\n                            lineNumber: 46,\n                            columnNumber: 16\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                            children: finalDalleAssembled.text\n                        }, void 0, false, {\n                            fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/loadingPage.js\",\n                            lineNumber: 47,\n                            columnNumber: 16\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Components_dalleComponent__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                            text: finalDalleAssembled.text\n                        }, void 0, false, {\n                            fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/loadingPage.js\",\n                            lineNumber: 49,\n                            columnNumber: 17\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            children: [\n                                \" \",\n                                this.state.funFact,\n                                \" \"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/loadingPage.js\",\n                            lineNumber: 51,\n                            columnNumber: 16\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/loadingPage.js\",\n                    lineNumber: 45,\n                    columnNumber: 13\n                }, this);\n            }\n        }\n    ]);\n    return LoadingPage;\n}((react__WEBPACK_IMPORTED_MODULE_1___default().Component));\n/* harmony default export */ __webpack_exports__[\"default\"] = (LoadingPage);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvbG9hZGluZ1BhZ2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0FBQTBCO0FBQ3NDO0FBQ047QUFFM0I7QUFDRjtBQUNXO0FBRXhDLElBQU0sbUJBQXFCLEdBQUtPLGlIQUFMO0FBQzNCLElBQU0sS0FBTyxHQUFLQSw0RkFBTDtBQUViOzs7Ozs7OztDQVFDLEdBRUEsZUFBaUIsaUJBdUNmOzs7O2FBdkNJRSxXQUFXOzs7O1FBRWRDLGlGQUFBQSxDQUFBQSx5RkFBQUEsU0FBQUEsT0FBSyxFQUFHO1lBQ0pDLE9BQU8sRUFBRUgsS0FBSyxDQUFDSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzdCO1FBTURDLGlGQUFBQSxDQUFBQSx5RkFBQUEsU0FBQUEsWUFBVSxFQUFHLFdBQU07WUFDZixrQ0FBa0M7WUFDbENDLFdBQVcsQ0FBQyxXQUFNO2dCQUNkLElBQUlDLFVBQVUsR0FBR1AsS0FBSyxDQUFDSSxRQUFRLENBQUNJLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHVixLQUFLLENBQUNJLFFBQVEsQ0FBQ08sTUFBTSxDQUFDLENBQUM7Z0JBQ2xGLE1BQUtDLFFBQVEsQ0FBQztvQkFBQ1QsT0FBTyxFQUFFSSxVQUFVO2lCQUFDLENBQUMsQ0FBQztnQkFDckMsTUFBS0wsS0FBSyxDQUFDQyxPQUFPLEdBQUdJLFVBQVUsQ0FBQzthQUNuQyxFQUFFLElBQUksQ0FBQztTQUVYOzs7OztZQVpETSxHQUFpQixFQUFqQkEsbUJBQWlCO21CQUFqQkEsU0FBQUEsaUJBQWlCLEdBQUc7Z0JBQ2hCLElBQUksQ0FBQ1IsVUFBVSxFQUFFLENBQUM7YUFDckI7OztZQVlEUyxHQUFNLEVBQU5BLFFBQU07bUJBQU5BLFNBQUFBLE1BQU0sR0FBRztnQkFFTCxxQkFDSSw4REFBQ0MsS0FBRzs7c0NBQ0QsOERBQUNDLElBQUU7c0NBQUMsNkJBQTJCOzs7OztnQ0FBSztzQ0FDcEMsOERBQUNDLElBQUU7c0NBQUVuQixtQkFBbUIsQ0FBQ29CLElBQUk7Ozs7O2dDQUFNO3NDQUVsQyw4REFBQ3hCLGtFQUFjOzRCQUFDd0IsSUFBSSxFQUFFcEIsbUJBQW1CLENBQUNvQixJQUFJOzs7OztnQ0FBRztzQ0FFbEQsOERBQUNDLElBQUU7O2dDQUFDLEdBQUM7Z0NBQUUsSUFBSSxDQUFDakIsS0FBSyxDQUFDQyxPQUFPO2dDQUFFLEdBQUM7Ozs7OztnQ0FBSzs7Ozs7O3dCQUU5QixDQUVUO2FBQ0o7Ozs7Q0FHSixDQXJDMEJYLHdEQUFlLENBcUN6QztBQUVELCtEQUFlUyxXQUFXLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2xvYWRpbmdQYWdlLmpzPzNhMTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vQ29tcG9uZW50cy9UZXN0UGhvdG9zL0xvYWRpbmdfaWNvbi5naWYnO1xuaW1wb3J0IERhbGxlQ29tcG9uZW50IGZyb20gXCIuLi9Db21wb25lbnRzL2RhbGxlQ29tcG9uZW50XCI7XG5cbmltcG9ydCBJbWFnZSBmcm9tICduZXh0L2ltYWdlJztcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuXG5jb25zdCB7IGZpbmFsRGFsbGVBc3NlbWJsZWQgfSA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudHMvYXNzZW1ibGVyX09iaicpO1xuY29uc3QgeyBGYWN0cyB9ID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50cy9kYXRhRmlsZS5qcycpO1xuXG4vKioqXG4gKiBcbiAqIFRoZSBsb2FkaW5nIHBhZ2Uga2VlcHMgdGhlIHVzZXIgcHJlLW9jY3VwaWVkIFxuICogd2hpbGUgd2FpdGluZyBmb3IgdGhlIGltYWdlIHRvIGJlIGdlbmVyYXRlZC5cbiAqIFxuICogSXQgY2FuIGVpdGhlciBzaG93Y2FzZSBwcmV2aW91cyBleGFtcGxlcyBvZiBhcnR3b3JrcyxcbiAqIG9yIHByb3ZpZGUgZnVuIGZhY3RzIGFib3V0IHRoZSBhcnRpc3RpYyBwcm9jZXNzLlxuICogXG4gKi9cblxuIGNsYXNzIExvYWRpbmdQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIHN0YXRlID0ge1xuICAgICAgICBmdW5GYWN0OiBGYWN0cy5mdW5GYWN0c1swXVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUZhY3QoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVGYWN0ID0gKCkgPT4ge1xuICAgICAgICAvL2V2ZXJ5IDUgc2Vjb25kcywgdXBkYXRlIHRoZSBmYWN0XG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGxldCByYW5kb21GYWN0ID0gRmFjdHMuZnVuRmFjdHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRmFjdHMuZnVuRmFjdHMubGVuZ3RoKV07XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmdW5GYWN0OiByYW5kb21GYWN0fSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmZ1bkZhY3QgPSByYW5kb21GYWN0O1xuICAgICAgICB9LCA1MDAwKVxuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkgeyAgIFxuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICA8aDE+Q3JlYXRpbmcgeW91ciBuZXcgYXJ0d29yazogPC9oMT5cbiAgICAgICAgICAgICAgIDxoMz57ZmluYWxEYWxsZUFzc2VtYmxlZC50ZXh0fTwvaDM+XG5cbiAgICAgICAgICAgICAgICA8RGFsbGVDb21wb25lbnQgdGV4dD17ZmluYWxEYWxsZUFzc2VtYmxlZC50ZXh0fS8+XG5cbiAgICAgICAgICAgICAgIDxoMj4geyB0aGlzLnN0YXRlLmZ1bkZhY3QgfSA8L2gyPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICApXG4gICAgfSBcblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRpbmdQYWdlOyJdLCJuYW1lcyI6WyJSZWFjdCIsImxvYWRpbmciLCJEYWxsZUNvbXBvbmVudCIsIkltYWdlIiwiTGluayIsInVzZVJvdXRlciIsImZpbmFsRGFsbGVBc3NlbWJsZWQiLCJyZXF1aXJlIiwiRmFjdHMiLCJMb2FkaW5nUGFnZSIsInN0YXRlIiwiZnVuRmFjdCIsImZ1bkZhY3RzIiwidXBkYXRlRmFjdCIsInNldEludGVydmFsIiwicmFuZG9tRmFjdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInNldFN0YXRlIiwiY29tcG9uZW50RGlkTW91bnQiLCJyZW5kZXIiLCJkaXYiLCJoMSIsImgzIiwidGV4dCIsImgyIiwiQ29tcG9uZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/loadingPage.js\n"));

/***/ })

});
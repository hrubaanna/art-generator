"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/galleryPage",{

/***/ "./src/pages/galleryPage.js":
/*!**********************************!*\
  !*** ./src/pages/galleryPage.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSP\": function() { return /* binding */ __N_SSP; },\n/* harmony export */   \"default\": function() { return /* binding */ Gallery; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @swc/helpers/src/_async_to_generator.mjs */ \"./node_modules/@swc/helpers/src/_async_to_generator.mjs\");\n/* harmony import */ var _Users_annahruba_Desktop_hybrid_bridge_art_generator_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var _Users_annahruba_Desktop_hybrid_bridge_art_generator_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_annahruba_Desktop_hybrid_bridge_art_generator_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar __N_SSP = true;\nfunction Gallery(param) {\n    var movies = param.movies;\n    var _this = this;\n    var handlePost = function() {\n        var _ref = (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_Users_annahruba_Desktop_hybrid_bridge_art_generator_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(e) {\n            var user, response, data;\n            return _Users_annahruba_Desktop_hybrid_bridge_art_generator_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                while(1)switch(_ctx.prev = _ctx.next){\n                    case 0:\n                        e.preventDefault();\n                        user = {\n                            name: \"test user 1\",\n                            email: \"testemail@email.com\",\n                            createdAt: new Date().toISOString()\n                        };\n                        _ctx.next = 4;\n                        return fetch(\"/api/users\", {\n                            method: \"POST\",\n                            body: JSON.stringify(user)\n                        });\n                    case 4:\n                        response = _ctx.sent;\n                        _ctx.next = 7;\n                        return response.json();\n                    case 7:\n                        data = _ctx.sent;\n                        if (data.success) {\n                            // reset the fields\n                            console.log(\"success\");\n                        // set the message\n                        } else {\n                            // set the error\n                            console.log(\"error\");\n                        }\n                    case 9:\n                    case \"end\":\n                        return _ctx.stop();\n                }\n            }, _callee);\n        }));\n        return function handlePost(e) {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"button\", {\n                onClick: handlePost,\n                children: \"Create User\"\n            }, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/src/pages/galleryPage.js\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"h1\", {\n                children: \"Top 20 Movies of All Time\"\n            }, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/src/pages/galleryPage.js\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"small\", {\n                    children: \"(According to Metacritic)\"\n                }, void 0, false, {\n                    fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/src/pages/galleryPage.js\",\n                    lineNumber: 46,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/src/pages/galleryPage.js\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"ul\", {\n                children: movies.map(function(movie) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"li\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"h2\", {\n                                children: movie.title\n                            }, void 0, false, {\n                                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/src/pages/galleryPage.js\",\n                                lineNumber: 51,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"h3\", {\n                                children: movie.metacritic\n                            }, void 0, false, {\n                                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/src/pages/galleryPage.js\",\n                                lineNumber: 52,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                                children: movie.plot\n                            }, void 0, false, {\n                                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/src/pages/galleryPage.js\",\n                                lineNumber: 53,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/src/pages/galleryPage.js\",\n                        lineNumber: 50,\n                        columnNumber: 11\n                    }, _this);\n                })\n            }, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/src/pages/galleryPage.js\",\n                lineNumber: 48,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/src/pages/galleryPage.js\",\n        lineNumber: 41,\n        columnNumber: 5\n    }, this);\n};\n_c = Gallery;\nvar _c;\n$RefreshReg$(_c, \"Gallery\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvZ2FsbGVyeVBhZ2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRWUsU0FBU0EsT0FBTyxDQUFDLEtBQVUsRUFBRTtRQUFaLE1BQVEsR0FBUixLQUFVLENBQVJDLE1BQU07O0lBRXRDLElBQU1DLFVBQVU7bUJBQUcscVFBQU9DLENBQUMsRUFBSztnQkFTMUJDLElBQUksRUFPSkMsUUFBUSxFQU1SQyxJQUFJOzs7O3dCQXJCUkgsQ0FBQyxDQUFDSSxjQUFjLEVBQUUsQ0FBQzt3QkFRZkgsSUFBSSxHQUFHOzRCQUNUSSxJQUFJLEVBQUUsYUFBYTs0QkFDbkJDLEtBQUssRUFBRSxxQkFBcUI7NEJBQzVCQyxTQUFTLEVBQUUsSUFBSUMsSUFBSSxFQUFFLENBQUNDLFdBQVcsRUFBRTt5QkFDcEM7OytCQUdvQkMsS0FBSyxDQUFDLFlBQVksRUFBRTs0QkFDckNDLE1BQU0sRUFBRSxNQUFNOzRCQUNkQyxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBUyxDQUFDYixJQUFJLENBQUM7eUJBQzdCLENBQUM7O3dCQUhFQyxRQUFRLFlBR1Y7OytCQUdlQSxRQUFRLENBQUNhLElBQUksRUFBRTs7d0JBQTVCWixJQUFJLFlBQXdCO3dCQUVoQyxJQUFJQSxJQUFJLENBQUNhLE9BQU8sRUFBRTs0QkFDZCxtQkFBbUI7NEJBQ25CQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdkIsa0JBQWtCO3lCQUVyQixNQUFNOzRCQUNILGdCQUFnQjs0QkFDaEJELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUN4Qjs7Ozs7O1NBQ0o7d0JBakNPbkIsVUFBVSxDQUFVQyxDQUFDOzs7T0FpQzVCO0lBRUMscUJBQ0UsOERBQUNtQixLQUFHOzswQkFDRiw4REFBQ0MsUUFBTTtnQkFBQ0MsT0FBTyxFQUFFdEIsVUFBVTswQkFBRSxhQUFXOzs7OztvQkFBUzswQkFFakQsOERBQUN1QixJQUFFOzBCQUFDLDJCQUF5Qjs7Ozs7b0JBQUs7MEJBQ2xDLDhEQUFDQyxHQUFDOzBCQUNBLDRFQUFDQyxPQUFLOzhCQUFDLDJCQUF5Qjs7Ozs7d0JBQVE7Ozs7O29CQUN0QzswQkFDSiw4REFBQ0MsSUFBRTswQkFDQTNCLE1BQU0sQ0FBQzRCLEdBQUcsQ0FBQyxTQUFDQyxLQUFLO3lDQUNoQiw4REFBQ0MsSUFBRTs7MENBQ0QsOERBQUNDLElBQUU7MENBQUVGLEtBQUssQ0FBQ0csS0FBSzs7Ozs7cUNBQU07MENBQ3RCLDhEQUFDQyxJQUFFOzBDQUFFSixLQUFLLENBQUNLLFVBQVU7Ozs7O3FDQUFNOzBDQUMzQiw4REFBQ1QsR0FBQzswQ0FBRUksS0FBSyxDQUFDTSxJQUFJOzs7OztxQ0FBSzs7Ozs7OzZCQUNoQjtpQkFDTixDQUFDOzs7OztvQkFDQzs7Ozs7O1lBQ0QsQ0FDTjtDQUNIO0FBeER1QnBDLEtBQUFBLE9BQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2dhbGxlcnlQYWdlLmpzPzEyZGYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjb25uZWN0VG9EYXRhYmFzZSB9ID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvY29ubmVjdE1vbmdvJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbGxlcnkoeyBtb3ZpZXMgfSkge1xuXG4gIGNvbnN0IGhhbmRsZVBvc3QgPSBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIHJlc2V0IGVycm9yIGFuZCBtZXNzYWdlXG5cbiAgICAvLyBmaWVsZHMgY2hlY2tcbiAgICAvL2lmICghdGl0bGUgfHwgIWNvbnRlbnQpIHJldHVybiBzZXRFcnJvcignQWxsIGZpZWxkcyBhcmUgcmVxdWlyZWQnKTtcblxuICAgIC8vIHVzZXIgc3RydWN0dXJlXG4gICAgbGV0IHVzZXIgPSB7XG4gICAgICBuYW1lOiBcInRlc3QgdXNlciAxXCIsXG4gICAgICBlbWFpbDogXCJ0ZXN0ZW1haWxAZW1haWwuY29tXCIsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICB9XG5cbiAgICAvLyBzYXZlIHRoZSB1c2VyXG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvdXNlcnMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcbiAgICB9KTtcblxuICAgIC8vIGdldCB0aGUgZGF0YVxuICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICAvLyByZXNldCB0aGUgZmllbGRzXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgLy8gc2V0IHRoZSBtZXNzYWdlXG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzZXQgdGhlIGVycm9yXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XG4gICAgfVxufTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVBvc3R9PkNyZWF0ZSBVc2VyPC9idXR0b24+XG5cbiAgICAgIDxoMT5Ub3AgMjAgTW92aWVzIG9mIEFsbCBUaW1lPC9oMT5cbiAgICAgIDxwPlxuICAgICAgICA8c21hbGw+KEFjY29yZGluZyB0byBNZXRhY3JpdGljKTwvc21hbGw+XG4gICAgICA8L3A+XG4gICAgICA8dWw+XG4gICAgICAgIHttb3ZpZXMubWFwKChtb3ZpZSkgPT4gKFxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxoMj57bW92aWUudGl0bGV9PC9oMj5cbiAgICAgICAgICAgIDxoMz57bW92aWUubWV0YWNyaXRpY308L2gzPlxuICAgICAgICAgICAgPHA+e21vdmllLnBsb3R9PC9wPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICkpfVxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcygpIHtcblxuICAvL2xvYWQgdGhlIGdhbGxlcnkgb2YgYXJ0IGZyb20gdGhlIGRhdGFiYXNlXG4gICAgY29uc3QgeyBkYiB9ID0gYXdhaXQgY29ubmVjdFRvRGF0YWJhc2UoKTtcbiAgXG4gICAgY29uc3QgYXJ0ID0gYXdhaXQgZGIgXG4gICAgICAuY29sbGVjdGlvbihcImFydFwiKVxuICAgICAgLmZpbmQoe30pXG4gICAgICAuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSlcbiAgICAgIC5saW1pdCgyMClcbiAgICAgIC50b0FycmF5KCk7XG4gIFxuICAgIHJldHVybiB7XG4gICAgICBwcm9wczoge1xuICAgICAgICBtb3ZpZXM6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXJ0KSksXG4gICAgICB9LFxuICAgIH07XG4gIH1cbiJdLCJuYW1lcyI6WyJHYWxsZXJ5IiwibW92aWVzIiwiaGFuZGxlUG9zdCIsImUiLCJ1c2VyIiwicmVzcG9uc2UiLCJkYXRhIiwicHJldmVudERlZmF1bHQiLCJuYW1lIiwiZW1haWwiLCJjcmVhdGVkQXQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwianNvbiIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwiZGl2IiwiYnV0dG9uIiwib25DbGljayIsImgxIiwicCIsInNtYWxsIiwidWwiLCJtYXAiLCJtb3ZpZSIsImxpIiwiaDIiLCJ0aXRsZSIsImgzIiwibWV0YWNyaXRpYyIsInBsb3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/galleryPage.js\n"));

/***/ })

});
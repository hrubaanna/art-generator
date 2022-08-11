"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dalleTest",{

/***/ "./src/pages/dalleTest.js":
/*!********************************!*\
  !*** ./src/pages/dalleTest.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ DalleTest; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Components_UserInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Components/UserInput */ \"./src/Components/UserInput.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nfunction DalleTest() {\n    var _this = this;\n    var getDalle2 = function getDalle2() {\n        if (dallequery != \"\" && token != \"\") {\n            setLoading(true);\n            setError(false);\n            fetch(\"/api/dalle2?k=\".concat(token, \"&q=\").concat(dallequery), {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                }\n            }).then(function(res) {\n                return res.json();\n            }).then(function(data) {\n                setResult(data.result);\n                setLoading(false);\n            }).catch(function(err) {\n                console.log(err);\n                setError(true);\n                setLoading(false);\n            });\n        } else {\n            setError(true);\n        }\n    };\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(\"\"), token = ref[0], setToken = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(\"\"), dallequery = ref1[0], setQuery = ref1[1];\n    var ref2 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]), result = ref2[0], setResult = ref2[1];\n    var ref3 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false), loading = ref3[0], setLoading = ref3[1];\n    var ref4 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false), error = ref4[0], setError = ref4[1];\n    var router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    var query = router.query;\n    var name = query.text;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"Testing creating images with Dalle\"\n            }, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/dalleTest.js\",\n                lineNumber: 46,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: query\n            }, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/dalleTest.js\",\n                lineNumber: 48,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Components_UserInput__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/dalleTest.js\",\n                lineNumber: 49,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                id: \"query\",\n                type: \"text\",\n                placeholder: \"Enter query\",\n                value: dallequery,\n                onChange: function(e) {\n                    console.log(e.target.value);\n                    setToken(\"sess-H3CXbJsrbAYlqNsCh17fEdVqEbrkI9HYIrZrNyeZ\");\n                    setQuery(e.target.value);\n                }\n            }, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/dalleTest.js\",\n                lineNumber: 50,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: getDalle2,\n                children: \" Get Results! \"\n            }, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/dalleTest.js\",\n                lineNumber: 61,\n                columnNumber: 13\n            }, this),\n            error ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"something went wrong lol\"\n            }, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/dalleTest.js\",\n                lineNumber: 64,\n                columnNumber: 17\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false),\n            loading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"Loading\"\n            }, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/dalleTest.js\",\n                lineNumber: 69,\n                columnNumber: 25\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid\",\n                children: result.map(function(result) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"card\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                            src: result.generation.image_path,\n                            alt: \"\",\n                            className: \"imgPreview\"\n                        }, void 0, false, {\n                            fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/dalleTest.js\",\n                            lineNumber: 75,\n                            columnNumber: 29\n                        }, _this)\n                    }, void 0, false, {\n                        fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/dalleTest.js\",\n                        lineNumber: 74,\n                        columnNumber: 25\n                    }, _this);\n                })\n            }, void 0, false, {\n                fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/dalleTest.js\",\n                lineNumber: 71,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/annahruba/Desktop/hybrid-bridge/art-generator/art-generator/src/pages/dalleTest.js\",\n        lineNumber: 45,\n        columnNumber: 9\n    }, this);\n};\n_s(DalleTest, \"sevb/werfCibUijkijlv3HEike4=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = DalleTest;\nvar _c;\n$RefreshReg$(_c, \"DalleTest\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ0gsS0FBSyxDQUFDLENBQUM7b0JBQzVCZCxRQUFRLENBQUMsK0NBQStDLENBQUM7b0JBQ3pEQyxRQUFRLENBQUNlLENBQUMsQ0FBQ0MsTUFBTSxDQUFDSCxLQUFLLENBQUM7aUJBQUM7Ozs7O29CQUUvQjswQkFDRiw4REFBQ0ksUUFBTTtnQkFBQ0MsT0FBTyxFQUFFckMsU0FBUzswQkFBRSxnQkFBYzs7Ozs7b0JBQVM7WUFFbERxQixLQUFLLGlCQUNGLDhEQUFDTSxHQUFDOzBCQUFDLDBCQUVIOzs7OztvQkFBSSxpQkFDSCw2SUFBSztZQUVUUCxPQUFPLGtCQUFJLDhEQUFDTyxHQUFDOzBCQUFDLFNBQU87Ozs7O29CQUFJOzBCQUUxQiw4REFBQ0QsS0FBRztnQkFBQ1ksU0FBUyxFQUFDLE1BQU07MEJBQ2hCekIsTUFBTSxDQUFDMEIsR0FBRyxDQUFDLFNBQUMxQixNQUFNLEVBQUs7b0JBQ3BCLHFCQUNJLDhEQUFDYSxLQUFHO3dCQUFDWSxTQUFTLEVBQUMsTUFBTTtrQ0FDakIsNEVBQUNFLEtBQUc7NEJBQ0FDLEdBQUcsRUFBRTVCLE1BQU0sQ0FBQzZCLFVBQVUsQ0FBQ0MsVUFBVTs0QkFDakNDLEdBQUcsRUFBQyxFQUFFOzRCQUNOTixTQUFTLEVBQUMsWUFBWTs7Ozs7aUNBQ3hCOzs7Ozs2QkFDQSxDQUNSO2lCQUNMLENBQUM7Ozs7O29CQUNBOzs7Ozs7WUFDSixDQUNSO0NBRUw7R0FoRnVCdkMsU0FBUzs7UUFPZEosa0RBQVM7OztBQVBKSSxLQUFBQSxTQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9kYWxsZVRlc3QuanM/OWIxNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVzZXJJbnB1dCBmcm9tICcuLi9Db21wb25lbnRzL1VzZXJJbnB1dCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGFsbGVUZXN0KCkge1xuICAgIGNvbnN0IFt0b2tlbiwgc2V0VG9rZW5dID0gdXNlU3RhdGUoXCJcIik7XG4gICAgY29uc3QgW2RhbGxlcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlKFwiXCIpO1xuICAgIGNvbnN0IFtyZXN1bHQsIHNldFJlc3VsdF0gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gICAgY29uc3QgcXVlcnkgPSByb3V0ZXIucXVlcnk7XG4gICAgY29uc3QgbmFtZSA9IHF1ZXJ5LnRleHQ7XG5cbiAgICBmdW5jdGlvbiBnZXREYWxsZTIoKSB7XG4gICAgICAgIGlmKGRhbGxlcXVlcnkgIT0gXCJcIiAmJiB0b2tlbiAhPSBcIlwiKSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgc2V0RXJyb3IoZmFsc2UpO1xuICAgICAgICAgICAgZmV0Y2goYC9hcGkvZGFsbGUyP2s9JHt0b2tlbn0mcT0ke2RhbGxlcXVlcnl9YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0KGRhdGEucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRFcnJvcih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cD5UZXN0aW5nIGNyZWF0aW5nIGltYWdlcyB3aXRoIERhbGxlPC9wPlxuXG4gICAgICAgICAgICA8cD57cXVlcnl9PC9wPlxuICAgICAgICAgICAgPFVzZXJJbnB1dCAvPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgaWQ9XCJxdWVyeVwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgcXVlcnlcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkYWxsZXF1ZXJ5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRva2VuKCdzZXNzLUgzQ1hiSnNyYkFZbHFOc0NoMTdmRWRWcUVicmtJOUhZSXJack55ZVonKVxuICAgICAgICAgICAgICAgICAgICBzZXRRdWVyeShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2dldERhbGxlMn0+IEdldCBSZXN1bHRzISA8L2J1dHRvbj5cblxuICAgICAgICAgICAge2Vycm9yID8gKFxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICBzb21ldGhpbmcgd2VudCB3cm9uZyBsb2xcbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICApIDogKDw+PC8+KX1cblxuICAgICAgICAgICAge2xvYWRpbmcgJiYgPHA+TG9hZGluZzwvcD59XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxuICAgICAgICAgICAgICAgIHtyZXN1bHQubWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17cmVzdWx0LmdlbmVyYXRpb24uaW1hZ2VfcGF0aH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbWdQcmV2aWV3XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcblxufSJdLCJuYW1lcyI6WyJIZWFkIiwidXNlUm91dGVyIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJVc2VySW5wdXQiLCJEYWxsZVRlc3QiLCJnZXREYWxsZTIiLCJkYWxsZXF1ZXJ5IiwidG9rZW4iLCJzZXRMb2FkaW5nIiwic2V0RXJyb3IiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJzZXRSZXN1bHQiLCJyZXN1bHQiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJzZXRUb2tlbiIsInNldFF1ZXJ5IiwibG9hZGluZyIsImVycm9yIiwicm91dGVyIiwicXVlcnkiLCJuYW1lIiwidGV4dCIsImRpdiIsInAiLCJpbnB1dCIsImlkIiwidHlwZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJidXR0b24iLCJvbkNsaWNrIiwiY2xhc3NOYW1lIiwibWFwIiwiaW1nIiwic3JjIiwiZ2VuZXJhdGlvbiIsImltYWdlX3BhdGgiLCJhbHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/dalleTest.js\n"));

/***/ })

});
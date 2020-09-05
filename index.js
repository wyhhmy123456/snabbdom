/******/
(function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/
    var installedModules = {}; // The require function
    /******/
    /******/
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        } // Create a new module (and put it into the cache)
        /******/
        /******/
        var module = (installedModules[moduleId] = {
            /******/
            i: moduleId,
            /******/
            l: false,
            /******/
            exports: {},
            /******/
        }); // Execute the module function
        /******/
        /******/
        /******/
        modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        ); // Flag the module as loaded
        /******/
        /******/
        /******/
        module.l = true; // Return the exports of the module
        /******/
        /******/
        /******/
        return module.exports;
        /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/
    /******/
    __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/
    /******/
    __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/
    /******/
    __webpack_require__.d = function(exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
                /******/
                configurable: false,
                /******/
                enumerable: true,
                /******/
                get: getter,
                /******/
            });
            /******/
        }
        /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/
    /******/
    __webpack_require__.n = function(module) {
        /******/
        var getter =
            module && module.__esModule ?
            /******/
            function getDefault() {
                return module["default"];
            } :
            /******/
            function getModuleExports() {
                return module;
            };
        /******/
        __webpack_require__.d(getter, "a", getter);
        /******/
        return getter;
        /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/
    /******/
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/
    /******/
    __webpack_require__.p = ""; // Load entry module and return exports
    /******/
    /******/
    /******/
    return __webpack_require__((__webpack_require__.s = 0));
    /******/
})(
    /************************************************************************/
    /******/
    [
        /* 0 */
        /***/
        function(module, exports) {
            const patch = snabbdom.patch;
            const h = snabbdom.h;
            const container = document.querySelector(".container");
            const tab = document.querySelector(".tab");
            const search = document.querySelector(".search");
            const update = document.querySelector(".update");
            const data = {
                list: [1, 2],
                newlist: [],
                searchVal: "",
                flag: true,
                currentVal: "",
                updateVal: "",
                updateIndex: ""
            }


            function renderList(arr) {


                return h("ul", {
                    props: {
                        className: "container",

                    },
                }, arr.map((item, index) =>
                    h("li", {}, [
                        h("p", {}, item),
                        h("button", {
                            props: {
                                onclick: () => {
                                    data.updateIndex = index
                                    updated(item)
                                }
                            }
                        }, "修改"),
                        h("button", {
                            props: {
                                onclick: () => {

                                    removeList(index)
                                }
                            }
                        }, "删除")
                    ])
                ))
            }



            patch(container, renderList(data.list))





            function getContainer() {
                return document.querySelector(".container");
            }

            function renderAddInput() {
                return h("input", {
                    props: {
                        type: "text",
                        placeholder: "请输入要增加的新事务",
                        onkeydown: (e) => {
                            if (e.keyCode == 13) {
                                data.list.push(e.target.value)
                                patch(getContainer(), renderList(data.list))
                                e.target.value = ""
                            }
                        }
                    }
                }, )

            }
            patch(tab, renderAddInput())

            function removeList(index) {
                data.list.splice(index, 1)
                patch(getContainer(), renderList(data.list))
            }


            function renderSearchInput() {
                return h("div", {}, [
                    h("input", {
                        props: {
                            type: "text",
                            placeholder: "请输入要搜索的内容",
                            onchange: (e) => {
                                data.searchVal = e.target.value
                                e.target.value = ''
                            }
                        }
                    }),
                    h("button", {
                        props: {
                            onclick: () => {
                                data.newlist = data.list.filter((item) => data.searchVal == item)
                                patch(getContainer(), renderList(data.newlist))

                            }
                        }
                    }, "搜索"),
                    h("button", {
                        props: {
                            onclick: () => {

                                patch(getContainer(), renderList(data.list))

                            }
                        }
                    }, "返回")
                ])

            }

            patch(search, renderSearchInput())


            function renderUpdateInput() {
                return h("div", {
                    props: {
                        className: "up",

                    },
                    style: {
                        display: data.flag ? "none" : "block"
                    }
                }, [
                    h("input", {
                        props: {
                            value: data.currentVal,
                            type: "text",
                            placeholder: "请输入要修改的内容",
                            oninput: (e) => {
                                data.updateVal = e.target.value
                            }
                        },

                    }),
                    h("button", {
                        props: {
                            onclick: () => {
                                data.flag = !data.flag
                                patch(document.querySelector(".up"), renderUpdateInput())
                            }
                        }
                    }, "取消"),
                    h("button", {
                        props: {
                            onclick: () => {

                                data.list[data.updateIndex] = data.updateVal
                                patch(getContainer(), renderList(data.list))
                            }
                        }
                    }, "确定")
                ])

            }
            patch(update, renderUpdateInput())

            function updated(item) {
                data.currentVal = item
                data.flag = false
                patch(document.querySelector(".up"), renderUpdateInput())
            }






            /***/
        },
        /******/
    ]
);
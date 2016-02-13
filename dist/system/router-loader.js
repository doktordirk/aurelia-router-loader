System.register(['aurelia-router'], function (_export) {
    'use strict';

    var Router, RouterLoader;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }],
        execute: function () {
            RouterLoader = (function () {
                function RouterLoader() {
                    _classCallCheck(this, RouterLoader);

                    this.container = null;
                    this.router = null;
                    this._routeLocations = [];
                    this._loadedJson = {};
                }

                _createClass(RouterLoader, [{
                    key: 'registerContainer',
                    value: function registerContainer(container) {
                        this.container = container;
                        this.router = container.get(Router);
                    }
                }, {
                    key: 'loadRoutes',
                    value: function loadRoutes(config) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this.loadJsonMap().then(function (routes) {
                                _this.router.configure(function (c) {
                                    if (config) {
                                        if (config.title) {
                                            c.title = config.title;
                                        }

                                        if (config.options.pushState) {
                                            c.options.pushState = config.options.pushState;
                                        }

                                        if (config.options.root) {
                                            c.options.root = config.options.root;
                                        }
                                    }
                                });
                                resolve();
                            });
                        });
                    }
                }, {
                    key: 'defineRoutes',
                    value: function defineRoutes(routes) {
                        this._jsonFiles.push(routes);
                    }
                }, {
                    key: 'loadJsonMap',
                    value: function loadJsonMap() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var finalJson = [];

                            for (var i = 0; i < _routeLocations.length; i++) {
                                var pointer = _routeLocations[i];

                                if (pointer) {
                                    var loadedJson = require(pointer + '!json');

                                    if (loadedJson) {
                                        finalJson.push(loadedJson);
                                    }
                                }
                            }

                            _this2._loadedJson = finalJson;
                            resolve(finalJson);
                        });
                    }
                }]);

                return RouterLoader;
            })();

            _export('RouterLoader', RouterLoader);
        }
    };
});
System.register(['aurelia-router', 'core-js'], function (_export) {
    'use strict';

    var Router, RouterLoader;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }, function (_coreJs) {}],
        execute: function () {
            RouterLoader = (function () {
                function RouterLoader() {
                    _classCallCheck(this, RouterLoader);

                    this.container = null;
                    this.router = null;
                    this._routeLocations = [];
                    this._loadedRoutes = {};
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
                            _this.loadRoutesMap().then(function (routes) {
                                _this.router.configure(function (c) {
                                    if (config) {
                                        Object.merge(c, config);
                                    }
                                });
                                resolve();
                            });
                        });
                    }
                }, {
                    key: 'defineRoutes',
                    value: function defineRoutes(routes) {
                        this._routeLocations = routes;
                    }
                }, {
                    key: 'loadRoutesMap',
                    value: function loadRoutesMap() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var finalRoutes = [];

                            for (var i = 0; i < _this2._routeLocations.length; i++) {
                                var pointer = _this2._routeLocations[i];

                                if (pointer) {
                                    _this2.require(pointer).then(function (routes) {
                                        if (routes) {
                                            finalRoutes.push(routes);
                                        }
                                    })['catch'](function (e) {
                                        throw new Error(e);
                                    });
                                }
                            }

                            _this2._loadedRoutes = finalRoutes;
                            resolve(finalRoutes);
                        });
                    }
                }, {
                    key: 'require',
                    value: function require(what) {
                        return new Promise(function (resovle, reject) {
                            var xmlhttp = new XMLHttpRequest();

                            xmlhttp.onreadystatechange = function () {
                                if (xmlhttp.readyState == 4) {
                                    resolve(xmlhttp.responseText);
                                } else {
                                    reject(new Error('Could not load local file.'));
                                }
                            };

                            xmlhttp.open('GET', what, true);
                            xmlhttp.send(null);
                        });
                    }
                }]);

                return RouterLoader;
            })();

            _export('RouterLoader', RouterLoader);
        }
    };
});
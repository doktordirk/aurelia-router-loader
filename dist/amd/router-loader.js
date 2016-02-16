define(['exports', 'aurelia-loader', 'aurelia-router', 'core-js'], function (exports, _aureliaLoader, _aureliaRouter, _coreJs) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var RouterLoader = (function () {
        function RouterLoader() {
            _classCallCheck(this, RouterLoader);

            this.container = null;
            this.router = null;
            this._routeLocations = [];
            this._loadedRoutes = [];
        }

        _createClass(RouterLoader, [{
            key: 'registerContainer',
            value: function registerContainer(container) {
                this.container = container;
                this.loader = container.get(_aureliaLoader.Loader);
                this.router = container.get(_aureliaRouter.Router);
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

                            c.map(routes);
                        });

                        resolve(routes);
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

                var promises = [];
                var finalRoutes = [];

                return new Promise(function (resolve, reject) {
                    for (var i = 0; i < _this2._routeLocations.length; i++) {
                        var pointer = _this2._routeLocations[i];

                        if (pointer) {
                            promises.push(_this2.loader.loadText(pointer));
                        }
                    }

                    Promise.all(promises).then(function (values) {
                        for (var i = 0, len = values.length; i < len; i++) {
                            var pointer = JSON.parse(values[i]);

                            if (pointer.length) {
                                pointer.forEach(function (obj) {
                                    finalRoutes.push(obj);
                                });
                            }
                        }

                        _this2._loadedRoutes = finalRoutes;

                        resolve(finalRoutes);
                    });
                });
            }
        }]);

        return RouterLoader;
    })();

    exports.RouterLoader = RouterLoader;
});
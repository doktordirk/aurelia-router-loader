'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaRouter = require('aurelia-router');

var RouterLoader = (function () {
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
            this.router = container.get(_aureliaRouter.Router);
        }
    }, {
        key: 'loadRoutes',
        value: function loadRoutes(config) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.loadJsonMap().then(function (routes) {
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
        key: 'loadJsonMap',
        value: function loadJsonMap() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var finalRoutes = [];

                for (var i = 0; i < _this2._routeLocations.length; i++) {
                    var pointer = _this2._routeLocations[i];

                    if (pointer) {
                        var loadedRoutes = require(pointer);

                        if (loadedRoutes) {
                            finalRoutes.push(loadedRoutes);
                        }
                    }
                }

                _this2._loadedJson = finalRoutes;
                resolve(finalRoutes);
            });
        }
    }]);

    return RouterLoader;
})();

exports.RouterLoader = RouterLoader;
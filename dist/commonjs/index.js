'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.configure = configure;

var _aureliaRouter = require('aurelia-router');

var _routerLoader = require('./router-loader');

function configure(aurelia, callbackFunction) {
    var loaderInstance = aurelia.container.get(_routerLoader.RouterLoader);
    var router = aurelia.container.get(_aureliaRouter.Router);

    if (callbackFunction !== undefined && typeof callbackFunction === 'function') {
        callbackFunction(loaderInstance);
    }

    loaderInstance.registerContainer(aurelia.container);

    loaderInstance.loadRoutes().then(function (routes) {
        routes.forEach(function (route) {
            router.addRoute(route);
        });
    });
}
System.register(['aurelia-router', './router-loader'], function (_export) {
    'use strict';

    var Router, RouterLoader;

    _export('configure', configure);

    function configure(aurelia, callbackFunction) {
        var loaderInstance = aurelia.container.get(RouterLoader);
        var router = aurelia.container.get(Router);

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

    return {
        setters: [function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }, function (_routerLoader) {
            RouterLoader = _routerLoader.RouterLoader;
        }],
        execute: function () {}
    };
});
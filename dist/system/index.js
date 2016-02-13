System.register(['./router-loader'], function (_export) {
    'use strict';

    var RouterLoader;

    _export('configure', configure);

    function configure(aurelia, callbackFunction) {
        var loaderInstance = aurelia.container.get(RouterLoader);

        if (callbackFunction !== undefined && typeof callbackFunction === 'function') {
            callbackFunction(loaderInstance);
        }

        loaderInstance.registerContainer(aurelia.container);

        return new Promise(function (resolve, reject) {
            loaderInstance.loadRoutes().then(function () {
                resolve();
            });
        })['catch'](function () {
            reject(new Error('Sorry, there was an error loading one or more of your predefined JSON route files.'));
        });
    }

    return {
        setters: [function (_routerLoader) {
            RouterLoader = _routerLoader.RouterLoader;
        }],
        execute: function () {}
    };
});
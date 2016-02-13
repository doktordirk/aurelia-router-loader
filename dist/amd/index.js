define(['exports', './router-loader'], function (exports, _routerLoader) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });
    exports.configure = configure;

    function configure(aurelia, callbackFunction) {
        var loaderInstance = aurelia.container.get(_routerLoader.RouterLoader);

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
});
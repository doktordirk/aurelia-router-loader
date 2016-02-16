import {Router} from 'aurelia-router';
import {RouterLoader} from './router-loader';

export function configure(aurelia, callbackFunction) {
    let loaderInstance = aurelia.container.get(RouterLoader);
    let router = aurelia.container.get(Router);

    // Do we have a callback function?
    if (callbackFunction !== undefined && typeof(callbackFunction) === 'function') {
        callbackFunction(loaderInstance);
    }

    // Tell our class about Aurelia's dependency injection container
    loaderInstance.registerContainer(aurelia.container);

    loaderInstance.loadRoutes().then(routes => {
        routes.forEach(route => {
            router.addRoute(route);
        });
    });
}

import {Router} from 'aurelia-router';
import {RouterLoader} from './router-loader';

export function configure(aurelia, callbackFunction) {
    let loaderInstance = aurelia.container.get(RouterLoader);

    // Do we have a callback function?
    if (callbackFunction !== undefined && typeof(callbackFunction) === 'function') {
        callbackFunction(loaderInstance);
    }

    loaderInstance.loadRoutes();
}

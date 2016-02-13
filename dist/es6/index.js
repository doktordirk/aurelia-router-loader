import {RouterLoader} from './router-loader';

export function configure(aurelia, callbackFunction) {
    let loaderInstance = aurelia.container.get(RouterLoader);

    // Do we have a callback function?
    if (callbackFunction !== undefined && typeof(callbackFunction) === 'function') {
        callbackFunction(loaderInstance);
    }
    
    // Tell our class about Aurelia's dependency injection container
    loaderInstance.registerContainer(aurelia.container);

    return new Promise((resolve, reject) => {
        loaderInstance.loadRoutes().then(() => {
            resolve();
        });
    }).catch(() => {
        reject(new Error('Sorry, there was an error loading one or more of your predefined JSON route files.'));
    });
}

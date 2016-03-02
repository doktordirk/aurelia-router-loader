import {Loader} from 'aurelia-loader';
import {Router} from 'aurelia-router';

export class RouterLoader {
    container = null;
    router = null;

    _routeLocations = [];
    _loadedRoutes = [];

    /**
     * Register Container
     * Passed in DI container reference
     *
     * @param {any} container
     * @returns {void}
     *
     */
    registerContainer(container) {
        this.container = container;
        this.loader = container.get(Loader);
        this.router = container.get(Router);
    }

    /**
     * Load Routes
     *
     * A method used by the bootstrapping phase
     * to load our routes.
     *
     * @returns {Promise}
     * 
     */
    loadRoutes() {
        return new Promise((resolve, reject) => {
            this.loadRoutesMap().then(routes => {
                if (routes.length) {
                    this.router.configureRouter(config => {
                        config.map(routes);
                    });
                }

                resolve(routes);
            });
        });
    }

    /**
     * Define Routes
     *
     * This method is called during the bootstrapping phase
     * when Aurelia first loads. It is where you pass through
     * the location of your route files.
     *
     * @param {array} routes An array of route JSON files to load
     * @returns {void}
     *
     */
    defineRoutes(routes) {
        this._routeLocations = routes;
        
        if (routes) {
            this.loadRoutes();
        }
    }

    /**
     * Load Routes Map
     *
     * This method handles looping through the supplied locations
     * and then tries to load the JSON, storing it in an array.
     *
     * @returns {Promise}
     *
     */
    loadRoutesMap() {
        var promises = [];
        var finalRoutes = [];

        return new Promise((resolve, reject) => {
            for (let i = 0; i < this._routeLocations.length; i++) {
                let pointer = this._routeLocations[i];

                if (pointer) {
                    promises.push(this.loadRoute(pointer));
                }
            }

            Promise.all(promises).then(values => {
                for (let i = 0, len = values.length; i < len; i++) {
                    let pointer = JSON.parse(values[i]);

                    if (pointer.length) {
                        pointer.forEach(obj => {
                            finalRoutes.push(obj);
                        });
                    }
                }

                this._loadedRoutes = finalRoutes;

                resolve(finalRoutes);
            });
        });
    }
    
    /**
     * Load Route
     * 
     * Loads a supplied route file and 
     * returns a promise
     * 
     * @param {any} file The path and file to load
     * @returns {Promise} Promise contains the file contents
     * 
     */
    loadRoute(file) {
        return this.loader.loadText('../../../' + file);
    }

}

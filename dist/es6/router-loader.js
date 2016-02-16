import {Loader} from 'aurelia-loader';
import {Router} from 'aurelia-router';

import 'core-js';

export class RouterLoader {
    container = null;
    router = null;

    _routeLocations = [];
    _loadedRoutes = [];

    /**
     * Register Container
     * Passed in DI container reference
     *
     * @param container {any}
     * @returns void
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
     * @param config {any}
     *
     */
    loadRoutes(config) {
        return new Promise((resolve, reject) => {
            this.loadRoutesMap().then(routes => {
                this.router.configure(c => {
                    if (config) {
                        Object.merge(c, config);
                    }

                    c.map(routes);
                });

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
     * @param routes {array}
     * @returns void
     *
     */
    defineRoutes(routes) {
        this._routeLocations = routes;
    }

    /**
     * Load Routes Map
     *
     * This method handles looping through the supplied locations
     * and then tries to load the JSON, storing it in an array.
     *
     * @returns Promise
     *
     */
    loadRoutesMap() {
        var promises = [];
        var finalRoutes = [];

        return new Promise((resolve, reject) => {
            for (let i = 0; i < this._routeLocations.length; i++) {
                let pointer = this._routeLocations[i];

                if (pointer) {
                    promises.push(this.loader.loadText(pointer));
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

}

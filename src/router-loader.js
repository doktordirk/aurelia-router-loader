import {Router} from 'aurelia-router';
import 'core-js';

export class RouterLoader {
    container = null;
    router = null;
    
    _routeLocations = [];
    _loadedRoutes = {};
    
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
                });
                resolve();
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
        return new Promise((resolve, reject) => {
            let finalRoutes = [];
            
            for (let i = 0; i < this._routeLocations.length; i++) {
                let pointer = this._routeLocations[i];
                
                if (pointer) {
                    this.require(pointer).then(routes => {
                       if (routes) {
                           finalRoutes.push(routes);
                       } 
                    }).catch(e => {
                        throw new Error(e);
                    });
                }
            }
            
            this._loadedRoutes = finalRoutes;  
            resolve(finalRoutes);
        });
    }
    
    /**
     * Require
     * 
     * Performs an XMLHttpRequest and fetches a local
     * file from the local file system.
     * 
     * @param what {any}
     * @returns Promise
     * 
     */
    require(what) {
        return new Promise((resolve, reject) => {
            let xmlhttp = new XMLHttpRequest();
            
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) { 
                    resolve(xmlhttp.responseText); 
                } else {
                    reject(new Error('Could not load local file.'));
                }
            }
            
            xmlhttp.open('GET', what, true);
            xmlhttp.send(null); 
        });
    }

}
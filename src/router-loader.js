import {Router} from 'aurelia-router';

export class RouterLoader {
    container = null;
    router = null;
    
    _routeLocations = [];
    _loadedJson = {};
    
    /**
     * Register Container
     * Passed in DI container reference
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
     */
    loadRoutes(config) {
        return new Promise((resolve, reject) => {
            this.loadJsonMap().then(routes => {
                this.router.configure(c => {
                    if (config) {
                        if (config.title) {
                            c.title = config.title;
                        }
                        
                        if (config.options.pushState) {
                            c.options.pushState = config.options.pushState;
                        }
                        
                        if (config.options.root) {
                            c.options.root = config.options.root;
                        }
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
     * Load Json Map
     * 
     * This method handles looping through the supplied locations
     * and then tries to load the JSON, storing it in an array.
     * 
     */
    loadJsonMap() {
        return new Promise((resolve, reject) => {
            let finalRoutes = [];
            
            for (let i = 0; i < this._routeLocations.length; i++) {
                let pointer = this._routeLocations[i];
                
                if (pointer) {
                    var loadedRoutes = require(pointer);
                    
                    if (loadedRoutes) {
                        finalRoutes.push(loadedRoutes);
                    }
                }
            }
            
            this._loadedJson = finalRoutes;  
            resolve(finalRoutes);
        });
    }

}
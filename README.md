# Aurelia Router Loader
Author routes in your Aurelia applications using JSON files.

## How to use it
Like you would any other plugin. Simply include it and then supply the location of your route files. The following assumes you have a ``routes`` folder in your root application directory (one up from `src`).

**IMPORTANT NOTE:** Due to a limitation with plugins and Aurelia, you need to define a default route. You can't have all of your routes in a JSON file. The first route your application will hit should be defined the regular way.

``` javascript
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-router-loader', config => {
            config.defineRoutes([
                '/routes/main.json',
                '/routes/admin.json' 
            ]);
        });
        
    aurelia.start().then(a => a.setRoot());
}
```

Please ensure your router files are in proper JSON format:

```json
[
      { 
          "route": "users",         
          "name": "users",        
          "moduleId": "users",        
          "nav": true, 
          "title": "Github Users" 
      },
      { 
          "route": "child-router",  
          "name": "child-router", 
          "moduleId": "child-router", 
          "nav": true, 
          "title": "Child Router" 
      }
]
```
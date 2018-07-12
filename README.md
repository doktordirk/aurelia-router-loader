# Aurelia Router Loader
Author routes in your Aurelia applications using JSON files.

## How to use it
Like you would any other plugin. Simply include it and then supply the location of your route files. The following assumes you have a ``routes`` folder in your root application directory (one up from `src`).


``` javascript
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-router-loader', config => {
            return config.defineRoutes([
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
          "route": "",         
          "name": "home",        
          "moduleId": "welcome",        
          "nav": true, 
          "title": "Welcome" 
      },
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
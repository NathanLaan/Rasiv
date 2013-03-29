//
// Based on:
//
// http://coenraets.org/blog/2012/01/backbone-js-lessons-learned-and-improved-sample-app
//
underloader = {

    // Hash of preloaded templates for the app
    templates: {},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates: function (rootPath, fileNames, callback) {
        var that = this;
        $.each(fileNames, function (i, v) {
            console.log('--underloader.loadTemplates()-- LOADING: ' + rootPath + v);
            $.get(rootPath + v, function (data) {
                console.log('--underloader.loadTemplates()-- DATA: ' + data + ' --FOR: ' + name);
                that.templates[name] = data;
            });
        });

        callback();
    },

    // Get template by name from hash of preloaded templates
    get: function (name) {
        console.log('--underloader.get()-- GET: ' + name);
        return this.templates[name];
    }

};
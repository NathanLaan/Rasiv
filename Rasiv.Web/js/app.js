var App = Ember.Application.create();

Ember.LOG_BINDINGS = true;

App.ApplicationView = Ember.View.extend({
    templateName: 'application'
});
App.ApplicationController = Ember.Controller.extend();

App.AllContributorsController = Ember.ArrayController.extend();
App.AllContributorsView = Ember.View.extend({
    templateName: 'contributors'
});

App.Router = Ember.Router.extend({
    enableLogging: true,
    root: Ember.Route.extend({
        index: Ember.Route.extend({
            route: '/',
            connectOutlets: function (router) {
                console.log('INDEX');
                router.get('applicationController').connectOutlet('allContributors', [{ login: 'wycats' }, { login: 'tomdale'}]);
            }
        })
    })
});




//RasivApp.IndexController = Ember.Controller.extend({
//    appHeader: "HeaderText",
//    appBody: "BodyText"
//});


//RasivApp.Router.map(function () {
//    this.route('about');
//});

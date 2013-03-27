var RasivApp = Ember.Application.create();


RasivApp.IndexController = Ember.Controller.extend({
    appHeader: "HeaderText",
    appBody: "BodyText"
});


RasivApp.Router.map(function () {
    this.route('about');
});

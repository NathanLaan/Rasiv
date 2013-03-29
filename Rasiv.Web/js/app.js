$(function () {



    RasivFeedModel = Backbone.Model.extend({
        initialize: function () {
            console.log('RasivAppModel.initialize()');
        },
        addFeed: function (f) {
            console.log("RasivAppModel.addFeed(): " + f);
        }
    });

    AddFeedView = Backbone.View.extend({
        initialize: function () {
            console.log('addFeedView.initialize()');
            this.renderView();
        },
        renderView: function () {
            //Pass variables in using Underscore.js Template
            var variables = { addFeedLabel: "Add Feed" };
            // Compile the template using underscore
            var template = _.template($("#addFeedTemplate").html(), variables);
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
        },
        events: {
            "click input[type=button]": "addFeed_EventHandler"
        },
        addFeed_EventHandler: function (event) {
            // event.currentTarget
            rfm.addFeed($("#addFeed_URL").val());
        }
    });

    var rfm = new RasivFeedModel();





    var AppRouter = Backbone.Router.extend({
        routes: {
            "add": "addRoute",
            "*actions": "defaultRoute" // matches http://rasiv.com/#anything-here
        }
    });
    // Initiate the router
    var RasivAppRouter = new AppRouter;

    RasivAppRouter.on('route:defaultRoute', function (actions) {
        console.log('ACTIONS: ' + actions);
    });

    RasivAppRouter.on('route:addRoute', function (id) {
        console.log('route:addRoute--1');
        var afv = new AddFeedView({ el: $("#pageContent") });
        afv.initialize();
        console.log('route:addRoute--2');
    });

    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();




});
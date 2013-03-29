﻿$(function () {

    var addFeedTemplate_name = 'addFeedTemplate.html';

    //
    // load templates
    //
    underloader.loadTemplates('/jstemps/', [addFeedTemplate_name], function () {
        //app = new AppRouter();
        //Backbone.history.start();
    });

    RasivFeedModel = Backbone.Model.extend({
        initialize: function () {
            console.log('--RasivAppModel.initialize()--');
        },
        addFeed: function (f) {
            console.log("RasivAppModel.addFeed(): " + f);
        }
    });

    AddFeedView = Backbone.View.extend({
        initialize: function () {
            console.log('--addFeedView.initialize()--');
            this.renderView();
        },
        renderView: function () {

            var templateContent = underloader.get(addFeedTemplate_name);

            console.log('--addFeedView.renderView()--');
            console.log(underloader);
            console.log(addFeedTemplate_name);
            console.log(templateContent);

            //Pass variables in using Underscore.js Template
            var variables = { addFeedLabel: "Add Feed" };
            // Compile the template using underscore
            /*
            var template = _.template($("#addFeedTemplate").html(), variables);
            /*/
            var template = _.template(underloader.get(addFeedTemplate_name), variables);
            //*/
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

    ViewFeedView = Backbone.View.extend({
        initialize: function () {
            console.log('viewFeedView.initialize()');
            this.renderView();
        },
        renderView: function () {
            //Pass variables in using Underscore.js Template
            var variables = { feedLabel: "--FEED--TITLE--" };
            // Compile the template using underscore
            var template = _.template($("#viewFeedTemplate").html(), variables);
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
        }
    });

    var rfm = new RasivFeedModel();





    var AppRouter = Backbone.Router.extend({
        routes: {
            "feed/:id": "viewRoute",
            "add": "addRoute",
            "*actions": "defaultRoute" // matches http://rasiv.com/#anything-here
        },
        showView: function (selector, view) {
            if (this.currentView)
                this.currentView.close();
            $(selector).html(view.render().el);
            this.currentView = view;
            return view;
        }
    });
    // Initiate the router
    var RasivAppRouter = new AppRouter;

    RasivAppRouter.on('route:defaultRoute', function (actions) {
        console.log('ACTIONS: ' + actions);
    });

    RasivAppRouter.on('route:viewRoute', function (id) {
        console.log('--route:viewRoute--');
        var v = new ViewFeedView({ el: $("#pageContent") });
        v.initialize();
    });

    RasivAppRouter.on('route:addRoute', function () {
        var v = new AddFeedView({ el: $("#pageContent") });
        v.initialize();
    });

    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();




});
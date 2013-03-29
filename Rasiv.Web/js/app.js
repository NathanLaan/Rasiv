$(function () {

    var addFeedTemplate_name = 'AddFeedTemplate.html';
    var viewFeedTemplate_name = 'ViewFeedTemplate.html';

    //
    // load templates
    //
    underloader.loadTemplates('/jstemps/', [addFeedTemplate_name, viewFeedTemplate_name], function () {

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
                this.renderView();
            },
            renderView: function () {
                var templateContent = underloader.get(addFeedTemplate_name);

                //console.log('^^^^^ addFeedView.renderView()--');
                //console.log(underloader);
                //console.log(addFeedTemplate_name);
                console.log("======= TEMPLATECONTENT1: " + templateContent);

                //Pass variables in using Underscore.js Template
                var variables = { addFeedLabel: "Add Feed TEST2.0" };
                // Compile the template using underscore
                /*
                var template = _.template($("#addFeedTemplate").html(), variables);
                /*/
                //var template = _.template(templateContent, variables);

                var t1 = $("#addFeedTemplate", templateContent);
                var t2 = $("#addFeedTemplate", templateContent).html();
                var t3 = $("#addFeedTemplate", templateContent).prevObject.html();
                console.log("======= t1: " + t1);
                console.log("======= t2: " + t2);
                console.log("======= t3: " + t3);
                console.log(t1);
                var template = _.template(t3, variables);
                console.log("======= TEMPLATECONTENT2: " + template);
                //*/
                // Load the compiled HTML into the Backbone "el"
                this.$el.html(template);

                //$(this.el).html(this.template(this.model.toJSON()));
                //$(this.el).html("TEST: " + template);
                return this;
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



        var RasivAppRouter = Backbone.Router.extend({
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
        var rar = new RasivAppRouter;

        rar.on('route:defaultRoute', function (actions) {
            console.log('ACTIONS: ' + actions);
        });

        rar.on('route:viewRoute', function (id) {
            console.log('--route:viewRoute--');
            var v = new ViewFeedView({ el: $("#pageContent") });
            v.initialize();
        });

        rar.on('route:addRoute', function () {
            //            var v = new AddFeedView({ el: $("#pageContent") });
            //            v.initialize();
            console.log("--route:addRoute--");
            $('#pageContent').html(new AddFeedView().renderView().el);
        });

        // Start Backbone history a necessary step for bookmarkable URL's
        Backbone.history.start();


        console.log(">>>> underloader.loadTemplates()--");
    });













});
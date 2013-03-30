$(function () {

    var addFeedTemplate_name = 'AddFeedTemplate.html';
    var viewFeedTemplate_name = 'ViewFeedTemplate.html';
    var templatesDir = '/jstemplates/';

    //
    // load templates
    //
    underloader.loadTemplates(templatesDir, [addFeedTemplate_name, viewFeedTemplate_name], function () {

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
                var variables = { addFeedLabel: "Add Feed" };
                var template = _.template($("#addFeedTemplate", templateContent).prevObject.html(), variables);
                this.$el.html(template);
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
                this.renderView();
            },
            renderView: function () {
                var templateContent = underloader.get(viewFeedTemplate_name);
                var variables = { feedLabel: "--FEED--TITLE--" };
                var template = _.template($("#viewFeedTemplate", templateContent).prevObject.html(), variables);
                this.$el.html(template);
                return this;
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
            $('#pageContent').html(new ViewFeedView().renderView().el);
        });

        rar.on('route:addRoute', function () {
            console.log("--route:addRoute--");
            $('#pageContent').html(new AddFeedView().renderView().el);
        });

        // required for bookmarkable URLs
        Backbone.history.start();
    });













});
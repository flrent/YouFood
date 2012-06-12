define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {
  var urlTpls = "admin/app/templates/";
  // Create a new module
  var Commandes = namespace.module();

  // Carte extendings
  Commandes.Model = Backbone.Model.extend({ /* ... */ });
  Commandes.Collection = Backbone.Collection.extend({ /* ... */ });
  Commandes.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  Commandes.Views.Accueil = Backbone.View.extend({
    template: urlTpls+"commandes.html",
    el:'.content',
    render: function(done) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();
        $("#toplevelmenu li").removeClass("active");
        $("#toplevelmenu li.commandes").addClass("active");
        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return Commandes;

});

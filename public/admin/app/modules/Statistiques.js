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
  var Statistiques = namespace.module();

  // Carte extendings
  Statistiques.Model = Backbone.Model.extend({ /* ... */ });
  Statistiques.Collection = Backbone.Collection.extend({ /* ... */ });
  Statistiques.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  Statistiques.Views.Accueil = Backbone.View.extend({
    template: urlTpls+"statistiques.html",
    el:'.content',
    render: function(done) {

      if(this.authorize()) {
        var view = this;
        // Fetch the template, render it to the View element and call done.
        namespace.fetchTemplate(this.template, function(tmpl) {
          view.el.innerHTML = tmpl();
          $("#toplevelmenu li").removeClass("active");
          $("#toplevelmenu li.statistiques").addClass("active");
          
          // If a done function is passed, call it with the element
          if (_.isFunction(done)) {
            done(view.el);
          }
          new Statistiques.Views.Produits().render();
        $("#subnavStats li").removeClass("active");
        $("#subnavStats li#statsProduits").addClass("active");
        });
      }
    },
    authorize: function() {
      var isAuthenticated = localStorage.getItem("isAuthenticated");
      if(isAuthenticated=="true") {
        return true;
      }
      else {
        return false;
      }
    }
  });

  Statistiques.Views.Produits = Backbone.View.extend({
    el:'.statsContainer',
    render: function(done) {
        $("#subnavStats li").removeClass("active");
        $("#subnavStats li#statsProduits").addClass("active");
    },
    getStats: function() {
      $(this.el).html("<h3>Statistiques par produits</h3>");
    }
  });

  Statistiques.Views.Serveurs = Backbone.View.extend({
    el:'.statsContainer',
    render: function(done) {
        $("#subnavStats li").removeClass("active");
        $("#subnavStats li#statsServeurs").addClass("active");
    },
    getStats: function() {
      $(this.el).html("<h3>Statistiques par serveurs</h3>");
    }
  });

  // Required, return the module for AMD compliance
  return Statistiques;

});

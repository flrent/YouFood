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
        this.getStats();
    },
    getStats: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: '/GetVievedStats',
        success: function(retour) {
          var html = '<br><h3>Statistiques par produits</h3><br/><table class="table table-bordered"><thead><tr><th>Nombres de vues</th><th>Produit</th></thead><tbody>';
          
          _.each(retour, function(stat) {
              html+='<tr><td>'+stat.count+'</td><td>'+stat.dish.name+'</td></tr>';
          });

          html+="</tbody></table>";
          $(that.el).html($(html));
        },
        dataType: 'json'
      });
    }
  });

  Statistiques.Views.Commandes = Backbone.View.extend({
    el:'.statsContainer',
    render: function(done) {
        $("#subnavStats li").removeClass("active");
        $("#subnavStats li#statsCommandes").addClass("active");

        this.getStats();
    },
    getStats: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: '/GetSelectedStats',
        success: function(retour) {
          var html = '<br><h3>Statistiques par commandes</h3><br/><table class="table table-bordered"><thead><tr><th>Nombres de commandes</th><th>Produit</th></thead><tbody>';
          
          _.each(retour, function(stat) {
              html+='<tr><td>'+stat.count+'</td><td>'+stat.dish.name+'</td></tr>';
          });

          html+="</tbody></table>";
          $(that.el).html($(html));
        },
        dataType: 'json'
      });
    }
  });

  // Required, return the module for AMD compliance
  return Statistiques;

});

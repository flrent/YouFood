define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var Accueil = namespace.module();

  // Accueil extendings
  Accueil.Model = Backbone.Model.extend({ /* ... */ });
  Accueil.Collection = Backbone.Collection.extend({ /* ... */ });
  Accueil.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  Accueil.Views.Accueil = Backbone.View.extend({
    template: "app/templates/accueil.html",
    events:{
      'click #gestionTextes':'showGestionTextes',
      'click #gestionProduits':'showGestionProduits',
      'click #gestionCartes':'showGestionCartes'
    },
    el:'.content',
    render: function(done) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    showGestionTextes: function(event) {
      new Accueil.Views.GestionTextes().render();
    },
    showGestionProduits: function(event) {
      new Accueil.Views.GestionProduits().render();
    },
    showGestionCartes: function(event) {
      new Accueil.Views.GestionCartes().render();
    }
  });


  Accueil.Views.GestionProduits = Backbone.View.extend({
    template: "app/templates/gestioncarte/produits.html",
    el:'.gestionContainer',
    render: function(done) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  Accueil.Views.GestionTextes = Backbone.View.extend({
    template: "app/templates/gestioncarte/textes.html",
    el:'.gestionContainer',
    render: function(done) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  Accueil.Views.GestionCartes = Backbone.View.extend({
    template: "app/templates/gestioncarte/cartes.html",
    el:'.gestionContainer',
    render: function(done) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return Accueil;

});

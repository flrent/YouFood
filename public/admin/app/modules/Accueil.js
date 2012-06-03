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
  var Accueil = namespace.module();

  // Accueil extendings
  Accueil.Model = Backbone.Model.extend({ /* ... */ });
  Accueil.Collection = Backbone.Collection.extend({ /* ... */ });
  Accueil.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  Accueil.Views.Accueil = Backbone.View.extend({
    template: urlTpls+"accueil.html",
    events:{
      'click #navGestion li':'manageLi',
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
          new Accueil.Views.GestionProduits().render();
        }
      });
    },
    manageLi: function(event) {
      $("#navGestion li").removeClass("active");
      $(event.target).parent("li").addClass("active");
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
    template: urlTpls+"gestioncarte/produits.html",
    el:'.gestionContainer',
    events:{
      'click #ajouterProduit':'ajouter'
    },
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
    ajouter: function(event) {
      new Accueil.Views.GestionProduitsAjouter().render();
    }
  });

  Accueil.Views.GestionProduitsAjouter = Backbone.View.extend({
    template: urlTpls+"gestioncarte/ajouterproduit.html",
    el:'.formAjout',
    events:{
      'click #addProduitSubmit':'valider'
    },
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
    valider: function(event){
      event.preventDefault();

      var produit = {
        dish: {
          nom:$("#addProduitNom").val().trim(),
          desc:$("#addProduitDesc").val().trim(),
          photo:$("#addProduitPhoto").val().trim(),
          prix:$("#addProduitPrix").val().trim() 
        }
      };

      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/CreateDish',
        data: produit,
        success: function(retour) {
          console.log(retour);
        },
        dataType: 'json'
      });
    }
  });

  Accueil.Views.GestionTextes = Backbone.View.extend({
    template: urlTpls+"gestioncarte/textes.html",
    el:'.gestionContainer',
    events:{
      'click #ajouterTexte':'ajouter'
    },
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
    ajouter: function(event) {
      new Accueil.Views.GestionTextesAjouter().render();
    }
  });
  Accueil.Views.GestionTextesAjouter = Backbone.View.extend({
    template: urlTpls+"gestioncarte/ajoutertexte.html",
    el:'.formAjout',
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
    template: urlTpls+"gestioncarte/cartes.html",
    el:'.gestionContainer',
    events:{
      'click #ajouterCarte':'ajouter'
    },
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
    ajouter: function(event) {
      new Accueil.Views.GestionCartesAjouter().render();
    }
  });

  Accueil.Views.GestionCartesAjouter = Backbone.View.extend({
    template: urlTpls+"gestioncarte/ajoutercarte.html",
    el:'.formAjout',
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

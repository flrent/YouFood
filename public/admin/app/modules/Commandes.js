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

  Commandes.Views.Validees = Backbone.View.extend({
    template: urlTpls+"commandes/validees.html",
    el:'.commandesContainer',
    render: function(done) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();
        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
        $("#navCommandes li").removeClass("active");
        $("#commandesValideesli").addClass("active");
      });
    },
    getValidatedOrders: function() {

      $.ajax({
        type: 'GET',
        url: '/GetOrders',
        success: function(retour) {
          var html = "<thead><tr><th>Nom</th><th>Description</th><th>Photo</th><th>Prix</th><th>Type</th><th>Modifier</th></tr></thead><tbody>";
          _.each(retour, function(obj){ 
            html+="<tr><td>"+obj.name+"</td><td>"+obj.desc+"</td><td></td><td>"+obj.price+"</td><td>"+typeText[obj.type]+"</td><td>"+'<a class="btn" href="#/EditDish/'+obj._id+'"><i class="icon-pencil"></i></a><a class="btn" href="#/RemoveDish/'+obj._id+'"><i class="icon-remove"></i></a>'+"</td></tr>";
          });
          html+="</tbody>";
          $(that.el).html($(html));
        },
        dataType: 'json'
      });

    }
  });


  Commandes.Views.Validees = Backbone.View.extend({
    template: urlTpls+"commandes/validees.html",
    el:'.commandesContainer',
    render: function(done) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();
        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
        $("#navCommandes li").removeClass("active");
        $("#commandesValideesli").addClass("active");
      });
    }
  });

  // Required, return the module for AMD compliance
  return Commandes;

});

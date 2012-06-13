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
        new Commandes.Views.EnCours().render();
      });
    }
  });




  Commandes.Views.EnCours = Backbone.View.extend({
    el:'.commandesContainer',
    render: function(done) {
      $("#navCommandes li").removeClass("active");
      $("#commandesEnCoursli").addClass("active");
      this.getPendingOrders();
    },
    getPendingOrders: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: '/GetOrdersWaiting',
        success: function() {
          var html = '<h3>Commandes en cours</h3><br/><table class="table table-bordered"><thead><tr><th>Table</th><th>Contenu de la commande</th><th>Valider les commande</th></thead><tbody>';
          var retour = {
              _id:203,
              table:3,
              dishes:[
                {name:"Test", type:"toto",_id:0},
                {name:"Teszxdt", type:"totdezo",_id:0},
                {name:"dezTest", type:"totoezz",_id:0}
              ]
          };
          html+="<tr><td>"+retour.table+'</td><td><ul>';
          _.each(retour.dishes, function(plat) {
              html+='<li>'+plat.name+'</li>';
          });
          html+='</ul></td><td><a href="admin/commandes/preparer/'+retour._id+'" class="btn">Préparer cette commande</a></tr>';

          html+="</tbody>";
          $(that.el).html($(html));
        },
        dataType: 'json'
      });
    }
  });


  Commandes.Views.Preparation = Backbone.View.extend({
    el:'.commandesContainer',
    render: function(done) { 
      $("#navCommandes li").removeClass("active");
      $("#commandesPreparationsli").addClass("active");
      this.getPreparingOrders();
    },
    getPreparingOrders: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: '/GetOrdersInProgress',
        success: function() {
          var html = '<h3>Commandes en préparation</h3><br/><table class="table table-bordered"><thead><tr><th>Table</th><th>Contenu de la commande</th><th>Valider les commande</th></thead><tbody>';
          var retour = {
              _id:203,
              table:3,
              dishes:[
                {name:"Test", type:"toto",_id:0},
                {name:"Teszxdt", type:"totdezo",_id:0},
                {name:"dezTest", type:"totoezz",_id:0}
              ]
          };
          html+="<tr><td>"+retour.table+'</td><td><ul>';
          _.each(retour.dishes, function(plat) {
              html+='<li>'+plat.name+'</li>';
          });
          html+='</ul></td><td><a href="admin/commandes/valider/'+retour._id+'" class="btn">Cette commande est prête</a></td></tr>';

          html+="</tbody>";
          $(that.el).html($(html));
        },
        dataType: 'json'
      });
    }
  });

  Commandes.Views.Validees = Backbone.View.extend({
    el:'.commandesContainer',
    render: function(done) {
      $("#navCommandes li").removeClass("active");
      $("#commandesValideesli").addClass("active");
      this.getValidatedOrders();
    },
    getValidatedOrders: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: '/GetOrdersReady',
        success: function() {
          var html = '<h3>Commandes prêtes</h3><br/><table class="table table-bordered"><thead><tr><th>Table</th><th>Contenu de la commande</th><th>Valider les commande</th></thead><tbody>';
          var retour = {
              _id:203,
              table:3,
              dishes:[
                {name:"Test", type:"toto",_id:0},
                {name:"Teszxdt", type:"totdezo",_id:0},
                {name:"dezTest", type:"totoezz",_id:0}
              ]
          };
          html+="<tr><td>"+retour.table+'</td><td><ul>';
          _.each(retour.dishes, function(plat) {
              html+='<li>'+plat.name+'</li>';
          });
          html+='</ul></td><td><a href="admin/commandes/livrer/'+retour._id+'" class="btn">Livrer cette commande</a></td></tr>';

          html+="</tbody>";
          $(that.el).html($(html));
        },
        dataType: 'json'
      });
    }
  });

  Commandes.Views.Livrees = Backbone.View.extend({
    el:'.commandesContainer',
    render: function(done) {
      $("#navCommandes li").removeClass("active");
      $("#commandesLivreesli").addClass("active");
      this.getDeliveredOrders();
    },
    getDeliveredOrders: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: '/GetDeliveredOrders',
        success: function() {
          var html = '<h3>Commandes livrées</h3><br/><table class="table table-bordered"><thead><tr><th>Table</th><th>Contenu de la commande</th></thead><tbody>';
          var retour = {
              _id:203,
              table:3,
              dishes:[
                {name:"Test", type:"toto",_id:0},
                {name:"Teszxdt", type:"totdezo",_id:0},
                {name:"dezTest", type:"totoezz",_id:0}
              ]
          };
          html+="<tr><td>"+retour.table+'</td><td><ul>';
          _.each(retour.dishes, function(plat) {
              html+='<li>'+plat.name+'</li>';
          });
          html+='</ul></td></tr>';

          html+="</tbody>";
          $(that.el).html($(html));
        },
        dataType: 'json'
      });
    }
  });

  // Required, return the module for AMD compliance
  return Commandes;

});

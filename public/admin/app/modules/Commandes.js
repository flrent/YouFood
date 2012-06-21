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

      if(this.authorize()) {
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
    },
    authorize: function() {
      var isAuthenticated = localStorage.getItem("isAuthenticated");
      if(isAuthenticated=="true") {
        return true;
      }
      else {
        return false;
      }
    },
  });




  Commandes.Views.EnCours = Backbone.View.extend({
    el:'.commandesContainer',
    render: function(done) {
      $("#navCommandes li").removeClass("active");
      $("#commandesEnCoursli").addClass("active");
      this.getPendingOrders();
      Backbone.majBadge();
    },
    getPendingOrders: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: '/GetOrdersWaiting',
        success: function(retour) {
          var html = '<h3>Commandes en cours</h3><br/><table class="table table-bordered"><thead><tr><th>Table</th><th>Contenu de la commande</th><th>Serveur</th><th>Total</th><th>Valider les commande</th></thead><tbody>';

          _.each(retour, function(order) {
              html+="<tr><td>"+order.table+'</td><td><ul>';
              _.each(order.dishes, function(plat) {
                   html+='<li>'+plat.name+'</li>';
               });
              html+='</ul></td><td>'+order.serveurId+'</td><td>'+order.total+'<td><a href="admin/commandes/preparer/'+order._id+'" class="btn btn-warning"><i class="icon-road icon-white"></i> Préparer cette commande</a><a href="admin/commandes/annuler/'+order._id+'" class="btn"><i class="icon-remove"></i> Annuler</a></tr>';
          });
          html+="</tbody></table>";
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
      Backbone.majBadge();
    },
    getPreparingOrders: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: '/GetOrdersInProgress',
        success: function(retour) {
          var html = '<h3>Commandes en préparation</h3><br/><table class="table table-bordered"><thead><tr><th>Table</th><th>Contenu de la commande</th><th>Serveur</th><th>Total</th><th>Valider les commande</th></thead><tbody>';
          _.each(retour, function(order) {
            html+="<tr><td>"+order.table+'</td><td><ul>';
            _.each(order.dishes, function(plat) {
                html+='<li>'+plat.name+'</li>';
            });
            html+='</ul></td><td>'+order.serveurId+'</td><td>'+order.total+'<td><td><a href="admin/commandes/valider/'+order._id+'" class="btn btn-primary"><i class="icon-ok icon-white"></i> Cette commande est prête</a><a href="admin/commandes/annuler/'+order._id+'" class="btn"><i class="icon-remove"></i> Annuler</a></td></tr>';
          });            

          html+="</tbody></table>";
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
        success: function(retour) {
          var html = '<h3>Commandes prêtes</h3><br/><table class="table table-bordered"><thead><tr><th>Table</th><th>Contenu de la commande</th><th>Serveur</th><th>Total</th><th>Valider les commande</th></thead><tbody>';
          _.each(retour, function(order) {
            html+="<tr><td>"+order.table+'</td><td><ul>';
            _.each(order.dishes, function(plat) {
                html+='<li>'+plat.name+'</li>';
            });
            html+='</ul></td><td>'+order.serveurId+'</td><td>'+order.total+'<td><td><a href="admin/commandes/livrer/'+order._id+'" class="btn btn-success"><i class="icon-ok-sign icon-white"></i> Livrer cette commande</a><a href="admin/commandes/annuler/'+order._id+'" class="btn"><i class="icon-remove"></i> Annuler</a></td></tr>';
          });    
          html+="</tbody></table>";
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
        success: function(retour) {
          var html = '<h3>Commandes livrées</h3><br/><table class="table table-bordered"><thead><tr><th>Table</th><th>Contenu de la commande</th><th>Serveur</th><th>Total</th></thead><tbody>';
          _.each(retour, function(order) {
            html+="<tr><td>"+order.table+'</td><td><ul>';
            _.each(order.dishes, function(plat) {
                html+='<li>'+plat.name+'</li>';
            });
            html+='</ul></td><td>'+order.serveurId+'</td><td>'+order.total+'<td></tr>';
          });

          html+="</tbody></table>";
          $(that.el).html($(html));
        },
        dataType: 'json'
      });
    }
  });

  Commandes.Views.Toutes = Backbone.View.extend({
    el:'.commandesContainer',
    render: function(done) {
      $("#navCommandes li").removeClass("active");
      $("#commandesToutesli").addClass("active");
      this.getDeliveredOrders();
    },
    getDeliveredOrders: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: '/GetOrders',
        success: function(retour) {
          var html = '<h3>Toutes les commandes</h3><br/><table class="table table-bordered"><thead><tr><th>Table</th><th>Contenu de la commande</th><th>Serveur</th><th>Statut de la commande</th><th>Date</th><th>Total</th></thead><tbody>';
          
          _.each(retour, function(order) {
            html+="<tr><td>"+order.table+'</td><td><ul>';

            _.each(order.dishes, function(plat) {
                html+='<li>'+plat.name+'</li>';
            });

            html+='</ul></td><td>'+order.serveurId+'</td><td>';
            html+='<button class="btn ';
            if(order.status=="0") { 
              html+='btn-warning">A valider</button>';
            }
            else if(order.status=="1") { 
              html+='btn-primary">A préparer</button>';
            }
            else if(order.status=="2") { 
              html+='btn-success">A livrer</button>';
            }
            else if(order.status=="3") { 
              html+='">Livrée</button>';
            }
            html+='</td><td>'+order.orderTime+'</td><td>'+order.total+'<td></tr>';
          });

          html+="</tbody></table>";
          $(that.el).html($(html));
        },
        dataType: 'json'
      });
    }
  });

  // Required, return the module for AMD compliance
  return Commandes;

});

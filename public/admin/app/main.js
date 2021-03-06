require([
  "namespace",

  // Libs
  "jquery",
  "use!backbone",
  "socketIO",
  "modal",

  // Modules
  "modules/Accueil",
  "modules/Carte",
  "modules/Commandes",
  "modules/Serveurs",
  "modules/Statistiques"
],

function(namespace, $, Backbone, socketIO, modal, Accueil, Carte, Commandes, Serveurs, Statistiques) {
  
  Backbone.socket = io.connect('/');
  $("#softnotif").hide();

  Backbone.majBadge = function() {
    $.ajax({
      type: 'GET',
      url: '/GetOrdersWaiting',
      success: function(retour) {
        $(".badge").html(retour.length);
      }
    });
  };
  Backbone.majBadge();
  Backbone.socket.on('calledWaiter', function (data) {
    $('#notification .ntitle').html("Serveur appelé");
    $('#notification .ncontent').html("La table numéro "+data.table+" a demandé qu'un serveur vienne. Le serveur assigné est "+data.serveurId+".");
    $('#notification').modal();
    console.log(data);
  });
  Backbone.socket.on('newOrder', function (data) {
    $('#softnotif').stop();
    $('#softnotif').hide();
    var content = '<h5>'+"Nouvelle commande !"+"</h5>";
        content+="<p>La table numéro "+data.table+" a passé commande : </p>";

    var liste = "<ul>";
    _.each(data.order.dishes, function(p) {
      liste+='<li>'+p.name+"</li>";
    });
    liste+="</ul>";
    content+=liste;
    $('#softnotif').html(content).fadeIn(500).fadeOut(8000);

    Backbone.majBadge();
  });

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "index": "index",
      "carte":"carte",
      "admin/commandes":"commandes",
      "admin/commandes/toutes":"commandesToutes",
      "admin/commandes/preparation":"commandesPreparation",
      "admin/commandes/validees":"commandesValidees",
      "admin/commandes/livrees":"commandesLivrees",
      "admin/commandes/preparer/:id":"commandesPreparer",
      "admin/commandes/valider/:id":"commandesValider",
      "admin/commandes/livrer/:id":"commandesLivrer",
      "admin/commandes/annuler/:id":"commandesAnnuler",
      "admin/serveurs":"serveurs",
      "admin/serveurs/add":"serveursAdd",
      "admin/statistiques":"statistiques",
      "admin/statistiques/produits":"statsProduits",
      "admin/statistiques/commandes":"statsCommandes",
      "/getDishes":"getDishes",
      "/getComposition":"getComposition",
      "/RemoveDish/:id":'removeDish',
      "/EditDish/:id":'editDish',
      "/RemoveMenu/:id":'removeMenu',
      "/EditMenu/:id":'editMenu',
      '/SetActiveMenu/:id':'setActiveMenu',
      "addDishToMenu/:id":'addDishToMenu',
      "removeDishFromMenu/:idmenu/:iddish":'removeDishFromMenu'
    },
    initialize: function() {
      this.index();
    },
    index: function(hash) {
      var route = this;
      var accueil = new Accueil.Views.Accueil();
      // Attach the accueil to the DOM
      accueil.render(function(el) {
        $("#main").html(el);

        // Fix for hashes in pushState and hash fragment
        if (hash && !route._alreadyTriggered) {
          // Reset to home, pushState support automatically converts hashes
          Backbone.history.navigate("/admin", false);

          // Trigger the default browser behavior
          location.hash = hash;

          // Set an internal flag to stop recursive looping
          route._alreadyTriggered = true;



        }
      });
    },

    commandes: function() {
      new Commandes.Views.Accueil().render();
      Backbone.history.navigate("/admin/commandes", false);
    },
    commandesValidees: function() {
      new Commandes.Views.Validees().render();
    },
    commandesPreparation: function() {
      new Commandes.Views.Preparation().render();
    },
    commandesLivrees: function() {
      new Commandes.Views.Livrees().render();
    },
    commandesToutes: function() {
      new Commandes.Views.Toutes().render();
    },
    commandesPreparer: function(id) {
      
      var that = this;
      $.ajax({
        type: 'POST',
        url: '/SetOrderInProgress',
        data:{
          idOrder:id
        },
        success: function(retour) {
          Backbone.history.navigate("/admin/commandes/preparation", true);
        }
      });
    },
    commandesValider: function(id) {
      var that = this;
      $.ajax({
        type: 'POST',
        url: '/SetOrderReady',
        data:{
          idOrder:id
        },
        success: function(retour) {
          Backbone.history.navigate("/admin/commandes/validees", true);
        }
      });
    },
    commandesAnnuler: function(id) {
      var that = this;
      $.ajax({
        type: 'GET',
        url: '/RemoveOrder/'+id,
        success: function(retour) {
          Backbone.history.navigate("/admin/commandes", true);
        }
      });
    },
    commandesLivrer: function(id) {
      var that = this;
      $.ajax({
        type: 'POST',
        url: '/SetOrderDelivered',
        data:{
          idOrder:id
        },
        success: function(retour) {
          Backbone.history.navigate("/admin/commandes/livrees", true);
        }
      });
    },
    serveurs: function() {
      new Serveurs.Views.Accueil().render();
    },
    serveursAdd: function() {
      new Serveurs.Views.Add().render();
    },
    statistiques: function() {
      new Statistiques.Views.Accueil().render();
    },
    statsCommandes: function() {
      new Statistiques.Views.Commandes().render();
    },
    statsProduits: function() {
      new Statistiques.Views.Produits().render();
    },
    carte: function() {
      new Carte.Views.Accueil().render();
      Backbone.history.navigate("/admin", false);
    },
    getDishes: function(message) {
      $(".formAjout").empty();
      if(message) {
        new Carte.Views.GestionProduits().render(false, message);
      }
      else {
        new Carte.Views.GestionProduits().render();
      }
      Backbone.history.navigate("/admin", false);
    },
    getMenus: function(message) {
      if(message) {
        new Carte.Views.GestionMenus().render(false, message);
      }
      else {
        new Carte.Views.GestionMenus().render();
      }
      Backbone.history.navigate("/admin", false);
    },
    removeDish: function(id) {
      var that = this;
      $.ajax({
        type: 'GET',
        url: '/RemoveDish/'+id,
        success: function(retour) {
          that.getDishes("Suppression réussie.");
          Backbone.history.navigate("/admin", false);
        }
      });
    },
    editDish: function(id) {
      var that = this;
      $(".formAjout").empty();
      $.ajax({
        type: 'GET',
        url: '/GetDish/'+id,
        success: function(retour) {
            new Carte.Views.GestionProduitsAjouter().render(false, {
              name:retour.name,
              img:retour.img,
              _id:retour._id,
              desc:retour.desc,
              price:retour.price  
            });
          Backbone.history.navigate("/admin", false);
        }
      });      
    },
    editMenu: function(id) {
      var that = this;
      $.ajax({
        type: 'GET',
        url: '/GetMenu/'+id,
        success: function(retour) {
            new Carte.Views.GestionMenuAjouter().render(false, retour);
            Backbone.history.navigate("/admin", false);
        }
      });      
    },
    removeMenu: function(id) {
      var that = this;
      $.ajax({
        type: 'GET',
        url: '/RemoveMenu/'+id,
        success: function(retour) {
          that.getMenus(false, "Suppression réussie.");
          Backbone.history.navigate("/admin", false);
        }
      });
    },
    addDishToMenu: function(idmenu) {
      var data = {
        idMenu:idmenu,
        idDish:$("#select"+idmenu).val()
      };

      console.log("Ajout du produit "+data.idDish+" au menu "+idmenu);
      var that = this;

      $.ajax({
        type: 'POST',
        data:data,
        url: '/AddDishToMenu/',
        success: function(retour) {
          that.getComposition("Ajout réussi !");
          Backbone.history.navigate("/admin", false);
        }
      });
    },
    getComposition: function(message) {
      new Carte.Views.GestionCompositionMenus().render(false, message);
    },
    removeDishFromMenu: function(idmenu, iddish) {
      var data = {
        idMenu:idmenu,
        idDish:iddish
      };
      console.log("Remove du produit "+data.idDish+" from menu "+idmenu);
      
      var that = this;
      $.ajax({
        type: 'POST',
        data:data,
        url: '/RemoveDishFromMenu/',
        success: function(retour) {
          Backbone.history.navigate("/admin", false);
          that.getComposition("Suppression réussie !");
        }
      });
    },
    setActiveMenu: function(id) {
      var view=this;
      
        $.ajax({
          type: 'POST',
          data:{
            idMenu:id
          },
          url: '/SetMenuActive',
          success: function(retour) {
            view.getMenus("Menu activé !");
            Backbone.history.navigate("/admin", false);
          }
        });
    }
  });

  // Shorthand the application namespace
  var app = namespace.app;

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

    // Trigger the initial route and enable HTML5 History API support
    Backbone.history.start({ pushState: true });
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning it's relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });

});

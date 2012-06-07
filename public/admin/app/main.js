require([
  "namespace",

  // Libs
  "jquery",
  "use!backbone",

  // Modules
  "modules/Accueil",
  "modules/Carte"
],

function(namespace, $, Backbone, Accueil, Carte) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "index": "index",
      "carte":"carte",
      "/getDishes":"getDishes",
      "/RemoveDish/:id":'removeDish',
      "/EditDish/:id":'editDish',
      "/RemoveMenu/:id":'removeMenu',
      "/EditMenu/:id":'editMenu',
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
          Backbone.history.navigate("", false);

          // Trigger the default browser behavior
          location.hash = hash;

          // Set an internal flag to stop recursive looping
          route._alreadyTriggered = true;
        }
      });
    },
    carte: function() {
      new Carte.Views.Accueil().render();
    },
    getDishes: function(message) {
      $(".formAjout").empty();
      if(message) {
        new Carte.Views.GestionProduits().render(false, message);
      }
      else {
        new Carte.Views.GestionProduits().render();
      }
    },
    getMenus: function(message) {
      if(message) {
        new Carte.Views.GestionMenus().render(false, message);
      }
      else {
        new Carte.Views.GestionMenus().render();
      }
    },
    removeDish: function(id) {
      var that = this;
      $.ajax({
        type: 'GET',
        url: '/RemoveDish/'+id,
        success: function(retour) {
          that.getDishes("Suppression réussie.");
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
        }
      });      
    },
    removeMenu: function(id) {
      var that = this;
      $.ajax({
        type: 'GET',
        url: '/RemoveMenu/'+id,
        success: function(retour) {
          that.getMenus("Suppression réussie.");
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
          alert('ajout réussi');
        }
      });
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
          alert('suppresion réussie');
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

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
  var Serveurs = namespace.module();

  // Carte extendings
  Serveurs.Model = Backbone.Model.extend({ /* ... */ });
  Serveurs.Collection = Backbone.Collection.extend({ /* ... */ });
  Serveurs.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  Serveurs.Views.Accueil = Backbone.View.extend({
    template: urlTpls+"serveurs.html",
    el:'.content',
    render: function(done) {

      if(this.authorize()) {
        var view = this;
        // Fetch the template, render it to the View element and call done.
        namespace.fetchTemplate(this.template, function(tmpl) {
          view.el.innerHTML = tmpl();
          $("#toplevelmenu li").removeClass("active");
          $("#toplevelmenu li.serveurs").addClass("active");
          // If a done function is passed, call it with the element
          if (_.isFunction(done)) {
            done(view.el);
          }
          new Serveurs.Views.Tous().render();
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

  Serveurs.Views.Tous = Backbone.View.extend({
    el:'.serveursContainer',
    render: function(done) {
      $("#navServeurs li").removeClass("active");
      $("#serveursTous").addClass("active");
      this.getTous();
    },
    getTous: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: '/GetWaiters',
        success: function(retour) {
          var html = '<h3>Tous les serveurs</h3><br/><table class="table table-bordered"><thead><tr><th>Nom</th><th>Identifiant</th></thead><tbody>';
          
          _.each(retour, function(serveur) {
              html+='<tr><td>'+serveur.name+'</td><td>'+serveur.identifiant+'</td></tr>';
          });

          html+="</tbody></table>";
          $(that.el).html($(html));
        },
        dataType: 'json'
      });
    }
  });

  Serveurs.Views.Add = Backbone.View.extend({
    el:'.serveursContainer',
    template: urlTpls+"serveurs/add.html",
    events: {
      'click #serveurAddButton':'add'
    },
    render: function(done) {
      this.$el.empty();
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }

        $("#navServeurs li").removeClass("active");
        $("#serveursAdd").addClass("active");
      });
    },
    add: function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      var that = this;

      $.ajax({
        type: 'POST',
        url: '/CreateWaiter',
        data:{
          waiter: {
            name:$("#serveurNom").val(),
            identifiant:$("#serveurIdentifiant").val()            
          }
        },
        success: function() {
          Backbone.history.navigate("/serveurs", true);
        },
        dataType: 'json'
      });
    }
  });

  // Required, return the module for AMD compliance
  return Serveurs;

});

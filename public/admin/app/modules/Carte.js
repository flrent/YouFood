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
  var Carte = namespace.module();

  // Carte extendings
  Carte.Model = Backbone.Model.extend({ /* ... */ });
  Carte.Collection = Backbone.Collection.extend({ /* ... */ });
  Carte.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  Carte.Views.Accueil = Backbone.View.extend({
    template: urlTpls+"carte.html",
    events:{
      'click #navGestion li':'manageLi',
      'click #gestionTextes':'showGestionTextes',
      'click #gestionProduits':'showGestionProduits',
      'click #gestionMenu':'showGestionMenus',
      'click #gestionCompositionL':'showGestionCompositionMenus'
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
        new Carte.Views.GestionProduits().render();
      });
    },
    manageLi: function(event) {
      event.preventDefault();
      $("#navGestion li").removeClass("active");
      $(event.target).parent("li").addClass("active");
    },
    showGestionTextes: function(event) {
      event.preventDefault();
      new Carte.Views.GestionTextes().render();
      event.stopPropagation();
      this.manageLi(event);
    },
    showGestionProduits: function(event) {
      event.preventDefault();
      new Carte.Views.GestionProduits().render();
      event.stopPropagation();
      this.manageLi(event);
    },
    showGestionMenus: function(event) {
      event.preventDefault();
      new Carte.Views.GestionMenus().render();
      event.stopPropagation();
      this.manageLi(event);
    },
    showGestionCompositionMenus: function(event) {
      event.preventDefault();
      new Carte.Views.GestionCompositionMenus().render();
      event.stopPropagation();
      this.manageLi(event);
    }
  });


  Carte.Views.GestionProduits = Backbone.View.extend({
    template: urlTpls+"gestioncarte/produits.html",
    el:'.gestionContainer',
    el2:'#tableProduits',
    el3:'.formAjout',
    events:{
      'click #ajouterProduit':'ajouter'
    },
    render: function(done, message) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
        if(message) $(view.el3).html($('<div class="alert alert-success">'+message+'</div>'));

          view.fetch();
      });
    },
    fetch: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/GetDishes',
        success: function(retour) {
          var html = "<thead><tr><th>#</th><th>Nom</th><th>Description</th><th>Photo</th><th>Prix</th><th>Modifier</th></tr></thead><tbody>";
          _.each(retour, function(obj){ 
            html+="<tr><td>"+obj._id.slice(0,2)+"...</td><td>"+obj.nom+"</td><td>"+obj.desc+"</td><td></td><td>"+obj.prix+"</td><td>"+'<a class="btn" href="#/EditDish/'+obj._id+'"><i class="icon-pencil"></i></a><a class="btn" href="#/RemoveDish/'+obj._id+'"><i class="icon-remove"></i></a>'+"</td></tr>";
          });
          html+="</tbody>";
          $(that.el2).html($(html));
        },
        dataType: 'json'
      });
    },
    ajouter: function(event) {
      new Carte.Views.GestionProduitsAjouter().render();
    }
  });

  Carte.Views.GestionProduitsAjouter = Backbone.View.extend({
    template: urlTpls+"gestioncarte/ajouterproduit.html",
    el:'.formAjout',
    events:{
      'click #addProduitSubmit':'valider',
      'click #cancelProduit':'cancelProduit'
    },
    isGone:false,
    cancelProduit: function(event) {
      event.preventDefault();
      new Carte.Views.GestionProduits().render();
    },
    render: function(done, produit) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        if(produit) {
          view.el.innerHTML = tmpl(produit);
        }
        else {
          view.el.innerHTML = tmpl({nom:"",photo:"",_id:0,desc:"",prix:""});
        }

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    valider: function(event){
      var that = this;

      if(!this.isGone) {
        this.isGone=true;
        var produit = {
          dish: {
            nom:$("#addProduitNom").val().trim(),
            desc:$("#addProduitDesc").val().trim(),
            //photo:$("#addProduitPhoto").val().trim(),
            photo:'http://media.paperblog.fr/i/323/3231250/32-bons-petits-plats-coupe-monde-13-L-8.jpeg',
            prix:$("#addProduitPrix").val().trim() 
          }
        };

        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/CreateDish',
          data: produit,
          success: function(retour) {
            console.log(retour);
            that.isGone=false;
            new Carte.Views.GestionProduits().render(false, 'Le produit "'+retour.nom+'"a bien été ajouté. ');
          },
          dataType: 'json'
        });
      }
    }
  });

  Carte.Views.GestionTextes = Backbone.View.extend({
    template: urlTpls+"gestioncarte/textes.html",
    el:'.gestionContainer',
    events:{
      'click #ajouterTexte':'ajouter'
    },
    render: function(done) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl({texte:'coucou'});

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    ajouter: function(event) {
      new Carte.Views.GestionTextesAjouter().render();
    }
  });






  Carte.Views.GestionTextesAjouter = Backbone.View.extend({
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

  Carte.Views.GestionMenus = Backbone.View.extend({
    template: urlTpls+"gestioncarte/menus.html",
    el:'.gestionContainer',
    el1:'.formAjout',
    el2:'#tableMenus',
    el3:'#addMenuDishes',
    events:{
      'click #ajouterCarte':'ajouter'
    },
    render: function(done, message) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
        if(message) $(view.el1).html($('<div class="alert alert-success">'+message+'</div>'));

        view.fetch();
      });
    },
    ajouter: function(event) {
      new Carte.Views.GestionMenuAjouter().render();
    },
    fetch: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/GetMenus',
        success: function(retour) {
          var html = "<thead><tr><th>#</th><th>Nom</th><th>Modifier</th></tr></thead><tbody>";
          _.each(retour, function(obj){ 
            html+="<tr><td>"+obj._id.slice(0,2)+"...</td><td>"+obj.nom+"</td><td>"+'<a class="btn" href="#/EditMenu/'+obj._id+'"><i class="icon-pencil"></i></a><a class="btn" href="#/RemoveMenu/'+obj._id+'"><i class="icon-remove"></i></a>'+"</td></tr>";
          });
          html+="</tbody>";
          $(that.el2).html($(html));
        },
        dataType: 'json'
      });
    }
  });

  Carte.Views.GestionMenuAjouter = Backbone.View.extend({
    template: urlTpls+"gestioncarte/ajoutermenu.html",
    el:'.formAjout',
    events:{
      'click #addMenuSubmit':'ajouter',
      'click #cancelMenu':'cancelMenu'
    },
    render: function(done, menu) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        if(menu) {
          view.el.innerHTML = tmpl(menu);
        }
        else {
          view.el.innerHTML = tmpl({nom:""});
        }

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    cancelMenu: function(event) {
      event.preventDefault();
      new Carte.Views.GestionMenus().render();
    },
    ajouter: function(event){
      event.preventDefault();
      var that = this;

      var menu = {
        menu: {
          nom:$("#addMenuNom").val().trim()
        }
      };

      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/CreateMenu',
        data: menu,
        success: function(retour) {
          console.log(retour);
          new Carte.Views.GestionMenus().render(false, 'Le menu "'+retour.nom+'"a bien été ajouté. ');
        },
        dataType: 'json'
      });
    }
  });



  Carte.Views.GestionCompositionMenus = Backbone.View.extend({
    template: urlTpls+"gestioncarte/composition.html",
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
        view.getMenus();
      });
    },
    getMenus: function() {
      var view = this;
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/GetDishes',
        success: function(dishes) {
          var options="";
          _.each(dishes, function(p) {
            options+='<option value="'+p._id+'">'+p.nom+"</option>";
          });
          $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/GetMenus',
            success: function(menus) {
              var html = '';
              _.each(menus, function(m) {
                html+="<h2>"+m.nom+"</h2>";
                html+='<select id="select'+m._id+'">'+options+'</select>';
                html+='<button class="btn">Ajouter ce produit au menu</button>';
              });
              html+='';
              $("#compositionMenus").html(html);
            },
            dataType: 'json'
          });
        },
        dataType: 'json'
      });
    }
  });






  // Required, return the module for AMD compliance
  return Carte;

});

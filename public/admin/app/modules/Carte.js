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
      'click #gestionCompositionL':'showGestionCompositionMenus',
      'click #seDeconnecter':'logOut'
    },
    el:'.content',
    render: function(done) {
      if(this.authorize()) {
        this.$el.empty();

        var view = this;
        // Fetch the template, render it to the View element and call done.
        namespace.fetchTemplate(this.template, function(tmpl) {
          view.el.innerHTML = tmpl();
          $("#toplevelmenu li").removeClass("active");
          $("#toplevelmenu li.contenu").addClass("active");

          // If a done function is passed, call it with the element
          if (_.isFunction(done)) {
            done(view.el);  
          }
          new Carte.Views.GestionProduits().render();
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
    logOut: function() {
      localStorage.removeItem("email");
      localStorage.removeItem("pass");
      localStorage.removeItem("isAuthenticated");
      Backbone.history.navigate("/admin/", true);
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
      event.stopPropagation();
      new Carte.Views.GestionCompositionMenus().render();
      this.manageLi(event);
    }
  });


  Carte.Views.GestionProduits = Backbone.View.extend({
    template: urlTpls+"gestioncarte/produits.html",
    el:'.gestionContainer',
    el2:'#tableProduits',
    el3:'.formAjout',
    render: function(done, message) {
      this.$el.empty();
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
        if(message) $(view.el3).html($('<div class="alert alert-success">'+message+'</div>'));

        $("#ajouterProduit").bind("click", view.ajouter);
          view.fetch();
      });
    },
    fetch: function() {
      var that = this;

      $.ajax({
        type: 'GET',
        url: '/GetDishes',
        success: function(retour) {
          var typeText = ["Entrée","Plat","Dessert","Boisson"];
          var html = "<thead><tr><th>Nom</th><th>Description</th><th>Photo</th><th>Prix</th><th>Type</th><th>Modifier</th></tr></thead><tbody>";
          _.each(retour, function(obj){ 
            html+="<tr><td>"+obj.name+"</td><td>"+obj.desc+"</td><td></td><td>"+obj.price+"</td><td>"+typeText[obj.type]+"</td><td>"+'<a class="btn" href="#/EditDish/'+obj._id+'"><i class="icon-pencil"></i></a><a class="btn" href="#/RemoveDish/'+obj._id+'"><i class="icon-remove"></i></a>'+"</td></tr>";
          });
          html+="</tbody>";
          $(that.el2).html($(html));
        },
        dataType: 'json'
      });
    },
    ajouter: function(event) {
      event.preventDefault();
      event.stopPropagation();
      $("#ajouterProduit").unbind("click");
      new Carte.Views.GestionProduitsAjouter();
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
    initialize: function() {
      this.render();
    },
    render: function(done, produit) {
      this.$el.empty();
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        if(produit) {
          view.el.innerHTML = tmpl(produit);
        }
        else {
          view.el.innerHTML = tmpl({name:"",img:"",_id:0,desc:"",price:"", type:0});
        }

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
          $("#addProduitSubmit").bind("click", view.valider)
        }
      });
    },
    valider: function(event){
      event.stopPropagation();

      var that = this;

      if(!this.isGone) {
        this.isGone=true;
        var produit = {
          dish: {
            _id:$("#addProduitId").val().trim(),
            name:$("#addProduitNom").val().trim(),
            desc:$("#addProduitDesc").val().trim(),
            img:$("#addProduitPhoto").val().trim(),
            type:$("#addProduitType").val().trim(),
            price:$("#addProduitPrix").val().trim() 
          }
        };
        if(produit.dish._id==0) {
          produit.dish._id=undefined;
          var lien = 'CreateDish';
          var verbe=" ajouté";
        }
        else {
          var lien= 'UpdateDish';
          var verbe ="modifié";
        }
        $.ajax({
          type: 'POST',
          url: '/'+lien,
          data: produit,
          success: function(retour) {
            that.isGone=false;
            new Carte.Views.GestionProduits().render(false, 'Le produit "'+retour.name+'"a bien été '+verbe+'. ');
            $("#addProduitSubmit").unbind("click");
          },
          dataType: 'json'
        });
      }
    }
  });

  Carte.Views.GestionTextes = Backbone.View.extend({
    template: urlTpls+"gestioncarte/textes.html",
    el:'.gestionContainer',
    render: function(done) {
      this.$el.empty();
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        
        $.ajax({
          type: 'GET',
          url: '/GetRestaurantInfos',
          success: function(retour) {
            view.el.innerHTML = tmpl(retour);
            if (_.isFunction(done)) {
              done(view.el);
            }
            $("#infosRestoMaj").bind("click", view.update);
          },
          dataType: 'json'
        });
      });
    },
    update: function(event) {
      event.preventDefault();
      var view = this;

      $.ajax({
          type: 'POST',
          data: {
            infos:{
              name:$("#infosRestoTitre").val(),
              id:$("#infosRestoId").val(),
              desc:$("#infosRestoDesc").val(),
              img:""
            }
          },
          url: '/UpdateRestaurantInfos',
          success: function(retour) {
            $("#infosRestoMaj").unbind("click");
            alert(JSON.stringify(retour));
          },
          dataType: 'json'
        });
    }
  });


  Carte.Views.GestionMenus = Backbone.View.extend({
    template: urlTpls+"gestioncarte/menus.html",
    el:'.gestionContainer',
    el1:'.formAjout',
    el2:'#tableMenus',
    el3:'#addMenuDishes',
    render: function(done, message) {
      this.$el.empty();
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
        if(message) $(view.el1).html($('<div class="alert alert-success">'+message+'</div>'));
        $("#ajouterCarte").bind("click", view.ajouter);
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
        url: '/GetMenus',
        success: function(retour) {
          var html = "<thead><tr><th>Nom</th><th>Etat</th><th>Activer le menu</th><th>Modifier</th></tr></thead><tbody>";
          var types = ['Inactif','Actif'];

          _.each(retour, function(obj){ 
            if(obj.active==1) var activeOrNotBtn = "<td></td>";
            else var activeOrNotBtn = '<td><a href="#/SetActiveMenu/'+obj._id+'" class="btn"><i class="icon-ok-sign"></i>Activer ce menu</a></td>';
            html+="<tr><td>"+obj.name+'</td><td>'+types[obj.active]+'</td>'+activeOrNotBtn+'<td>'+'<a class="btn" href="#/EditMenu/'+obj._id+'"><i class="icon-pencil"></i></a><a class="btn" href="#/RemoveMenu/'+obj._id+'"><i class="icon-remove"></i></a></td></tr>';
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
      this.$el.empty();
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        if(menu) {
          view.el.innerHTML = tmpl(menu);
        }
        else {
          view.el.innerHTML = tmpl({name:"", _id:0});
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
          _id:$("#addMenuId").val().trim(),
          name:$("#addMenuNom").val().trim(),
          active:0
        }
      };

      if(menu.menu._id==0) {
        menu.menu._id=undefined;
        var lien = 'CreateMenu';
        var verbe=" ajouté";
      }
      else {
        var lien= 'UpdateMenu';
        var verbe ="modifié";
      }

      $.ajax({
        type: 'POST',
        url: '/'+lien,
        data: menu,
        success: function(retour) {
          console.log(retour);
           $(".gestionContainer").empty();
          new Carte.Views.GestionMenus().render(false, 'Le menu "'+retour.name+'"a bien été ajouté. ');
        },
        dataType: 'json'
      });
    }
  });



  Carte.Views.GestionCompositionMenus = Backbone.View.extend({
    template: urlTpls+"gestioncarte/composition.html",
    el:'.gestionContainer',
    el2:'#compositionMenus',
    render: function(done, message) {
      this.$el.empty();
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
        view.getMenus();
        if(message) $("#compositionStatus").html($('<div class="alert alert-success">'+message+'</div>'));
      });
    },
    getMenus: function() {
      $(this.el2).empty();
      var view = this;
      $.ajax({
        type: 'GET',
        url: '/GetDishes',
        success: function(dishes) {
          var options="";
          _.each(dishes, function(p) {
            options+='<option value="'+p._id+'">'+p.name+"</option>";
          });
          $.ajax({
            type: 'GET',
            url: '/GetMenusWithDishes',
            success: function(menus) {
              _.each(menus, function(m) {
                var menuSelect = '', menuDishes='';
                $("#compositionMenus").append('<div class="unecompo"><h2>Menu "'+m.name+'"</h2>');


                //m.dishes= [{_id:0,name:"Coucou",desc:"salut",img:"test",price:10},{_id:0,name:"Coucou",desc:"salut",img:"test",price:10},{_id:0,name:"Coucou",desc:"salut",img:"test",price:10}];
                menuDishes = '<table class="table table-bordered"><thead><tr><th>Nom</th><th>Modifier</th></tr></thead><tbody>';

                _.each(m.dishes, function(d) {
                    menuDishes+="<tr><td>"+d.name+"</td><td>"+'<a class="btn" href="/removeDishFromMenu/'+m._id+'/'+d._id+'"><i class="icon-remove"></i></a>'+"</td></tr>";
                });

                menuDishes+="</tbody></table>";
                $("#compositionMenus").append(menuDishes);




                menuSelect+='<a class="btn pull-right" href="addDishToMenu/'+m._id+'">Ajouter ce produit au menu '+m.name+'</a>';
                menuSelect+='<select id="select'+m._id+'" class="pull-right">'+options+'</select></div><div class="clear"></div>';

                


                $("#compositionMenus").append(menuSelect);


              });
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

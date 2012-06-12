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

  // Carte extendings
  Accueil.Model = Backbone.Model.extend({ /* ... */ });
  Accueil.Collection = Backbone.Collection.extend({ /* ... */ });
  Accueil.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  Accueil.Views.Accueil = Backbone.View.extend({
    template: urlTpls+"accueil.html",
    el:'.content',
    events: {
      'click #loginSubmit':'login'
    },
    render: function(done) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();
        $("#toplevelmenu li").removeClass("active");
        $("#toplevelmenu li.accueil").addClass("active");

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    login: function(event) {
      event.preventDefault();

      var account = {
        email:$("#loginEmail").val(),
        pass:$("#loginPassword").val()
      };
      localStorage.setItem("email", account.email);
      localStorage.setItem("pass", account.pass);
      localStorage.setItem("isAuthenticated", true);
      Backbone.history.navigate("/carte", true);

    }
  });

  // Required, return the module for AMD compliance
  return Accueil;

});

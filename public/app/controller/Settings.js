Ext.define('YouFood.controller.Settings', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            settingsPanel:'#settingspanel',
            numeroTableChamp: '#numeroTableChamp',
            serveurIdentifiantChamp: '#serveurIdentifiantChamp',
            numeroTablePanel: '#numeroTablePanel',
            identifiantServeurPanel: '#identifiantServeurPanel',
            settingsPassword:'#settingsPassword'
        },
        control: {
            "#settingsEntrer":{
                tap: 'doLogin'
            },
            "#logOutButton": {
                tap:'doLogOut'
            },
            "#changeButton": {
                tap:'doBothChanges'
            }
        }
    },
    doLogin: function() {
        var pass = this.getSettingsPassword().getValue();
        if(pass=="modifierreglages") {
            this.getSettingsPanel().setActiveItem(1);            
        }
    },
    doBothChanges: function() {
        this.changeTable();
        this.changeServeur();
        this.doLogOut();
    },
    doLogOut: function() {
        this.getSettingsPassword().setValue("")
        this.getSettingsPanel().setActiveItem(0);
    },
    changeTable: function() {
        var t = this.getNumeroTableChamp().getValue();
        if(!t) t = 0;

        this.getSettingsPanel().numeroTable = t;
        localStorage.setItem("table", t);
        this.getNumeroTablePanel().setData({table:t});
    },
    changeServeur: function() {
        var s = this.getServeurIdentifiantChamp().getValue();
        if(!s) s = "aucun";
        this.getSettingsPanel().identifiantServeur = s;
        localStorage.setItem("serveurId", s);
        this.getIdentifiantServeurPanel().setData({serveur:s});
    },
    launch: function() {

        var tls = localStorage.getItem("table");
        var sls = localStorage.getItem("serveurId");
        if(!tls) tls = 2;
        if(!sls) sls = "aucun";

        localStorage.setItem("table", tls);
        localStorage.setItem("serveurId", sls);
        
        this.getIdentifiantServeurPanel().setData({serveur:sls});
        this.getNumeroTablePanel().setData({table:tls});
    },
    changeButton: function() {
        this.changeTable();
        this.changeServeur();
        this.doLogOut();
    }
});
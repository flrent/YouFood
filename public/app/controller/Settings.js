Ext.define('YouFood.controller.Settings', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            settingsPanel:'#settingspanel',
            numeroTableChamp: '#numeroTableChamp',
            serveurIdentifiantChamp: '#serveurIdentifiantChamp',
            numeroTablePanel: '#numeroTablePanel',
            identifiantServeurPanel: '#identifiantServeurPanel'
        },
        control: {
            "#settingsEntrer":{
                tap: 'doLogin'
            },
            "#logOutButton": {
                tap:'doLogOut'
            },
            "#changeButton": {
                tap:'doLogOut'
            }
        }
    },
    doLogin: function() {
        this.getSettingsPanel().setActiveItem(1);
    },
    doLogOut: function() {
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
        if(!s) s = 0;
        this.getSettingsPanel().identifiantServeur = s;
        this.getIdentifiantServeurPanel().setData({serveur:s});
    },
    launch: function() {
        this.getIdentifiantServeurPanel().setData({serveur:"Jean"});
        this.getNumeroTablePanel().setData({table:2});
        localStorage.setItem("table", t);
    },
    changeButton: function() {
        this.changeTable();
        this.changeServeur();
        this.doLogOut();
    }
});
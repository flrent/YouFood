Ext.define('YouFood.controller.Table', {
    extend: 'Ext.app.Controller',
    requires:['Ext.util.JSONP'],
    config: {
        refs: {
            table:'#tabledataview',
            buttonCommande:'#validerCommande',
            buttonModifier:'#modifierCommande',
            tabs:'#mainYouFoodTabBar',
            tablePanel:'#tablepanel'
        },
        control: {
            '#modifierCommande': {
                tap: 'modifier'
            },
            '#validerCommande': {
                tap: 'validerCommande'
            },
            '#appelerServeur': {
                tap: 'callWaiter'
            },
            '#tabledataview': {
                itemtap: 'removeDish',
                updatedata: 'majBadge'
            }
        }
    },
    callWaiter: function() {
        Ext.Msg.alert('Serveur appelé', 'Merci, un serveur va venir vous voir dès que possible !' , Ext.emptyFn);
/*
         Ext.data.JsonP.request({
            url: 'http://localhost:3000/',
            callbackKey: 'callback',
            success: function(result, request) {
                var text = response.data;
                Ext.Msg.alert('Commande envoyée', text, Ext.emptyFn);
            }
        });*/
    },
    validerCommande: function() {
        var commande = new Array();
        this.getTable().getStore().each(function(record) {
            commande.push({
                id:record.get("id"),
                nom:record.get("nom"),
                desc:record.get("desc")
            });
            console.log(record.get("nom")+ " ajouté à la commande");
        }, this);
/*
         Ext.data.JsonP.request({
            url: 'http://localhost:3000/CreateOrder/'+Ext.encode(commande),
            callbackKey: 'callback',
            success: function(result, request) {
                var text = response.data;
                Ext.Msg.alert('Commande envoyée', text, Ext.emptyFn);
            }
        });*/
        Ext.Msg.alert('Commande enregistrée', "Merci ! Votre commande a été envoyée aux cuisines, un serveur va venir vous l'apporter dès qu'elle sera prête.", Ext.emptyFn);
        this.getTablePanel().setCommandeStatus(1);
        this.getButtonCommande().setText("Commande envoyée.");
        this.getButtonCommande().setDisabled(true);
        this.getButtonModifier().setDisabled(true);
        this.getButtonCommande().setUi("action");
    },
    modifier: function() {
        if(this.getTablePanel().getEditionMode()) {
            this.getTable().removeCls("edited");
            this.getButtonModifier().setText("Modifier");
            this.getButtonModifier().setUi("");
            this.getTablePanel().setEditionMode(false);
        }
        else {
            this.getTable().addCls("edited");
            this.getButtonModifier().setText("Terminer");
            this.getButtonModifier().setUi("action");
            this.getTablePanel().setEditionMode(true);
        }
    },
    removeDish: function(dt, index, target, record, e,eOpts ) {
        if(this.getTablePanel().getEditionMode()) {
            var msg = new Ext.MessageBox();
            msg.show({
               title: 'Liste de commande',
               message: 'Êtes-vous sûr de vouloir supprimer "'+record.get("nom")+'" de votre liste de commande ?',
               width: 300,
               buttons: Ext.MessageBox.OKCANCEL,
               fn: function(buttonId) {
                    if(buttonId=="ok") {
                        dt.getStore().removeAt(index);
                    }
                    msg.destroy();
               }
            });
        }
    },
    majBadge: function() {
        alert('data changed');
    }
});
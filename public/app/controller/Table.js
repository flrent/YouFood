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
        Ext.Msg.alert('Waiter called', 'Thank you, a waiter will come see you as soon as possible !' , Ext.emptyFn);
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
                _id:record.get("_id"),
                name:record.get("name"),
                desc:record.get("desc"),
                img:record.get("img"),
                price:record.get("price"),
                type:record.get("type")
            });
            console.log(record.get("name")+ " ajouté à la commande");
        }, this);
        var order = {  
            "order": {
                table: localStorage.getItem("table"),
                dishes:commande
            }
        };
          Ext.Ajax.request({
            url: '/CreateOrder',
            method:'POST',
            params: order,
            success: function(response){
                var text = response.responseText;

                Ext.Msg.alert('Meal ordered', "Thank you ! Your meal has been successfully ordered. We will bring it to your as soon as it is ready.", Ext.emptyFn);
                this.getTablePanel().setCommandeStatus(1);
                this.getButtonCommande().setText("Meal ordered.");
                this.getButtonCommande().setDisabled(true);
                this.getButtonModifier().setDisabled(true);
                this.getButtonCommande().setUi("action");
            },
            contentType:'application/json; charset=utf-8',
            dataType:'json',
            scope:this
        });
    },
    modifier: function() {
        if(this.getTablePanel().getEditionMode()) {
            this.getTable().removeCls("edited");
            this.getButtonModifier().setText("Edit");
            this.getButtonModifier().setUi("");
            this.getTablePanel().setEditionMode(false);
        }
        else {
            this.getTable().addCls("edited");
            this.getButtonModifier().setText("Finish edition");
            this.getButtonModifier().setUi("action");
            this.getTablePanel().setEditionMode(true);
        }
    },
    removeDish: function(dt, index, target, record, e,eOpts ) {
        if(this.getTablePanel().getEditionMode()) {
            var msg = new Ext.MessageBox();
            msg.show({
               title: 'Meal List',
               message: 'Are you sure you want to delete "'+record.get("nom")+'" from your meal list ?',
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
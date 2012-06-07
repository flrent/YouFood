Ext.define('YouFood.controller.Produit', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            table:'#tabledataview',
            tabs:'#mainYouFoodTabBar',
            produit:'produit',
            tablePanel:'#tablepanel'
        },
        control: {
            '#produitContainer button': {
                tap:'commander'
            }
        }
    },
    commander: function(e) {
        var that = this;
        var msg = new Ext.MessageBox();
        var produit = that.getProduit().getData();

        if(this.getTablePanel().getCommandeStatus()==0) {  
          msg.show({
             title: 'Your Meal',
             message: 'Do you want to add to your list "'+produit.nom+'" ?',
             width: 300,
             buttons: Ext.MessageBox.OKCANCEL,
             fn: function(buttonId) {
                  if(buttonId=="ok") {
                      that.getTable().getStore().add(produit);
                      that.getTabs().getTabBar().getAt(1).setBadgeText(that.getTable().getStore().getCount());
                  }
                  msg.destroy();
             }
          });
        }
        else {
          msg.show({
             title: 'Meal ordered',
             message: "Your meal has already been ordered. We cannot change it.",
             width: 300,
             buttons: Ext.MessageBox.OK,
             fn: Ext.emptyFn
          });
        }

    }
});
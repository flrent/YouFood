Ext.define('YouFood.controller.Categorie', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            accueil:'homepanel',
            dataview:'categorie dataview'       
        },
        control: {
            'categorie dataview':{
                itemtap:'platSelected'
            }
        }
    },
    platSelected: function(e) {
        new Ext.Panel({
            modal:true,
            centered:true,
            items:[
            {
                html:'test'
            },{
                xtype:'produit'
            }]
        }).show();
    }
});
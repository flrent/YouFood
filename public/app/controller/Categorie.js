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
    platSelected: function(dt, index, item, record, e,opts) {
       this.getAccueil().push({
            title:"YouFood",
            cls:'produit',
            id:'produitContainer',
            items:[
                {
                    xtype:'produit',
                    data:{
                        "nom":record.get("name"),
                        "photo":record.get("img"),
                        "desc":record.get("desc"),
                        "prix":record.get("price"),
                    }
                }
            ]
        });
    }
});
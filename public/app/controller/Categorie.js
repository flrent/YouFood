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
        Ext.Ajax.request({
            url: '/DishViewed/'+record.get("_id")+"/"+localStorage.getItem("table")
        });

        this.getAccueil().push({
            title:"YouFood",
            cls:'produit',
            id:'produitContainer',
            items:[
                {
                    xtype:'produit',
                    data:{
                        "name":record.get("name"),
                        "img":record.get("img"),
                        "type":record.get("type"),
                        "_id":record.get("_id"),
                        "desc":record.get("desc"),
                        "price":record.get("price"),
                    }
                }
            ]
        });
    }
});
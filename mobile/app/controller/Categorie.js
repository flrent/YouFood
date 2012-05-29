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
            title:record.get("nom"),
            items:[
                {
                    xtype:'produit',
                    data:{
                        "nom":record.get("nom"),
                        "photo":record.get("photo"),
                        "desc":record.get("desc"),
                    }
                },
                {
                    xtype:'button',
                    ui:'action',
                    id:'buttoncommander',
                    text:'Commander'
                }
            ]
        });
    }
});
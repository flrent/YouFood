Ext.define('YouFood.controller.Home', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            accueil:'homepanel',

        },
        control: {
            '#homedataview': {
                itemtap: 'getPlat'
            }
        }
    },
    getPlat: function(dt, index, item, record, e,opts) {
        
        this.getAccueil().push({
            xtype:'categorie',
            title:record.get("nom"),
            items:[
                {
                    flex:0.5,
                    html:record.get("nom")
                },
                {
                    xtype:'categoriedataview',
                    store:{
                        fields:["nom", "desc", "items"],
                        autoLoad:true,
                        data:record.raw.items
                    }
                }

            ]
        });
    }
});
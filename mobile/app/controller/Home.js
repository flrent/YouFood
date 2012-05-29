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
        // utiliser ext.create avec data
        this.getAccueil().push({
            xtype:'categorie',
            title:record.get("nom"),
            defaults:{
                styleHtmlContent:true
            },
            items:[
                {
                    flex:0.5,
                    html:"<h3>"+record.get("nom")+"</h3>",
                    style:'background:#c37e4c'
                },
                {
                    xtype:'categoriedataview',
                    store:{
                        fields:['nom','type','desc','photo'],
                        autoLoad:true,
                        data:record.raw.items
                    }
                }

            ]
        });
    }
});
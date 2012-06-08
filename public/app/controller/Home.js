Ext.define('YouFood.controller.Home', {
    extend: 'Ext.app.Controller',
    requires:['Ext.Anim', 'Ext.Img'],
    config: {
        refs: {
            accueil:'homepanel',
            homeDataView: '#homedataview',
            imageResto:'homepanel img',
            boxes:'homepanel .box'
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
            title:"YouFood",
            defaults:{
                styleHtmlContent:true
            },
            items:[
                {
                    flex:0.3,
                    cls:'categorie_header',
                    html:"<h3>"+record.get("name")+"</h3>"
                },
                {
                    xtype:'categoriedataview',
                    store:{
                        fields:['name','desc','img','price'],
                        autoLoad:true,
                        proxy: {
                            type:'ajax',
                            url:'/GetDishes',
                            reader: {
                                type:"json"
                            }
                        }
                    }
                }

            ]
        });
    },
    launch: function() {

        Ext.Anim.run(this.getImageResto(), 'fade', {
            out: false,
           duration: 3000
        });
    }
});
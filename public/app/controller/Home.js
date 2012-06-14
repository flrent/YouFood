Ext.define('YouFood.controller.Home', {
    extend: 'Ext.app.Controller',
    requires:['Ext.Anim', 'Ext.Img'],
    config: {
        refs: {
            accueil:'homepanel',
            homeDataView: '#homedataview',
            imageResto:'homepanel img',
            boxes:'homepanel .box',
            homeTitle:'homepanel #homeTitleText'
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
                        fields:['name','desc','type','img','price','_id'],
                        data:record.get("dishes")
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


        Ext.Ajax.request({
            url: '/GetRestaurantInfos',
            method:'GET',
            success: function(response){
                var text = JSON.parse(response.responseText);
                this.getHomeTitle().setHtml('<h1>'+text.name+'</h1><p>'+text.desc+'</p>');
            },
            contentType:'application/json; charset=utf-8',
            dataType:'json',
            scope:this
        });
    }
});
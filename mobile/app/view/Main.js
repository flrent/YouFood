Ext.define("YouFood.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',
        id:'mainYouFoodTabBar',
        items: [
            {
                xtype:'homepanel'
            },
            {
                xtype:'tablepanel'
            },
            {
                xtype:'settingspanel'
            }
        ]
    }
});

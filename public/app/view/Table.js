Ext.define('YouFood.view.Table', {
	 extend: 'Ext.navigation.View',
	 xtype:'tablepanel',
	 id:'tablepanel',
	 config: {
	 	iconCls:'note2',
		title:'Your meal',
		editionMode:false,
		commandeStatus:0,
	 	items: [
		 	{
	 			title:'YouFood',
		 		layout:'vbox',
		 		items:[
			 		{
		                flex:0.3,
		                cls:'categorie_header',
		                html:"<h3>Votre Table</h3>"
		            },
			 		{
			 			xtype:'toolbar',
			 			items:[
				 			{
				 				text:'Edit',
				 				id:'modifierCommande',
				 				iconCls:'compose1',
				 				iconMask:true,
				 				docked:'left'
				 			},
				 			{
				 				text:'Call a waiter',
				 				id:'appelerServeur',
				 				iconCls:'user_business',
				 				iconMask:true,
				 				docked:'left'
				 			},
				 			{
				 				text:'Order your meal',
				 				docked:'right',
				 				id:'validerCommande',
				 				iconCls:'check_black2',
				 				iconMask:true,
				 				ui:'confirm'
				 			}
			 			]
			 		},
			 		{
			 			id:'tabledataview',
			 			xtype:'tabledataview',
			 			store:{
			 				autoLoad:true,
			 				fields:['nom','prix','desc','photo'],
			 				proxy: {
			 					type:'ajax',
			 					url:'/GetDishes',
			 					reader: {
			 						type:"json",
			 						rootProperty:'table'
			 					}
			 				}
			 			}
			 		}
		 		]
		 	}
            
	 	]
	 }
});
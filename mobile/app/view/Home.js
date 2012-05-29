Ext.define('YouFood.view.Home', {
	 extend: 'Ext.navigation.View',
	 xtype:'homepanel',
	 config: {
	 	iconCls:'home',
	 	title:'Menu',
	 	scroll:true,
	 	items: [
	 		{
	 			layout:'fit',
	 			title:'YouFood',
	 			items:[
			        {
			        	id:'homedataview',
			 			xtype:'dataview',
			 			itemTpl:'<h2>{nom}<h2>',
			 			styleHtmlContent:true,
					 	title: 'Faites votre sélection',
			 			store:{
			 				autoLoad:true,
	 						fields:['nom','type','desc','photo'],
			 				hasMany:['items'],
			 				proxy: {
			 					type:'ajax',
			 					url:'data.json',
			 					reader: {
			 						type:"json",
			 						rootProperty:'content'
			 					}
			 				}
			 			}
			 		}
	 			]
	 			
	 		}
	 	]
	 }
});
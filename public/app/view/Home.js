Ext.define('YouFood.view.Home', {
	 extend: 'Ext.navigation.View',
	 xtype:'homepanel',
	 config: {
	 	iconCls:'home',
	 	title:'Menu',
	 	scroll:true,
	 	items: [
	 		{
	 			layout:'vbox',
	 			title:'YouFood',
	 			defaults:{styleHtmlContent:true},
	 			items:[
	 				{
	 					flex:1,
	 					items:[
	 						{
	 							layout:'hbox',
	 							items:[
	 								{
	 									flex:1.5,
					 					html:[
							 				'<div class="accueil">',
							 					'<h1>Welcome to our restaurant, enjoy sitting in one of the best in town.</h1>',
							 					'<p>Notre restaurant notre restaurant notre restaurant notre restaurant notre restaurant notre restaurant notre restaurant notre restaurant </p>',
							 				'</div>'
							 			].join('')
							 		},
							 		{
							 			flex:0.5,
							 			items:[
							 				{
							 					html:[
							 						'<h3>This is the vietnam week</h3>',
							 						'<p>This week we are proud to announce that we are launching officially the vietnameese week. Enjoy it all you can !</p>'
							 					].join('')
							 				}
							 			]
							 		}
	 							]
	 						}
	 					]
	 				},
			        {
			        	flex:1,
			        	id:'homedataview',
			 			xtype:'dataview',
			 			cls:'home',
			 			scroll:false,
			 			itemTpl:[
			 				'<div class="box">',
			 					'<img src="{photo}">',
			 					'<p>{nom}</p>',
			 				'</div>'
			 			].join(''),
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
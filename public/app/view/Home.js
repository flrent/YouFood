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
	 					flex:1.5,
	 					cls:'accueil',
	 					items:[
	 						{
	 							layout:'hbox',
	 							items:[
	 								{
	 									flex:1.5,
					 					html:[
							 					'<h1>Welcome to our restaurant, enjoy sitting in one of the best in town.</h1>',
							 					'<p>Let your fingers guide you through our menu, select your choice and order directly <br/> from our tab.</p>',
							 				
							 			].join('')
							 		},
							 		{
							 			flex:0.5,
							 			items:[
							 				{
							 					html:[
							 						'<h3>This is the vietnam week</h3>',
							 						'<p>This week we are proud to announce that we are launching officially the vietnamese week. Enjoy it all you can !</p>'
							 					].join('')
							 				}
							 			]
							 		}
	 							]
	 						}
	 					]
	 				},{
	 					flex:1,
	 					xtype:'image',
	 					cls:'frontimage',
	 					src:'resources/images/restaurant1.jpg'
	 				},
			        {
			        	flex:1,
			        	id:'homedataview',
			 			xtype:'dataview',
			 			cls:'home',
			 			scroll:false,
			 			itemTpl:[
			 				'<div class="box">',
			 					'<p>{name}</p>',
			 				'</div>'
			 			].join(''),
			 			store:{
			 				autoLoad:true,
							fields:['name','type','dishes', 'desc','img', '_id', 'price'],
			 				hasMany:['dishes'],
			 				proxy: {
			 					type:'ajax',
			 					url:'/GetAllApp',
			 					reader: {
			 						type:"json",
			 						rootProperty:'menu'
			 					}
			 				},
			 				listeners:{
			 					'load':function() {
			 						console.log(this);
			 					}
			 				}
			 			}
			 		}
	 			]
	 			
	 		}
	 	]
	 }
});
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
	 									id:'homeTitleText',
					 					html:[
							 					'<h1></h1>'							 				
							 			].join('')
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
			 				}
			 			}
			 		}
	 			]
	 			
	 		}
	 	]
	 }
});
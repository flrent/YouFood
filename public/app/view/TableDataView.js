Ext.define('YouFood.view.TableDataView', {
	extend: 'Ext.dataview.DataView',
	xtype:'tabledataview',
	requires:['Ext.data.Store','Ext.dataview.DataView'],
	config: {	
		flex:1.5,
		cls:'table',
		itemTpl:[
			'<div class="produits">',
				'<div class="edit"></div>',
				'<img src="{img}">',
				'<h3>{name}</h3>',
				'<p>{desc}</p>',
				'<p class="prix">{price}</p>',
			'</div>'
		],
		styleHtmlContent:true
	 }
});
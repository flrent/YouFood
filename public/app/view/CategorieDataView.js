Ext.define('YouFood.view.CategorieDataView', {
	extend: 'Ext.dataview.DataView',
	xtype:'categoriedataview',
	requires:['Ext.data.Store','Ext.dataview.DataView'],
	config: {
		cls:'categorie',
		flex:1.5,
		itemTpl:[
			'<div class="produits">',
				'<img src="{img}">',
				'<h3>{name}</h3>',
				'<p>{desc}</p>',
				'<p class="prix">{price} $</p>',
			'</div>'
		],
		styleHtmlContent:true
	 }
});
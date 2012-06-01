Ext.define('YouFood.view.CategorieDataView', {
	extend: 'Ext.dataview.DataView',
	xtype:'categoriedataview',
	requires:['Ext.data.Store','Ext.dataview.DataView'],
	config: {
		cls:'categorie',
		flex:1.5,
		itemTpl:[
			'<div class="produits">',
				'<img src="{photo}">',
				'<h3>{nom}</h3>',
				'<p>{desc}</p>',
			'</div>'
		],
		styleHtmlContent:true
	 }
});
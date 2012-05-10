Ext.define('YouFood.view.CategorieDataView', {
	extend: 'Ext.dataview.DataView',
	xtype:'categoriedataview',
	requires:['Ext.data.Store','Ext.dataview.DataView'],
	config: {
		flex:1.5,
		itemTpl:'<h3>{nom}<h3>',
		styleHtmlContent:true
	 }
});
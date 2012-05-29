Ext.define('YouFood.view.Produit', {
	extend: 'Ext.Panel',
	xtype:'produit',
	
	config: {
		data:null,
		styleHtmlContent:true,
		tpl: [
			'<div class="produit">',
				'<div class="photo">',
					'<img src="{photo}" alt="" />',
				'</div>',
				'<div class="title">',
					'<h3>{nom}</h3>',
				'</div>',
				'<div class="clear"></div>',
				'<div class="description">',
					'{desc}',
				'</div>',
			'</div>',
		]
	 }
});
Ext.define('YouFood.view.Produit', {
	extend: 'Ext.Panel',
	xtype:'produit',
	
	config: {
		data:null,
		styleHtmlContent:true,
		layout:'vbox',
		tpl: [
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
		],
		items:[
        {
            xtype:'button',
            ui:'action',
            cls:'buttoncommander',
            iconMask:true,
            iconCls:'add',
            width:'40%',
            top:380,
            left:'55%',
            text:'Add to your meal'
        },
 		{
 			docked:'bottom',
 			cls:'helper',
 			html:'<p>Compose your meal by adding this product to your list.</p>'
 		}]
	 }
});
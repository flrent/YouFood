Ext.define('YouFood.view.SettingsPanel', {
	extend: 'Ext.Panel',
	xtype:'settingspanel',
	requires:['Ext.form.FieldSet','Ext.field.Number','Ext.field.Password'],
	config: {
		title:'Settings',
		iconCls:'settings',
		cls:'settingspanel',
		layout: {type:'card',animation:{type:'flip'}},
		id:'settingspanel',
		numeroTable:0,
		identifiantServeur:0,
		items:[
			{
				layout:{
					type:'hbox',
					pack:'center'
				},
				cls:'settingspanel',
				items:[{
					layout:'vbox',
					items:[
						{xtype:'spacer'},
				        {
				            xtype: 'fieldset',
				            title: 'Reserved access',
				            instructions: 'To change the settings, you must be authorized and provide the password.',
				            items: [
				                {
				                    xtype: 'passwordfield',
				                    name : 'password',
				                    id:'settingsPassword'
				                },
				                {
				                	xtype:'button',
				                	ui:'action',
				                	text:'Enter',
				 					iconCls:'user_business',
				 					iconMask:true,
				                	id:'settingsEntrer'
				                }
				            ]
				        },
				        {
				        	id:'numeroTablePanel',
				        	styleHtmlContent:true,
				        	tpl:['<p>Table numero : {table}</p>']
				        },
				        {
				        	id:'identifiantServeurPanel',
				        	styleHtmlContent:true,
				        	tpl:['<p>Serveur id : {serveur}</p>']
				        },
				        {xtype:'spacer'}
			        ]
				}]
			},
			{
				layout:{
					type:'hbox',
					pack:'center'
				},
				cls:'settingspanel',
				items:[
					{
						layout:'vbox',
						items:[
							{xtype:'spacer'},
					        {
					            xtype: 'fieldset',
					            title: 'Table number',
					            instructions: 'Change this tab\' table number.',
					            items: [
					                {
					                    xtype: 'numberfield',
					                    name : 'numeroTable',
					                    id:'numeroTableChamp'
					                },
					                {
					                	xtype:'spacer',
					                }
					            ]
					        },
					        {
					            xtype: 'fieldset',
					            title: 'Waited ID',
					            instructions: 'Change the waiter id of this tab.',
					            items: [
					                {
					                    xtype: 'textfield',
					                    name : 'serveurTable',
					                    id:'serveurIdentifiantChamp'
					                },
					                {
					                	xtype:'spacer'
					                }
					            ]
					        },
							{
								xtype:'button',
								ui:'confirm',
								text:'Change',
								id:'changeButton'
							},
					        {xtype:'spacer'},
							{
								xtype:'button',
								ui:'decline',
								text:'Log out',
								id:'logOutButton'
							},
					        {xtype:'spacer'}
				        ]
					}
				]
			}
		]
	 }
});
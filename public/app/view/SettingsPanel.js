Ext.define('YouFood.view.SettingsPanel', {
	extend: 'Ext.Panel',
	xtype:'settingspanel',
	requires:['Ext.form.FieldSet','Ext.field.Number'],
	config: {
		title:'Réglages',
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
				            title: 'Espace réservé',
				            instructions: 'Pour accéder aux réglages vous devez entrer le mode de passe.',
				            items: [
				                {
				                    xtype: 'textfield',
				                    name : 'password'
				                },
				                {
				                	xtype:'button',
				                	ui:'action',
				                	text:'Entrer',
				 				iconCls:'user_business',
				 				iconMask:true,
				                	id:'settingsEntrer'
				                }
				            ]
				        },
				        {
				        	id:'numeroTablePanel',
				        	styleHtmlContent:true,
				        	tpl:['<p>Table numéro : {table}</p>']
				        },
				        {
				        	id:'identifiantServeurPanel',
				        	styleHtmlContent:true,
				        	tpl:['<p>Serveur : {serveur}</p>']
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
					            title: 'Numéro de table',
					            instructions: 'Changez le numéro de table de cette tablette.',
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
					            title: 'Identifiant du serveur',
					            instructions: 'Changez le serveur responsable de cette table.',
					            items: [
					                {
					                    xtype: 'numberfield',
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
								text:'Changer',
								id:'changeButton'
							},
					        {xtype:'spacer'},
							{
								xtype:'button',
								ui:'decline',
								text:'Déconnecter',
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
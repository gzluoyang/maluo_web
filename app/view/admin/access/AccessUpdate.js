Ext.define('Admin.view.admin.access.AccessUpdate',{
    extend: 'Ext.window.Window',
    xtype: 'accessUpdate',

    requires: [
        'Admin.view.admin.access.AccessUpdateController',
        'Admin.view.admin.access.AccessUpdateModel'
    ],

    controller: 'accessUpdate',
    viewModel: {
        type: 'accessUpdate'
    },

	width: 640,
	height: 480,
	padding: '4px 2px;',
	layout: 'fit',
	modal: true,
	bind: {
		title: '{title}',
		iconCls: '{iconCls}'
	},
	bbar: ['->',{
		text: '保存',
		ui: 'soft-green',
		handler: 'onSave',
		bind: {
			hidden: '{!isEditable}'
		}
	},{
		text: '重置',
		ui: 'soft-blue',
		handler: 'onReset',
		bind: {
			hidden: '{!isEditable}'
		}
	},{
		text: '关闭',
		handler: 'onClose'
	}],

	items: [
		{
			xtype: 'form',
			layout: 'fit',
			jsonSubmit: true,
			reference: 'formPanel',
			items: [
				{
					xtype: 'tabpanel',
					deferredRender: false,
					layoutOnTabChange: true,
					activeTab: 0,
					reference: 'tabPanel',
					items: [
					{
						title: '基础信息',
						layout: 'form',
						scrollable: 'y',
						items: [
							{
								xtype: 'hiddenfield',
								name: 'id',
								bind: '{info.id}'
							},
							{
								xtype: 'textfield',
								fieldLabel: '标题',
								name: 'title',
								allowBlank: false,
								blankText: '不能为空!',
								bind: {
									value: '{info.title}',
									readOnly: '{!isEditable}'
								}
							},
							{
								xtype: 'textfield',
								fieldLabel: 'URL',
								name: 'url',
								bind: {
									value: '{info.url}',
									readOnly: '{!isEditable}'
								}
							},
							{
                                xtype: 'numberfield',
								fieldLabel: '排序',
								name: 'tab_index',
								minValue: 0,
								allowBlank: false,
								bind: {
									value: '{info.tab_index}',
									readOnly: '{!isEditable}'
								}
							},
							{
								xtype: 'checkboxfield',
								fieldLabel: '可用',
								name: 'status',
								inputValue: '1',
								uncheckedValue: '0',
								bind: {
									value: '{info.status}',
									readOnly: '{!isEditable}'
								}
							},
	    					{
								xtype: 'textareafield',
								fieldLabel: '备注',
								tooltip: '一些说明',
								name: 'memo',
								maxRows: 4,
								bind: {
									value: '{info.memo}',
									readOnly: '{!isEditable}'
								}
							}
						]
					},{
						title: '操作信息',
						layout: 'form',
						scrollable: 'y',
						items: [
                            {
                                xtype: 'textfield',
                                name: 'create_time',
                                fieldLabel: '创建时间',
                                submitValue: false,
                                readOnly: true,
                                bind: {
                                    value: '{createTime}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                name: 'update_time',
                                fieldLabel: '最后修改时间',
                                submitValue: false,
                                readOnly: true,
                                bind: {
                                    value: '{updateTime}'
                                }
                            }
						]
					}]
				}
			]
		}
	]
});

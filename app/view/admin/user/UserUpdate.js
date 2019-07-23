Ext.define('Admin.view.admin.user.UserUpdate',{
    extend: 'Ext.window.Window',
    xtype: 'userUpdate',

    requires: [
        'Admin.view.admin.user.UserUpdateController',
        'Admin.view.admin.user.UserUpdateModel'
    ],

    controller: 'userUpdate',
    viewModel: {
        type: 'userUpdate'
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
		text: '关闭',
		ui: 'soft-blue',
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
								fieldLabel: '账户名',
								name: 'username',
                                readOnly: true,
								bind: {
									value: '{info.username}'
								}
							},
							{
                                xtype: 'numberfield',
								fieldLabel: '排序',
								name: 'tab_index',
                                readOnly: true,
								bind: {
									value: '{info.tab_index}'
								}
							},
							{
								xtype: 'checkboxfield',
								fieldLabel: '可用',
								name: 'status',
								inputValue: '1',
								uncheckedValue: '0',
                                readOnly: true,
								bind: {
									value: '{info.status}'
								}
							},
	    					{
								xtype: 'textareafield',
								fieldLabel: '备注',
								tooltip: '一些说明',
								name: 'memo',
								maxRows: 4,
                                readOnly: true,
								bind: {
									value: '{info.memo}'
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
                                fieldLabel: '注册时间',
                                submitValue: false,
                                readOnly: true,
                                bind: {
                                    value: '{regTime}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                name: 'update_time',
                                fieldLabel: '最后登录时间',
                                submitValue: false,
                                readOnly: true,
                                bind: {
                                    value: '{lastLoginTime}'
                                }
                            }
						]
					}]
				}
			]
		}
	]
});

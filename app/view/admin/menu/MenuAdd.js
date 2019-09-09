Ext.define('Admin.view.admin.menu.MenuAdd',{
   extend: 'Ext.window.Window',
    xtype: 'menuAdd',

    requires: [
        'Admin.view.admin.menu.MenuAddController',
        'Admin.view.admin.menu.MenuAddModel'
    ],

    controller: 'menuAdd',
    viewModel: {
        type: 'menuAdd'
    },

	width: 640,
	height: 480,
	padding: '4px 2px;',
	modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
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
            layout: 'form',
            fit: 1,
			jsonSubmit: true,
            scrollable: 'y',
            align: 'stretch',
			reference: 'formPanel',
			items: [
                {
                    xtype: 'hiddenfield',
                    name: 'group_id',
                    bind: {
                        value: '{info.group_id}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '标题',
                    name: 'title',
                    allowBlank: false,
                    labelAlign: 'right',
                    blankText: '不能为空!'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'URL',
                    name: 'url',
                    labelAlign: 'right'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '图标',
                    name: 'icon',
                    labelAlign: 'right'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '图标样式',
                    name: 'icon_cls',
                    labelAlign: 'right'
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: '排序',
                    name: 'tab_index',
                    labelAlign: 'right',
                    value: 0,
                    minValue: 0,
                    allowBlank: false
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: '可用',
                    name: 'status',
                    labelAlign: 'right',
                    inputValue: '1',
                    uncheckedValue: '0'
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: '备注',
                    tooltip: '一些说明',
                    labelAlign: 'right',
                    name: 'memo',
                    maxRows: 4
                }
            ]
        }
    ]
});

Ext.define('Admin.view.admin.AppAdd',{
    extend: 'Ext.window.Window',
    xtype: 'appAdd',

    requires: [
        'Admin.view.admin.AppAddController',
        'Admin.view.admin.AppAddModel'
    ],

    controller: 'appAdd',
    viewModel: {
        type: 'appAdd'
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
                    xtype: 'textfield',
                    fieldLabel: '标题',
                    name: 'title',
                    allowBlank: false,
                    labelAlign: 'right',
                    blankText: '不能为空!',
                    bind: {
                        value: '{info.title}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '图标',
                    name: 'icon',
                    labelAlign: 'right',
                    bind: {
                        value: '{info.icon}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '图标样式',
                    labelAlign: 'right',
                    name: 'icon_cls',
                    bind: {
                        value: '{info.iconCls}'
                    }
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: '备注',
                    tooltip: '一些说明',
                    labelAlign: 'right',
                    name: 'memo',
                    maxRows: 4,
                    bind: {
                        value: '{info.memo}'
                    }
                }
            ]
        }
    ]
});

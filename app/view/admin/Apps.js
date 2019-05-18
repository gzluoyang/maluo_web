Ext.define('Admin.view.admin.Apps',{
    extend: 'Ext.container.Container',
	
    xtype: 'apps',

    requires: [
        'Admin.view.admin.AppsController',
        'Admin.view.admin.AppsModel'
    ],

    controller: 'apps',
    viewModel: {
        type: 'apps'
    },

    layout: {
        type: 'vbox',
		pack: 'center',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'grid',
			reference: 'gridPanel',
            itemId: 'contentPanel',
            flex: 1,
			margin: 0,
			bind: '{apps}',
            columns: [
				{xtype: 'rownumberer'},
                {
					text: '名称',
					dataIndex: 'name',
					flex: 1,
				},
                {
					text: '简介',
					dataIndex: 'intro',
					flex: 5,
					sortable: false
				}
            ],
			tbar: [
				{
					text: '新增',
					ui: 'soft-green',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-plus-circle',
					handler: 'onAdd'
				},
				{
					text: '修改',
					ui: 'soft-blue',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-edit',
					handler: 'onEdit',
					bind: {
						disabled: '{!hasCurrentRecord}'
					}
				},
				{
					text: '删除',
					ui: 'soft-red',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-times-circle',
					handler: 'onRemove',
					bind: {
						disabled: '{!hasCurrentRecord}'
					}
				},
				'-',
				{
					text: '预览',
					ui: 'blue',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-eye',
					handler: 'onPreview',
					bind: {
						disabled: '{!hasCurrentRecord}'
					}
				},
				{
					text: '扫码',
					ui: 'soft-red',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-qrcode',
					handler: 'onQRCode',
					bind: {
						disabled: '{!hasCurrentRecord}'
					}
				},
				'-',
				'->',
				{
					xtype: 'textfield',
					placeHolder: '输入要查找的相关内容',
					style: 'margin-right: -1px;',
					name: 'searchKey',
					reference: 'searchKey'
				},
				{
					ui: 'soft-green',
					style: 'border-top-right-radius: 2px;border-bottom-right-radius: 2px;margin-left: 0px;',
					iconCls: 'fa fa-lg fa-search',
					handler: 'onSearch'
				}
			],
			bbar: [
				{
					xtype: 'pagingtoolbar',
					bind: '{apps}',
					firstText: '第一页',
					lastText: '最后页',
					nextText: '下一页',
					prevText: '上一页',
					afterPageText: '共{0}页',
					beforePageText: '页',
					displayMsg: '正在显示 {0} - {1} 条记录, 共 {2} 条记录',
					emptyMsg: '没有记录显示!',
					displayInfo: true
				}
			],
			listeners: {
				selectionchange: 'onSelectionChange',
				rowdblclick: 'onRowDbClick'
			}
        }
    ]
});


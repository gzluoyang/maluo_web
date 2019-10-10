Ext.define('Admin.view.admin.app.Apps',{
    extend: 'Ext.container.Container',
	
    xtype: 'apps',

    requires: [
        'Admin.view.admin.app.AppsController',
        'Admin.view.admin.app.AppsModel'
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
			margin: '8 0 0 0',
			bind: '{apps}',
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'apps',
                    dropGroup: 'apps',
                    enableDrop: true,
                    enableDrag: true,
                    displayField: 'title',
                    dragZone: {
                        animRepair: false
                    }
                }
            },
            columns: [
				{xtype: 'rownumberer'},
                {
					text: '标题',
					dataIndex: 'title',
					width: 200
				},
                {
					text: '图标样式',
					dataIndex: 'icon_cls',
					sortable: false,
	    			width: 150
				},
                {
					text: '图标',
					dataIndex: 'icon',
					sortable: false,
				    width: 300
				},
                {
					text: '排序',
					dataIndex: 'tab_index',
                    width: 80
				},
                {
                    xtype: 'booleancolumn',
					text: '可用',
                    trueText: '是',
                    falseText: '否',
					dataIndex: 'status',
                    width: 80
				},
                {
                    xtype: 'datecolumn',
                    text: '最后修改时间',
                    format: 'Y-m-d H:i:s',
                    width: 150,
                    dataIndex: 'update_time'
                },
                {
					text: '备注',
					dataIndex: 'memo',
					flex: 1,
					sortable: false
				}
            ],
			tbar: [
				{
					//text: '新增',
					ui: 'green',
					style: 'border-radius: 2px;',
					//iconCls: 'fa fa-lg fa-plus-circle',
					handler: 'onAdd',
                    bind: {
                        text: '{textAdd}',
                        iconCls: '{iconClsAdd}',
                        hidden: '{!hasAdd}'
                    }
				},
				{
					text: '修改',
					ui: 'soft-blue',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-edit',
					handler: 'onEdit',
					bind: {
                        hidden: '{!hasEdit}',
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
                        hidden: '{!hasDel}',
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
			bbar: 
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
			,
			listeners: {
                render: 'onRender',
                drop: 'onGridDrop',
				selectionchange: 'onSelectionChange',
				rowdblclick: 'onRowDbClick'
			}
        }
    ]
});


Ext.define('Admin.view.admin.access.Accesses',{
    extend: 'Ext.container.Container',
    xtype: 'accesses',

    requires: [
        'Admin.view.admin.access.AccessesController',
        'Admin.view.admin.access.AccessesModel'
    ],

    controller: 'accesses',
    viewModel: {
        type: 'accesses'
    },

    layout: {
        type: 'hbox',
		pack: 'center',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'treepanel',
            reference: 'treeList',
            itemId: 'moduletree',
            reference: 'treePanel',
            bind: '{moduletree}',
            border: true,
            style: 'border-color: #d0d0d0 !important;border-right-width: 1px !important;border-top-width: 0px !important;',
            bodyBorder: false,
            bodyStyle: 'border-top-width: 1px !important;border-bottom-width: 0px !important;',
            rootVisible: true,
            width: 200,
            listeners: {
                itemclick: 'onSelectApp'
            },
            header: {
                style: 'font-size: 13px;'
            },
            title: {
                text: '树视图',
                style: 'font-size: 13px;',
                iconCls: 'fa fa-th-list'
            },
            tools: [
                {
                    iconCls: 'fa fa-plus-square',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onExpand'
                },
                {
                    iconCls: 'fa fa-minus-square',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onCollapse'
                },
                {
                    iconCls: 'fa fa-refresh',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onTreeRefresh'
               }
            ]
        },
        {
            xtype: 'grid',
			reference: 'gridPanel',
            itemId: 'contentPanel',
            flex: 1,
			bind: '{accesses}',
            bodyBorder: true,
            bodyStyle: 'border-top-width: 1px !important;',
            columns: [
				{xtype: 'rownumberer'},
                {
					text: '标题',
					dataIndex: 'title',
					width: 200
				},
                {
					text: 'URL',
					dataIndex: 'url',
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
                    text: '角色',
 					ui: 'soft-green',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-user-secret',
					handler: 'onSetRole'
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
			bbar: { 
                xtype: 'pagingtoolbar',
                bind: '{accesses}',
                firstText: '第一页',
                lastText: '最后页',
                nextText: '下一页',
                prevText: '上一页',
                afterPageText: '共{0}页',
                beforePageText: '页',
                displayMsg: '正在显示 {0} - {1} 条记录, 共 {2} 条记录',
                emptyMsg: '没有记录显示!',
                displayInfo: true
            },
			listeners: {
				selectionchange: 'onSelectionChange',
				rowdblclick: 'onRowDbClick'
			}
        },
        {
            xtype: 'treepanel',
            reference: 'roleTree',
            itemId: 'roletree',
            bind: '{roletree}',
            hidden: true,
            border: true,
            style: 'border-color: #d0d0d0 !important;border-right-width: 1px !important;border-top-width: 0px !important;',
            bodyBorder: false,
            bodyStyle: 'border-top-width: 1px !important;border-bottom-width: 0px !important;',
            rootVisible: true,
            width: 300,
            header: {
                style: 'font-size: 13px;'
            },
            listeners: {
                beforeitemexpand: 'onBeforeRoleTreeItemExpand'
            },
            title: {
                text: '角色设置',
                style: 'font-size: 13px;',
                iconCls: 'fa fa-cog'
            },
            tools: [
                {
                    iconCls: 'fa fa-save',
                    tooltip: '保存',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onSaveRoles'
                },
                {
                    iconCls: 'fa fa-plus-square',
                    tooltip: '展开所有',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onRoleTreeExpandAll'
                },
                {
                    iconCls: 'fa fa-minus-square',
                    tooltip: '折叠所有',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onRoleTreeCollapseAll'
                },
                {
                    iconCls: 'fa fa-refresh',
                    tooltip: '重置',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onRoleTreeRefresh'
                },
                {
                    iconCls: 'fa fa-times',
                    tooltip: '关闭',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onRoleTreeClose'
                }
            ]
        }
    ]
});

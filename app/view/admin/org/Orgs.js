Ext.define('Admin.view.admin.org.Orgs',{
    extend: 'Ext.container.Container',
    xtype: 'orgs',

    requires: [
        'Admin.view.admin.org.OrgsController',
        'Admin.view.admin.org.OrgsModel'
    ],

    controller: 'orgs',
    viewModel: {
        type: 'orgs'
    },

    layout: {
        type: 'hbox',
		pack: 'center',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'treepanel',
            itemId: 'orgtree',
            reference: 'treePanel',
            bind: '{orgtree}',
            border: true,
            style: 'border-color: #d0d0d0 !important;border-right-width: 1px !important;border-top-width: 0px !important;',
            bodyBorder: false,
            bodyStyle: 'border-top-width: 1px !important;border-bottom-width: 0px !important;',
            rootVisible: true,
            width: 200,
            listeners: {
                itemclick: 'onSelectOrg',
                drop: 'onTreeNodeDrop'
            },
            header: {
                style: 'font-size: 13px;'
            },
            title: {
                text: '树视图',
                style: 'font-size: 13px;',
                iconCls: 'fa fa-th-list'
            },
            draggable: true,
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    ddGroup: 'roles'
                }
            },
            tools: [
                {
                    iconCls: 'fa fa-plus-square',
                    tooltip: '展开',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onExpand'
                },
                {
                    iconCls: 'fa fa-minus-square',
                    tooltip: '折叠',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onCollapse'
                },
                {
                    iconCls: 'fa fa-refresh',
                    tooltip: '刷新',
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
			bind: '{orgs}',
            bodyBorder: true,
            bodyStyle: 'border-top-width: 1px !important;',
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'org_grid',
                    dropGroup: 'org_grid',
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
					text: '名称',
					dataIndex: 'name',
					width: 200
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
					ui: 'soft-green',
					style: 'border-radius: 2px;',
                    bind: {
                        text: '{textAdd}',
                        iconCls: '{iconClsAdd}',
                        hidden: '{!hasAdd}'
                    },
					handler: 'onAdd'
				},
				{
					ui: 'soft-blue',
					style: 'border-radius: 2px;',
					handler: 'onEdit',
					bind: {
                        text: '{textEdit}',
                        iconCls: '{iconClsEdit}',
                        hidden: '{!hasEdit}',
						disabled: '{!hasCurrentRecord}'
					}
				},
				{
					ui: 'soft-red',
					style: 'border-radius: 2px;',
					handler: 'onRemove',
					bind: {
                        text: '{textDel}',
                        iconCls: '{iconClsDel}',
                        hidden: '{!hasDel}',
						disabled: '{!hasCurrentRecord}'
					}
				},
 				{
					xtype: 'tbseparator',
                    bind: {
                        hidden: '{!hasSplit1}'
                    }
				},
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
                bind: '{orgs}',
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
                drop: 'onGridDrop',
				selectionchange: 'onSelectionChange',
				rowdblclick: 'onRowDbClick'
			}
        }
    ]
});

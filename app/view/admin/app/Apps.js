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
        type: 'hbox',
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
					text: '主页',
					dataIndex: 'home',
					width: 150
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
					ui: 'green',
					style: 'border-radius: 2px;',
					handler: 'onAdd',
                    bind: {
                        text: '{textAdd}',
                        iconCls: '{iconClsAdd}',
                        hidden: '{!hasAdd}'
                    }
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
                {
 					ui: 'soft-green',
					style: 'border-radius: 2px;',
					handler: 'onSetRole',
					bind: {
                        text: '{textRole}',
                        iconCls: '{iconClsRole}',
                        hidden: '{!hasRole}',
						disabled: '{!hasCurrentRecord}'
					}
                },
 				{
					xtype: 'tbseparator',
                    bind: {
                        hidden: '{!hasSplit2}'
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


Ext.define('Admin.view.admin.role.Roles',{
    extend: 'Ext.container.Container',
    xtype: 'roles',

    requires: [
        'Admin.view.admin.role.RolesController',
        'Admin.view.admin.role.RolesModel'
    ],

    controller: 'roles',
    viewModel: {
        type: 'roles'
    },

    layout: {
        type: 'hbox',
		pack: 'center',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'treepanel',
            itemId: 'roletree',
            reference: 'treePanel',
            bind: '{roletree}',
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
			bind: '{roles}',
            bodyBorder: true,
            bodyStyle: 'border-top-width: 1px !important;',
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
					text: '新增',
					ui: 'green',
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
                    text: '用户',
 					ui: 'soft-green',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-users',
					handler: 'onSetUser',
					bind: {
						disabled: '{!hasCurrentRecord}'
					}
                },
                {
                    text: '访问',
 					ui: 'blue',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-cloud-upload',
					handler: 'onSetAccess',
					bind: {
						disabled: '{!hasCurrentRecord}'
					}
                },
                '-',
                {
                    text: '菜单',
 					ui: 'soft-blue',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-list-ul',
					handler: 'onSetMenu',
					bind: {
						disabled: '{!hasCurrentRecord}'
					}
                },
                {
                    text: '按钮',
 					ui: 'soft-purple',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-hand-pointer-o',
					handler: 'onSetButton',
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
			bbar: { 
                xtype: 'pagingtoolbar',
                bind: '{roles}',
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
        /* accessTree */
        {
            xtype: 'treepanel',
            reference: 'accessTree',
            itemId: 'accesstree',
            bind: '{accesstree}',
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
                beforeitemexpand: 'onBeforeAccessTreeItemExpand'
            },
            title: {
                text: '访问设置',
                style: 'font-size: 13px;',
                iconCls: 'fa fa-cog'
            },
            tools: [
                {
                    iconCls: 'fa fa-save',
                    tooltip: '保存',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onSaveAccesses'
                },
                {
                    iconCls: 'fa fa-plus-square',
                    tooltip: '展开所有',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onAccessTreeExpandAll'
                },
                {
                    iconCls: 'fa fa-minus-square',
                    tooltip: '折叠所有',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onAccessTreeCollapseAll'
                },
                {
                    iconCls: 'fa fa-refresh',
                    tooltip: '重置',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onAccessTreeRefresh'
                },
                {
                    iconCls: 'fa fa-times',
                    tooltip: '关闭',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onAccessTreeClose'
                }
            ]
        },
        /* userTree */
        {
            xtype: 'treepanel',
            reference: 'userTree',
            itemId: 'usertree',
            bind: '{usertree}',
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
                beforeitemexpand: 'onBeforeUserTreeItemExpand'
            },
            title: {
                text: '用户设置',
                style: 'font-size: 13px;',
                iconCls: 'fa fa-cog'
            },
            tools: [
                {
                    iconCls: 'fa fa-save',
                    tooltip: '保存',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onSaveUsers'
                },
                {
                    iconCls: 'fa fa-plus-square',
                    tooltip: '展开所有',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onUserTreeExpandAll'
                },
                {
                    iconCls: 'fa fa-minus-square',
                    tooltip: '折叠所有',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onUserTreeCollapseAll'
                },
                {
                    iconCls: 'fa fa-refresh',
                    tooltip: '重置',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onUserTreeRefresh'
                },
                {
                    iconCls: 'fa fa-times',
                    tooltip: '关闭',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onUserTreeClose'
                }
            ]
        },

        /* menuTree */
        {
            xtype: 'treepanel',
            reference: 'menuTree',
            itemId: 'menutree',
            bind: '{menutree}',
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
                beforeitemexpand: 'onBeforeMenuTreeItemExpand'
            },
            title: {
                text: '菜单设置',
                style: 'font-size: 13px;',
                iconCls: 'fa fa-cog'
            },
            tools: [
                {
                    iconCls: 'fa fa-save',
                    tooltip: '保存',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onSaveMenus'
                },
                {
                    iconCls: 'fa fa-plus-square',
                    tooltip: '展开所有',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onMenuTreeExpandAll'
                },
                {
                    iconCls: 'fa fa-minus-square',
                    tooltip: '折叠所有',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onMenuTreeCollapseAll'
                },
                {
                    iconCls: 'fa fa-refresh',
                    tooltip: '重置',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onMenuTreeRefresh'
                },
                {
                    iconCls: 'fa fa-times',
                    tooltip: '关闭',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onMenuTreeClose'
                }
            ]
        },

        /* button code */
        {
            xtype: 'treepanel',
            reference: 'buttonTree',
            itemId: 'buttontree',
            bind: '{buttontree}',
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
                beforeitemexpand: 'onBeforeButtonTreeItemExpand'
            },
            title: {
                text: '按钮设置',
                style: 'font-size: 13px;',
                iconCls: 'fa fa-cog'
            },
            tools: [
                {
                    iconCls: 'fa fa-save',
                    tooltip: '保存',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onSaveButtons'
                },
                {
                    iconCls: 'fa fa-plus-square',
                    tooltip: '展开所有',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onButtonTreeExpandAll'
                },
                {
                    iconCls: 'fa fa-minus-square',
                    tooltip: '折叠所有',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onButtonTreeCollapseAll'
                },
                {
                    iconCls: 'fa fa-refresh',
                    tooltip: '重置',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onButtonTreeRefresh'
                },
                {
                    iconCls: 'fa fa-times',
                    tooltip: '关闭',
                    style: 'font-size: 13px;padding-top: 3px;',
                    callback: 'onButtonTreeClose'
                }
            ]
        }

    ]
});

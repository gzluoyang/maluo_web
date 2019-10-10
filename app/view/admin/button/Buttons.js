Ext.define('Admin.view.admin.button.Buttons',{
    extend: 'Ext.container.Container',
    xtype: 'buttons',

    requires: [
        'Admin.view.admin.button.ButtonsController',
        'Admin.view.admin.button.ButtonsModel'
    ],

    controller: 'buttons',
    viewModel: {
        type: 'buttons'
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
            itemId: 'menutree',
            reference: 'treePanel',
            bind: '{menutree}',
            border: true,
            style: 'border-color: #d0d0d0 !important;border-right-width: 1px !important;border-top-width: 0px !important;',
            bodyBorder: false,
            bodyStyle: 'border-top-width: 1px !important;border-bottom-width: 0px !important;',
            rootVisible: true,
            width: 200,
            draggable: true,
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    dropGroup: 'buttons',
                    enableDrag: false,
                    enableDrop: true,
                    dropZone: {
                        onNodeDrop: function(targetNode, sourceNode, e, data) {
                            var target = e.record.data;
                            var source = data.records[0].data;

                            if(target.leaf !== true) {
                                Ext.Msg.alert('提示','只能移动到叶子节点');
                                return false;
                            }

                            if(target.id === source.menu_id) {
                                Ext.Msg.alert('提示','不能移动到相同的父节点!');
                                return false;
                            }

                            var id = source.id;
                            var menu_id = target.id;
                            var url = '/api/admin/button/move';
                            Ext.Ajax.request({
                                url: url,
                                params: {
                                    id: id,
                                    menu_id: menu_id
                                },
                                success: function(response) {
                                    var store = sourceNode.view.grid.store;
                                    store.reload();
                                }
                            });
                            return false;
                        }
                    }
                }
            },
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
			bind: '{buttons}',
            bodyBorder: true,
            bodyStyle: 'border-top-width: 1px !important;',
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'buttons',
                    dropGroup: 'buttons',
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
                    flex: 1,
					width: 200
				},
                {
					text: '关键字',
					dataIndex: 'keyword',
					sortable: false,
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
                    text: '角色',
 					ui: 'soft-green',
					style: 'border-radius: 2px;',
					iconCls: 'fa fa-lg fa-user',
					handler: 'onSetRole',
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
                bind: '{buttons}',
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

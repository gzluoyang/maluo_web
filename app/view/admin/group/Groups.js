Ext.define('Admin.view.admin.group.Groups',{
    extend: 'Ext.container.Container',
    xtype: 'groups',

    requires: [
        'Ext.tree.Panel',
        'Admin.view.admin.group.GroupsController',
        'Admin.view.admin.group.GroupsModel'
    ],

    controller: 'groups',
    viewModel: {
        type: 'groups'
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
            itemId: 'apptree',
            bind: '{apptree}',
            border: true,
            style: 'border-color: #d0d0d0 !important;border-right-width: 1px !important;border-top-width: 0px !important;',
            bodyBorder: false,
            bodyStyle: 'border-top-width: 1px !important;border-bottom-width: 0px !important;',
            rootVisible: true,
            draggable: true,
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    dropGroup: 'groups',
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

                            if(target.id === source.app_id) {
                                Ext.Msg.alert('提示','不能移动到相同的父节点!');
                                return false;
                            }

                            var id = source.id;
                            var app_id = target.id;
                            var url = '/api/admin/group/move';
                            Ext.Ajax.request({
                                url: url,
                                params: {
                                    id: id,
                                    app_id: app_id
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
            width: 200,
            listeners: {
                itemclick: 'onSelectApp'
            },
            title: {
                text: '树视图',
                style: 'font-size: 13px;',
                iconCls: 'fa fa-th-list'
            },
            tools: [
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
			bind: '{groups}',
            bodyBorder: true,
            bodyStyle: 'border-top-width: 1px !important;',
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'groups',
                    dropGroup: 'groups',
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
					ui: 'green',
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
                bind: '{groups}',
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

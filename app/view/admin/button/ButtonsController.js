Ext.define('Admin.view.admin.button.ButtonsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buttons',
    init: function(view) {
        var that = this;
        var model = this.getViewModel();
        var menu_key = model.get('menu');
        Ext.Ajax.request({
            url: '/api/admin/home/buttons',
            params: {
                menu_key: menu_key
            },
            success: function(response) {
                var obj = Ext.decode(response.responseText);
                var success = obj.success;
                if(success === true) {
                    var buttons = {};
                    var data = obj.data;
                    var n = data.length;
                    for(var i=0;i<n;i++) {
                        var keyword = data[i].keyword;
                        buttons[keyword] = data[i];
                    }
                    that.getViewModel().set('buttonData',buttons);
                }
            }
        });
        model.set({
            buttonData: {
                menus_add: true
            }
        });
    },
 
    onSelectApp: function(me,record,index,e,eOpts) {
        var id = record.get('id');
        var leaf = record.get('leaf');
        var data = {
            parent_id: 0,
            record: record
        };
        if(!leaf) {
           data.parent_id = id;
           this.getViewModel().set(data);
        } else {
           data.menu_id = id;
           this.getViewModel().set(data);
           this.search();
        }
    },

    onGridDrop: function(node,data,overModel,dropPosition,opts) {
        var source = data.records[0];
        var target = overModel.data;
        var tab_index = target.tab_index;
        var dir = 'desc';

        var store = this.getViewModel().getStore('buttons');

        if(dropPosition === 'before') {
            dir = 'asc';
            tab_index--;
        }
        if(dropPosition === 'after') {
            dir = 'desc';
            tab_index++;
        }

        var id = source.id;
        var url = '/api/admin/button/sort';
        Ext.Ajax.request({
            url: url,
            params: {
                id: id,
                tab_index: tab_index,
                dir: dir
            },
            success: function(response) {
                store.reload();
            }
        });
    },
 
    onTreeRefresh: function() {
        var parent_id = this.getViewModel().get('parent_id');

        var treeStore = this.getStore('menutree');
        if(parent_id == 0) {
            treeStore.reload();
        } else {
            var node = treeStore.getNodeById(parent_id);
            treeStore.load({
                node: node
            });

            var tree = this.lookup('treePanel');
            var record= this.getViewModel().get('record');
            tree.expandNode(record);
        }
    },

    onExpand: function() {
        var parent_id = this.getViewModel().get('parent_id');

        var tree = this.lookup('treePanel');
        if(parent_id == 0) {
            tree.expandAll();
        } else {
            var record= this.getViewModel().get('record');
            tree.expandNode(record);
        }
    },
 
    onCollapse: function() {
        var parent_id = this.getViewModel().get('parent_id');

        var tree = this.lookup('treePanel');
        if(parent_id == 0) {
            tree.collapseAll();
        } else {
            var record= this.getViewModel().get('record');
            tree.collapseNode(record);
        }
    },
    
    onSearch: function() {
		var searchKeyField = this.lookup('searchKey');
		var searchKey = searchKeyField.getValue();
        this.search(searchKey);
    },

    search: function(searchKey) {
        var menu_id = this.getViewModel().get('menu_id');
        if(menu_id == 0) {
            Ext.MessageBox.alert('提醒','请先选择相应的菜单');
        }
       
        var params = {
            menu_id: menu_id
        };

		if(searchKey && searchKey != '') {
            params.title = '%'+searchKey+'%';
		}

        var store = this.getViewModel().getStore('buttons');
		var proxy = store.getProxy();
        proxy.setExtraParams(params);

		store.loadPage(1);
	},

	onSelectionChange: function(me,records,eOpts) {
		var config = {
			hasCurrentRecord: false
		};
		
		if(records && records.length > 0) {
			config.hasCurrentRecord = true;
		}

		if(config.hasCurrentRecord) {
			var record = records[0];
		}
		this.getViewModel().setData(config);

        var roleTree = this.lookup('roleTree');
        roleTree.hide();
        //this.onSetRole();
	},

	onRowDbClick: function(me,record,element,rowIndex,e,eOpts) {
		this.loadRecord(record,'info');
	},

	onEdit: function() {
		var record = this.findCurrentRecord();
		this.loadRecord(record,'update');
	},

	onRemove: function() {
		var that = this;
		Ext.MessageBox.alert({
			title: '提醒',
			iconCls: 'fa fa-help-circle',
			message: '你确定要删除该记录吗？',
			buttons: Ext.MessageBox.YESNO,
			scope: that,
			fn: function(buttonId) {
				if(buttonId == 'yes') {
					that.removeRecord();
				}
			}
		});
	},

    onSetRole: function() {
        var treePanel = this.lookup('roleTree');
        treePanel.show();

        var record = this.findCurrentRecord();
        if(!record) {
            this.lookup('roleTree').hide();
            return;
        }

        var button_id = record.get('id');

        var store = this.getStore('roletree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            button_id: button_id
        });
        store.reload({
            callback: function(record,operation,success) {
                if(success === true) {
                    treePanel.setWidth(300);
                    treePanel.expandAll();
                }
            }
        });
    },

    onBeforeRoleTreeItemExpand: function(me,options) {
        var record = this.findCurrentRecord();
        var button_id = record.get('id');

        var data = me.data;
        var type = data.type;
        var store = this.getStore('roletree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            button_id: button_id
        });
    },

    onSaveRoles: function() {
        var treePanel = this.lookup('roleTree');
        var roleNodes = treePanel.getChecked();
        var roles = [];
        var n = roleNodes.length;
        for(var i = 0;i < n;i++) {
            var data = roleNodes[i].data;
            var role_id = data.id;
            roles.push(role_id);
        }

        var record = this.findCurrentRecord();
        var button_id = record.get('id');
        var data = {
            button_id: button_id,
            roles: roles
        };

        var that = this;
        Ext.Ajax.request({
		    url: '/api/admin/button/roles',
            jsonData: data,
            success: function(response,opts) {
 				Ext.MessageBox.alert({
					title: '成功',
					iconCls: 'fa fa-check-circle',
					message: '角色设置成功',
					buttons: Ext.MessageBox.OK,
					scope: that,
					fn: function() {
                        that.onSetRole();
					}
				});
           },
           failure: function(response,opts) {
           }
        });
    },

    onRoleTreeRefresh: function() {
        var treePanel = this.lookup('roleTree');

        var treeStore = this.getStore('roletree');
        treeStore.reload({
            callback: function(record,operation,success) {
                if(success === true)
                    treePanel.expandAll();
            }
        });
    },
    onRoleTreeClose: function() {
        var treePanel = this.lookup('roleTree');
        treePanel.hide();
    },

    onRoleTreeExpandAll: function() {
        var treePanel = this.lookup('roleTree');
        treePanel.expandAll();
    },

    onRoleTreeCollapseAll: function() {
        var treePanel = this.lookup('roleTree');
        treePanel.collapseAll();
    },


	/* private function section */

	removeRecord: function() {
		var record = this.findCurrentRecord();
		var id = record.get('id');
		var that = this;
		Ext.Ajax.request({
			url: '/api/admin/button/delete',
			method: 'post',
			scope: that,
			params : {
				id: id
			}
		}).then(function(response, opts) {
			var obj = Ext.decode(response.responseText);
			if(obj.success == true) {
				Ext.MessageBox.alert({
					title: '成功',
					iconCls: 'fa fa-check-circle',
					message: '数据操作成功',
					buttons: Ext.MessageBox.OK,
					scope: that,
					fn: function() {
						this.getViewModel().set('hasCurrentRecord',false);
						var store = Ext.data.StoreManager.lookup('buttonsStore');
						store.reload();
					}
				});
			} else {
				Ext.MessageBox.alert({
					title: '错误',
					iconCls: 'fa fa-times-circle',
					buttons: Ext.MessageBox.OK,
					message: obj.msg
				});
			}
		},function(response, opts) {
			var obj = Ext.decode(response.responseText);
			Ext.MessageBox.alert({
				title: '错误',
				iconCls: 'fa fa-times-circle',
				buttons: Ext.MessageBox.OK,
				message: obj.msg
			});
		});
	},

	findCurrentRecord: function() {
		var gridPanel = this.lookup('gridPanel');
		var records = gridPanel.getSelection();
		if(records) {
			return records[0];
		} else {
			return null;
		}
	},

	loadRecord : function(record,actionModel) {
		var buttonWindow = Ext.create({
			xtype: 'buttonUpdate'
		});
		var info = Ext.clone(record.data);
		var old = Ext.clone(record.data);
		buttonWindow.getViewModel().setData({
			actionModel: actionModel,
			old: old,
			info: info
		});
		buttonWindow.show();
	},

    onAdd: function() {
        var menu_id = this.getViewModel().get('menu_id');

        var addWin = Ext.create({
            xtype: 'buttonAdd'
        });

        var viewModel = addWin.getViewModel();
        viewModel.setData({
            info: {
                'menu_id': menu_id
            }
        });

        addWin.show();
    }
    
});

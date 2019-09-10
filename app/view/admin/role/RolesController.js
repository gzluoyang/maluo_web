Ext.define('Admin.view.admin.role.RolesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.roles',

    onSelectApp: function(me,record,index,e,eOpts) {
        var id = record.get('id');
        var data = {
            parent_id: id,
            record: record
        };
        this.getViewModel().set(data);
        this.search();
    },

    onTreeNodeDrop: function(node,data,overModel,dropPosition,opts) {
        var that = this;
        var id = data.records[0].id;
        var target_id= overModel.data.id;
        var parent_id = target_id;
        if(dropPosition !== 'append')
            parent_id = overModel.data.parent_id;
        
        var url = '/api/admin/role/move';
        Ext.Ajax.request({
            url: url,
            params: {
                id: id,
                parent_id: parent_id
            },
            success: function(response) {
                var tree = that.lookup('treePanel');
                tree.expandNode(overModel,true);
            }
        });
    },

    onGridDrop: function(node,data,overModel,dropPosition,opts) {
        var source = data.records[0];
        var target = overModel.data;
        var tab_index = target.tab_index;
        var dir = 'desc';

        var store = this.getViewModel().getStore('roles');

        if(dropPosition === 'before') {
            dir = 'asc';
            tab_index--;
        }
        if(dropPosition === 'after') {
            dir = 'desc';
            tab_index++;
        }

        var id = source.id;
        var url = '/api/admin/role/sort';
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
        var treeStore = this.getStore('roletree');
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
        var parent_id = this.getViewModel().get('parent_id');
       
        var params = {
            parent_id: parent_id
        };

		if(searchKey && searchKey != '') {
            params.title = '%'+searchKey+'%';
		}

        var store = this.getViewModel().getStore('roles');
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
		this.getViewModel().setData(config);

        this.hideAllTreeView();
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

    hideAllTreeView: function() {
        var viewModel = this.getViewModel();
        var settings = viewModel.get('settings');
        var n = settings.length;
        for(var i = 0; i < n; i++) {
            var treeview = settings[i];
            this.lookup(treeview).hide();
        }
    },

    /* user code */
    onSetUser: function() {
        this.hideAllTreeView();

        var treePanel = this.lookup('userTree');
        treePanel.show();

        var record = this.findCurrentRecord();
        var role_id = record.get('id');

        var store = this.getStore('usertree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            role_id: role_id
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

    onSaveUsers: function() {
        var treePanel = this.lookup('userTree');
        var userNodes = treePanel.getChecked();
        var users = [];
        var n = userNodes.length;
        for(var i = 0;i < n;i++) {
            var data = userNodes[i].data;
            var user_id = data.id;
            users.push(user_id);
        }

        var record = this.findCurrentRecord();
        var role_id = record.get('id');
        var data = {
            role_id: role_id,
            users: users
        };

        var that = this;
        Ext.Ajax.request({
		    url: '/api/admin/role/users',
            jsonData: data,
            success: function(response,opts) {
 				Ext.MessageBox.alert({
					title: '成功',
					iconCls: 'fa fa-check-circle',
					message: '用户设置成功',
					buttons: Ext.MessageBox.OK,
					scope: that,
					fn: function() {
                        that.onSetUser();
					}
				});
           },
           failure: function(response,opts) {
           }
        });
    },


    onBeforeUserTreeItemExpand: function(me,options) {
        var record = this.findCurrentRecord();
        var role_id = record.get('id');

        var data = me.data;
        var type = data.type;
        var store = this.getStore('usertree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            role_id : role_id
        });
    },

    onUserTreeRefresh: function() {
        var treePanel = this.lookup('userTree');

        var treeStore = this.getStore('usertree');
        treeStore.reload({
            callback: function(record,operation,success) {
                if(success === true)
                    treePanel.expandAll();
            }
        });
    },

    onUserTreeClose: function() {
        var treePanel = this.lookup('userTree');
        treePanel.hide();
    },

    onUserTreeExpandAll: function() {
        var treePanel = this.lookup('userTree');
        treePanel.expandAll();
    },

    onUserTreeCollapseAll: function() {
        var treePanel = this.lookup('userTree');
        treePanel.collapseAll();
    },

    /* access code */
    onSetAccess: function() {
        this.hideAllTreeView();

        var treePanel = this.lookup('accessTree');
        treePanel.show();

        var record = this.findCurrentRecord();
        var role_id = record.get('id');

        var store = this.getStore('accesstree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            role_id: role_id
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

    onSaveAccesses: function() {
        var treePanel = this.lookup('accessTree');
        var accessNodes = treePanel.getChecked();
        var accesses = [];
        var n = accessNodes.length;
        for(var i = 0;i < n;i++) {
            var data = accessNodes[i].data;
            var access_id = data.id;
            accesses.push(access_id);
        }

        var record = this.findCurrentRecord();
        var role_id = record.get('id');
        var data = {
            role_id: role_id,
            accesses: accesses
        };

        var that = this;
        Ext.Ajax.request({
		    url: '/api/admin/role/accesses',
            jsonData: data,
            success: function(response,opts) {
 				Ext.MessageBox.alert({
					title: '成功',
					iconCls: 'fa fa-check-circle',
					message: '访问设置成功',
					buttons: Ext.MessageBox.OK,
					scope: that,
					fn: function() {
                        that.onSetAccess();
					}
				});
           },
           failure: function(response,opts) {
           }
        });
    },

    onBeforeAccessTreeItemExpand: function(me,options) {
        var record = this.findCurrentRecord();
        var role_id = record.get('id');

        var store = this.getStore('accesstree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            role_id: role_id
        });
    },

    onAccessTreeRefresh: function() {
        var treePanel = this.lookup('accessTree');

        var treeStore = this.getStore('accesstree');
        treeStore.reload({
            callback: function(record,operation,success) {
                if(success === true)
                    treePanel.expandAll();
            }
        });
    },
    onAccessTreeClose: function() {
        var treePanel = this.lookup('accessTree');
        treePanel.hide();
    },

    onAccessTreeExpandAll: function() {
        var treePanel = this.lookup('accessTree');
        treePanel.expandAll();
    },

    onAccessTreeCollapseAll: function() {
        var treePanel = this.lookup('accessTree');
        treePanel.collapseAll();
    },

    /* menu code */
    onSetMenu: function() {
        this.hideAllTreeView();

        var treePanel = this.lookup('menuTree');
        treePanel.show();

        var record = this.findCurrentRecord();
        var role_id = record.get('id');

        var store = this.getStore('menutree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            role_id: role_id
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

    onSaveMenus: function() {
        var treePanel = this.lookup('menuTree');
        var menuNodes = treePanel.getChecked();
        var menus = [];
        var n = menuNodes.length;
        for(var i = 0;i < n;i++) {
            var data = menuNodes[i].data;
            var menu_id = data.id;
            menus.push(menu_id);
        }

        var record = this.findCurrentRecord();
        var role_id = record.get('id');
        var data = {
            role_id: role_id,
            menus: menus
        };

        var that = this;
        Ext.Ajax.request({
		    url: '/api/admin/role/menus',
            jsonData: data,
            success: function(response,opts) {
 				Ext.MessageBox.alert({
					title: '成功',
					iconCls: 'fa fa-check-circle',
					message: '访问设置成功',
					buttons: Ext.MessageBox.OK,
					scope: that,
					fn: function() {
                        that.onSetMenu();
					}
				});
           },
           failure: function(response,opts) {
           }
        });
    },

    onBeforeMenuTreeItemExpand: function(me,options) {
        var record = this.findCurrentRecord();
        var role_id = record.get('id');

        var store = this.getStore('menutree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            role_id: role_id
        });
    },

    onMenuTreeRefresh: function() {
        var treePanel = this.lookup('menuTree');

        var treeStore = this.getStore('menutree');
        treeStore.reload({
            callback: function(record,operation,success) {
                if(success === true)
                    treePanel.expandAll();
            }
        });
    },
    onMenuTreeClose: function() {
        var treePanel = this.lookup('menuTree');
        treePanel.hide();
    },

    onMenuTreeExpandAll: function() {
        var treePanel = this.lookup('menuTree');
        treePanel.expandAll();
    },

    onMenuTreeCollapseAll: function() {
        var treePanel = this.lookup('menuTree');
        treePanel.collapseAll();
    },

    /* button code */
    onSetButton: function() {
        this.hideAllTreeView();

        var treePanel = this.lookup('buttonTree');
        treePanel.show();

        var record = this.findCurrentRecord();
        var role_id = record.get('id');

        var store = this.getStore('buttontree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            role_id: role_id
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

    onSaveButtons: function() {
        var treePanel = this.lookup('buttonTree');
        var buttonNodes = treePanel.getChecked();
        var buttons = [];
        var n = buttonNodes.length;
        for(var i = 0;i < n;i++) {
            var data = buttonNodes[i].data;
            var button_id = data.id;
            buttons.push(button_id);
        }

        var record = this.findCurrentRecord();
        var role_id = record.get('id');
        var data = {
            role_id: role_id,
            buttons: buttons
        };

        var that = this;
        Ext.Ajax.request({
		    url: '/api/admin/role/buttons',
            jsonData: data,
            success: function(response,opts) {
 				Ext.MessageBox.alert({
					title: '成功',
					iconCls: 'fa fa-check-circle',
					message: '访问设置成功',
					buttons: Ext.MessageBox.OK,
					scope: that,
					fn: function() {
                        that.onSetButton();
					}
				});
           },
           failure: function(response,opts) {
           }
        });
    },

    onBeforeButtonTreeItemExpand: function(me,options) {
        var record = this.findCurrentRecord();
        var role_id = record.get('id');

        var store = this.getStore('buttontree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            role_id: role_id
        });
    },

    onButtonTreeRefresh: function() {
        var treePanel = this.lookup('buttonTree');

        var treeStore = this.getStore('buttontree');
        treeStore.reload({
            callback: function(record,operation,success) {
                if(success === true)
                    treePanel.expandAll();
            }
        });
    },
    onButtonTreeClose: function() {
        var treePanel = this.lookup('buttonTree');
        treePanel.hide();
    },

    onButtonTreeExpandAll: function() {
        var treePanel = this.lookup('buttonTree');
        treePanel.expandAll();
    },

    onButtonTreeCollapseAll: function() {
        var treePanel = this.lookup('buttonTree');
        treePanel.collapseAll();
    },

	/* private function section */

	removeRecord: function() {
		var record = this.findCurrentRecord();
		var id = record.get('id');
		var that = this;
		Ext.Ajax.request({
			url: '/api/admin/role/delete',
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
						var store = Ext.data.StoreManager.lookup('rolesStore');
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
		var roleWindow = Ext.create({
			xtype: 'roleUpdate'
		});
		var info = Ext.clone(record.data);
		var old = Ext.clone(record.data);
		roleWindow.getViewModel().setData({
			actionModel: actionModel,
			old: old,
			info: info
		});
		roleWindow.show();
	},

    onAdd: function() {
        var parent_id = this.getViewModel().get('parent_id');

        var addWin = Ext.create({
            xtype: 'roleAdd'
        });

        var viewModel = addWin.getViewModel();
        viewModel.setData({
            info: {
                'parent_id': parent_id
            }
        });

        addWin.show();
    }
    
});

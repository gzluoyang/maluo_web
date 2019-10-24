Ext.define('Admin.view.admin.app.AppsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.apps',
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
                    that.getViewModel().set('buttons',buttons);
                }
            }
        });
        model.set({
            buttons: {
                apps_add: true
            }
        });
    },
    onRender: function() {
    },
    onSearch: function() {
        var store = Ext.data.StoreManager.lookup('appStore');
		var searchKeyField = this.lookup('searchKey');
		var searchKey = searchKeyField.getValue();

		var gridPanel = this.lookup('gridPanel');
		var store = gridPanel.getStore();
		var proxy = store.getProxy();

		if(searchKey != '') {
			proxy.setExtraParams({
				title: '%'+searchKey+'%'
			});
		} else {
			proxy.setExtraParams({
			});
		}

		store.loadPage(1);
	},

    onGridDrop: function(node,data,overModel,dropPosition,opts) {
        var source = data.records[0];
        var target = overModel.data;
        var tab_index = target.tab_index;
        var dir = 'desc';

        var store = this.getViewModel().getStore('apps');

        if(dropPosition === 'before') {
            dir = 'asc';
            tab_index--;
        }
        if(dropPosition === 'after') {
            dir = 'desc';
            tab_index++;
        }

        var id = source.id;
        var url = '/api/admin/app/sort';
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

        var app_id = record.get('id');

        var store = this.getStore('roletree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            app_id: app_id
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
        var app_id = record.get('id');

        var data = me.data;
        var type = data.type;
        var store = this.getStore('roletree');
        store.getProxy().setExtraParams({
            status: false,
            checked: true,
            app_id: app_id
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
        var app_id = record.get('id');
        var data = {
            app_id: app_id,
            roles: roles
        };

        var that = this;
        Ext.Ajax.request({
		    url: '/api/admin/app/roles',
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
			url: '/api/admin/app/delete',
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
						var store = Ext.data.StoreManager.lookup('appsStore');
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
		var appWindow = Ext.create({
			xtype: 'appUpdate'
		});
		var info = Ext.clone(record.data);
		var old = Ext.clone(record.data);
		appWindow.getViewModel().setData({
			actionModel: actionModel,
			old: old,
			info: info
		});
		appWindow.show();
	},

    onAdd: function() {
        var addWin = Ext.create({
            xtype: 'appAdd'
        });

        var viewModel = addWin.getViewModel();
        viewModel.setData({});

        addWin.show();
    }
});

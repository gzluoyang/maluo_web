Ext.define('Admin.view.admin.org.OrgsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orgs',

    onSelectOrg: function(me,record,index,e,eOpts) {
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
        
        var url = '/api/admin/org/move';
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

    onTreeRefresh: function() {
        var parent_id = this.getViewModel().get('parent_id');
        var treeStore = this.getStore('orgtree');
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

        var store = this.getViewModel().getStore('orgs');
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

	/* private function section */

	removeRecord: function() {
		var record = this.findCurrentRecord();
		var id = record.get('id');
		var that = this;
		Ext.Ajax.request({
			url: '/api/admin/org/delete',
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
						var store = Ext.data.StoreManager.lookup('orgsStore');
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
		var orgWindow = Ext.create({
			xtype: 'orgUpdate'
		});
		var info = Ext.clone(record.data);
		var old = Ext.clone(record.data);
		orgWindow.getViewModel().setData({
			actionModel: actionModel,
			old: old,
			info: info
		});
		orgWindow.show();
	},

    onAdd: function() {
        var parent_id = this.getViewModel().get('parent_id');

        var addWin = Ext.create({
            xtype: 'orgAdd'
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

Ext.define('Admin.view.admin.module.ModulesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.modules',
 
	onTreeStoreLoad: function(me,records,successful,operation,eOpts) {
		var n = records.length;
		for(var i=0;i<n;i++) {
            var row = i+1;
            if(row%2 == 0) {
                records[i].set('cls','x-grid-item-alt');
            }
		}
	},

    onSelectApp: function(me,record,index,e,eOpts) {
        var app_id = record.get('id');
        if(app_id == 0)
            return;

        this.getViewModel().set('app_id',app_id);
        this.search();
    },

    onGridDrop: function(node,data,overModel,dropPosition,opts) {
        var source = data.records[0];
        var target = overModel.data;
        var tab_index = target.tab_index;
        var dir = 'desc';

        var store = this.getViewModel().getStore('modules');

        if(dropPosition === 'before') {
            dir = 'asc';
            tab_index--;
        }
        if(dropPosition === 'after') {
            dir = 'desc';
            tab_index++;
        }

        var id = source.id;
        var url = '/api/admin/module/sort';
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
        var treeStore = this.getStore('apptree');
        treeStore.reload();
    },

    onSearch: function() {
		var searchKeyField = this.lookup('searchKey');
		var searchKey = searchKeyField.getValue();
        this.search(searchKey);
    },

    search: function(searchKey) {
        var app_id = this.getViewModel().get('app_id');
        if(app_id == 0) {
            Ext.MessageBox.alert('提醒','请先选择相应的分组');
        }
       
        var params = {
            app_id: app_id
        };

		if(searchKey && searchKey != '') {
            params.title = '%'+searchKey+'%';
		}

        var store = this.getViewModel().getStore('modules');
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
			url: '/api/admin/module/delete',
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
						var store = Ext.data.StoreManager.lookup('modulesStore');
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
		var moduleWindow = Ext.create({
			xtype: 'moduleUpdate'
		});
		var info = Ext.clone(record.data);
		var old = Ext.clone(record.data);
		moduleWindow.getViewModel().setData({
			actionModel: actionModel,
			old: old,
			info: info
		});
		moduleWindow.show();
	},

    onAdd: function() {
        var app_id = this.getViewModel().get('app_id');

        var addWin = Ext.create({
            xtype: 'moduleAdd'
        });

        var viewModel = addWin.getViewModel();
        viewModel.setData({
            info: {
                'app_id': app_id
            }
        });

        addWin.show();
    }
    
});
